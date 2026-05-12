// ISF backend API client
export const API_BASE =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_ISF_API) ||
  "https://isfinfa-go-backend.azurewebsites.net";

const TOKEN_KEY = "isf_admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  body_md: string;
  source_lang: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Paginated<T> {
  items: T[];
  limit: number;
  offset: number;
  count: number;
}

export interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Donation {
  id: string;
  amount_cents: number;
  currency: string;
  email: string | null;
  name: string | null;
  status: "pending" | "paid" | "failed" | "refunded";
  stripe_session_id: string;
  stripe_payment_intent_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Language {
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
}

async function req<T>(path: string, init?: RequestInit & { auth?: boolean }): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((init?.headers as Record<string, string>) || {}),
  };
  if (init?.auth) {
    const t = getToken();
    if (t) headers["Authorization"] = `Bearer ${t}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });

  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      if (body?.error) msg = body.error;
    } catch {}
    if (res.status === 401 && init?.auth) setToken(null);
    const err = new Error(msg) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  // ----- Public -------------------------------------------------------------
  listArticles: (limit = 20, offset = 0) =>
    req<Paginated<Article>>(`/articles?limit=${limit}&offset=${offset}`),
  listArticlesAdmin: (limit = 50, offset = 0) =>
    req<Paginated<Article>>(
      `/articles?include_unpublished=true&limit=${limit}&offset=${offset}`,
      { auth: true },
    ),
  getArticle: (slug: string, lang?: string) =>
    req<Article>(
      `/articles/${encodeURIComponent(slug)}${lang ? `?lang=${encodeURIComponent(lang)}` : ""}`,
    ),
  donationAmounts: () =>
    req<{ currency: string; amounts_cents: number[] }>(`/donations/amounts`),
  checkout: (body: { amount_cents: number; email?: string; name?: string }) =>
    req<{ url: string; session_id: string }>(`/donations/checkout`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  languages: () => req<Record<string, Language>>(`/translate/languages`),

  // ----- Auth ---------------------------------------------------------------
  login: async (email: string, password: string) => {
    const res = await req<LoginResponse>(`/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setToken(res.token);
    return res;
  },
  logout: () => setToken(null),

  // ----- Admin: articles ----------------------------------------------------
  getArticleById: (id: string) =>
    // Backend exposes get-by-slug, not get-by-id, so admin form fetches by slug
    // after we look up the slug in the list. For now, the editor receives the
    // slug as the route param.
    req<Article>(`/articles/${encodeURIComponent(id)}`),
  createArticle: (body: {
    slug: string;
    title: string;
    body_md: string;
    source_lang?: string;
    publish?: boolean;
  }) =>
    req<Article>(`/articles`, {
      method: "POST",
      auth: true,
      body: JSON.stringify(body),
    }),
  updateArticle: (
    id: string,
    body: { title?: string; body_md?: string; publish?: boolean },
  ) =>
    req<Article>(`/articles/${id}`, {
      method: "PUT",
      auth: true,
      body: JSON.stringify(body),
    }),
  deleteArticle: (id: string) =>
    req<void>(`/articles/${id}`, { method: "DELETE", auth: true }),

  // ----- Admin: donations ---------------------------------------------------
  listDonations: (status = "", limit = 50, offset = 0) =>
    req<Paginated<Donation>>(
      `/donations?status=${encodeURIComponent(status)}&limit=${limit}&offset=${offset}`,
      { auth: true },
    ),

  // ----- Admin: image uploads -----------------------------------------------
  // 1. Backend signs a SAS token bound to one specific blob.
  // 2. Browser PUTs the file bytes directly to Azure Blob (bypasses our API).
  // 3. We embed PublicURL in markdown.
  imageSAS: (file: File) =>
    req<{
      upload_url: string;
      public_url: string;
      blob_name: string;
      expires_at: string;
    }>(`/admin/images/sas`, {
      method: "POST",
      auth: true,
      body: JSON.stringify({
        filename: file.name,
        content_type: file.type,
        size_bytes: file.size,
      }),
    }),

  uploadToBlob: async (file: File, uploadURL: string) => {
    const res = await fetch(uploadURL, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": file.type,
      },
      body: file,
    });
    if (!res.ok) throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
  },
};
