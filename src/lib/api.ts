
export const API_BASE: string =
  (typeof import.meta !== "undefined" &&
    (import.meta as any).env?.VITE_ISF_API) ||
  "";

if (typeof window !== "undefined" && !API_BASE) {
  console.error(
    "[isf] VITE_ISF_API is not set. Frontend has no backend to talk to.\n" +
      "  Local dev: create .env.local with VITE_ISF_API=http://localhost:8080\n" +
      "  CI/deploy: add VITE_ISF_API as a GitHub Actions repo variable.",
  );
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

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export interface LoginResponse {
  token: string;
  user: AdminUser;
}

export interface Paginated<T> {
  items: T[];
  limit: number;
  offset: number;
  count: number;
}

// Lightweight wrapper for the new list endpoints (projects/achievements/
// volunteers) that don't paginate — they return everything in one shot.
export interface Listing<T> {
  items: T[];
  count: number;
}

// ---------- Projects ----------
export type ProjectKind = "current" | "upcoming";
export type ProjectImageVariant = "default" | "alt";

/** One block of editable body content on a Project. Discriminated by `type`. */
export type ProjectBlock =
  | { type: "paragraph"; heading?: string; body: string }
  | { type: "bullets"; heading?: string; items: string[] }
  | {
      type: "subsections";
      heading?: string;
      items: { heading: string; items: string[] }[];
    };

export interface Project {
  id: string;
  slug: string;
  kind: ProjectKind;
  title: string;
  label: string;
  lede: string;
  image_url: string;
  image_variant: ProjectImageVariant;
  blocks: ProjectBlock[];
  position: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// ---------- Achievements ----------
export interface Achievement {
  id: string;
  slot: string;
  title: string;
  organization: string;
  place: string;
  body: string;
  image_url: string;
  awarded_at: string | null;
  position: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// ---------- Team (about-page people) ----------
export type TeamKind = "founder" | "advisor_intl" | "advisor_nat" | "board";

export interface TeamMember {
  id: string;
  kind: TeamKind;
  name: string;
  role: string;
  extras: string;
  bio: string;
  motto: string;
  image_url: string;
  position: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// ---------- Gallery ----------
export type GallerySize = "S" | "M" | "L" | "XL";

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  size: GallerySize;
  tags: string[];
  position: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// ---------- Volunteers ----------
export type VolunteerKind = "team" | "volunteer_field" | "research_field";

export interface Volunteer {
  id: string;
  kind: VolunteerKind;
  name: string;
  bio: string;
  image_url: string;
  position: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const TOKEN_KEY = "isf_admin_token";
const USER_KEY = "isf_admin_user";

export const auth = {
  getToken: (): string | null =>
    typeof window === "undefined" ? null : window.localStorage.getItem(TOKEN_KEY),
  getUser: (): AdminUser | null => {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AdminUser;
    } catch {
      return null;
    }
  },
  setSession: (token: string, user: AdminUser) => {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear: () => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  },
  isAuthenticated: (): boolean =>
    typeof window !== "undefined" && Boolean(window.localStorage.getItem(TOKEN_KEY)),
};

async function req<T>(
  path: string,
  init: RequestInit & { admin?: boolean } = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((init.headers as Record<string, string>) || {}),
  };
  if (init.admin) {
    const token = auth.getToken();
    if (!token) throw new Error("Not authenticated");
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });

  if (res.status === 401 && init.admin) {
    auth.clear();
  }
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
  // ---------- Auth ----------
  login: (email: string, password: string) =>
    req<LoginResponse>(`/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // ---------- Articles (public) ----------
  listArticles: (limit = 20, offset = 0) =>
    req<Paginated<Article>>(`/articles?limit=${limit}&offset=${offset}`),

  getArticle: (slug: string, lang?: string) =>
    req<Article>(`/articles/${encodeURIComponent(slug)}${lang ? `?lang=${lang}` : ""}`),

  /** Supported translation target languages from Azure Translator.
   *  Response is a map of ISO-639 code → { name, nativeName, dir }. */
  listLanguages: () =>
    req<Record<string, { name: string; nativeName: string; dir: string }>>(
      `/translate/languages`,
    ),

  // ---------- Articles (admin) ----------
  listAllArticles: (limit = 100, offset = 0) =>
    req<Paginated<Article>>(
      `/articles?limit=${limit}&offset=${offset}&include_unpublished=true`,
      { admin: true },
    ),

  createArticle: (input: {
    slug: string;
    title: string;
    body_md: string;
    source_lang?: string;
    publish?: boolean;
  }) =>
    req<Article>(`/articles`, {
      method: "POST",
      admin: true,
      body: JSON.stringify({ source_lang: "en", publish: false, ...input }),
    }),

  updateArticle: (
    id: string,
    patch: Partial<Pick<Article, "title" | "body_md">> & { publish?: boolean },
  ) =>
    req<Article>(`/articles/${encodeURIComponent(id)}`, {
      method: "PUT",
      admin: true,
      body: JSON.stringify(patch),
    }),

  deleteArticle: (id: string) =>
    req<void>(`/articles/${encodeURIComponent(id)}`, {
      method: "DELETE",
      admin: true,
    }),

  // ---------- Donations ----------
  donationAmounts: () =>
    req<{ currency: string; amounts_cents: number[] }>(`/donations/amounts`),
  checkout: (body: { amount_cents: number; email?: string; name?: string }) =>
    req<{ url: string; session_id: string }>(`/donations/checkout`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  // ---------- Image uploads (admin only) ----------
  // Two-step direct-to-Blob: backend signs a short-lived SAS URL, browser PUTs
  // the bytes straight to Azure Blob. The Go service never sees the image.
  imageSAS: (file: File) =>
    req<{
      upload_url: string;
      public_url: string;
      blob_name: string;
      expires_at: string;
    }>(`/admin/images/sas`, {
      method: "POST",
      admin: true,
      body: JSON.stringify({
        filename: file.name,
        content_type: file.type,
        size_bytes: file.size,
      }),
    }),

  // ---------- Projects ----------
  listProjects: (opts: { kind?: ProjectKind; admin?: boolean } = {}) => {
    const qs = new URLSearchParams();
    if (opts.kind) qs.set("kind", opts.kind);
    if (opts.admin) qs.set("include_unpublished", "true");
    const q = qs.toString();
    return req<Listing<Project>>(`/projects${q ? `?${q}` : ""}`, {
      admin: !!opts.admin,
    });
  },

  getProject: (slug: string) =>
    req<Project>(`/projects/${encodeURIComponent(slug)}`),

  createProject: (input: Partial<Project> & Pick<Project, "slug" | "kind" | "title">) =>
    req<Project>(`/projects`, {
      method: "POST",
      admin: true,
      body: JSON.stringify({
        label: "",
        lede: "",
        image_url: "",
        image_variant: "default",
        blocks: [],
        position: 0,
        published: true,
        ...input,
      }),
    }),

  updateProject: (id: string, patch: Partial<Project>) =>
    req<Project>(`/projects/${encodeURIComponent(id)}`, {
      method: "PUT",
      admin: true,
      body: JSON.stringify(patch),
    }),

  deleteProject: (id: string) =>
    req<void>(`/projects/${encodeURIComponent(id)}`, { method: "DELETE", admin: true }),

  // ---------- Achievements ----------
  listAchievements: (admin = false) =>
    req<Listing<Achievement>>(
      `/achievements${admin ? "?include_unpublished=true" : ""}`,
      { admin },
    ),

  createAchievement: (input: Partial<Achievement> & Pick<Achievement, "slot" | "title">) =>
    req<Achievement>(`/achievements`, {
      method: "POST",
      admin: true,
      body: JSON.stringify({
        organization: "",
        place: "",
        body: "",
        image_url: "",
        position: 0,
        published: true,
        ...input,
      }),
    }),

  updateAchievement: (id: string, patch: Partial<Achievement>) =>
    req<Achievement>(`/achievements/${encodeURIComponent(id)}`, {
      method: "PUT",
      admin: true,
      body: JSON.stringify(patch),
    }),

  deleteAchievement: (id: string) =>
    req<void>(`/achievements/${encodeURIComponent(id)}`, {
      method: "DELETE",
      admin: true,
    }),

  // ---------- Team (about-page people) ----------
  listTeam: (opts: { kind?: TeamKind; admin?: boolean } = {}) => {
    const qs = new URLSearchParams();
    if (opts.kind) qs.set("kind", opts.kind);
    if (opts.admin) qs.set("include_unpublished", "true");
    const q = qs.toString();
    return req<Listing<TeamMember>>(`/team${q ? `?${q}` : ""}`, {
      admin: !!opts.admin,
    });
  },

  createTeamMember: (input: Partial<TeamMember> & Pick<TeamMember, "kind" | "name">) =>
    req<TeamMember>(`/team`, {
      method: "POST",
      admin: true,
      body: JSON.stringify({
        role: "",
        extras: "",
        bio: "",
        motto: "",
        image_url: "",
        position: 0,
        published: true,
        ...input,
      }),
    }),

  updateTeamMember: (id: string, patch: Partial<TeamMember>) =>
    req<TeamMember>(`/team/${encodeURIComponent(id)}`, {
      method: "PUT",
      admin: true,
      body: JSON.stringify(patch),
    }),

  deleteTeamMember: (id: string) =>
    req<void>(`/team/${encodeURIComponent(id)}`, {
      method: "DELETE",
      admin: true,
    }),

  // ---------- Gallery ----------
  listGallery: (admin = false) =>
    req<Listing<GalleryItem>>(
      `/gallery${admin ? "?include_unpublished=true" : ""}`,
      { admin },
    ),

  createGalleryItem: (input: Partial<GalleryItem> & Pick<GalleryItem, "src">) =>
    req<GalleryItem>(`/gallery`, {
      method: "POST",
      admin: true,
      body: JSON.stringify({
        title: "",
        caption: "",
        size: "M",
        tags: [],
        position: 0,
        published: true,
        ...input,
      }),
    }),

  updateGalleryItem: (id: string, patch: Partial<GalleryItem>) =>
    req<GalleryItem>(`/gallery/${encodeURIComponent(id)}`, {
      method: "PUT",
      admin: true,
      body: JSON.stringify(patch),
    }),

  deleteGalleryItem: (id: string) =>
    req<void>(`/gallery/${encodeURIComponent(id)}`, {
      method: "DELETE",
      admin: true,
    }),

  // ---------- Blob cleanup (admin) ----------
  previewBlobCleanup: () =>
    req<{
      total_blobs: number;
      referenced: number;
      orphans: string[];
      dry_run: boolean;
    }>(`/admin/images/cleanup`, { admin: true }),

  runBlobCleanup: () =>
    req<{
      total_blobs: number;
      referenced: number;
      orphans: string[];
      deleted: string[];
      delete_errors: string[];
      dry_run: boolean;
    }>(`/admin/images/cleanup`, { method: "POST", admin: true }),

  // ---------- Volunteers ----------
  listVolunteers: (opts: { kind?: VolunteerKind; admin?: boolean } = {}) => {
    const qs = new URLSearchParams();
    if (opts.kind) qs.set("kind", opts.kind);
    if (opts.admin) qs.set("include_unpublished", "true");
    const q = qs.toString();
    return req<Listing<Volunteer>>(`/volunteers${q ? `?${q}` : ""}`, {
      admin: !!opts.admin,
    });
  },

  createVolunteer: (input: Partial<Volunteer> & Pick<Volunteer, "kind" | "name">) =>
    req<Volunteer>(`/volunteers`, {
      method: "POST",
      admin: true,
      body: JSON.stringify({
        bio: "",
        image_url: "",
        position: 0,
        published: true,
        ...input,
      }),
    }),

  updateVolunteer: (id: string, patch: Partial<Volunteer>) =>
    req<Volunteer>(`/volunteers/${encodeURIComponent(id)}`, {
      method: "PUT",
      admin: true,
      body: JSON.stringify(patch),
    }),

  deleteVolunteer: (id: string) =>
    req<void>(`/volunteers/${encodeURIComponent(id)}`, {
      method: "DELETE",
      admin: true,
    }),

  uploadToBlob: async (file: File, uploadURL: string): Promise<void> => {
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
