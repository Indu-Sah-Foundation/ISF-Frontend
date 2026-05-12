// ISF backend API client
export const API_BASE =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_ISF_API) ||
  "https://isfinfa-go-backend.azurewebsites.net";

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

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      if (body?.error) msg = body.error;
    } catch {}
    throw new Error(msg);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  listArticles: (limit = 20, offset = 0) =>
    req<Paginated<Article>>(`/articles?limit=${limit}&offset=${offset}`),
  getArticle: (slug: string, lang?: string) =>
    req<Article>(`/articles/${encodeURIComponent(slug)}${lang ? `?lang=${lang}` : ""}`),
  donationAmounts: () =>
    req<{ currency: string; amounts_cents: number[] }>(`/donations/amounts`),
  checkout: (body: { amount_cents: number; email?: string; name?: string }) =>
    req<{ url: string; session_id: string }>(`/donations/checkout`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
