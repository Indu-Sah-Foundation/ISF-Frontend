const __vite_import_meta_env__ = {};
const API_BASE = typeof import.meta !== "undefined" && __vite_import_meta_env__?.VITE_ISF_API || "https://isfinfa-go-backend.azurewebsites.net";
const TOKEN_KEY = "isf_admin_token";
function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}
function setToken(token) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}
async function req(path, init) {
  const headers = {
    "Content-Type": "application/json",
    ...init?.headers || {}
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
    } catch {
    }
    if (res.status === 401 && init?.auth) setToken(null);
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  if (res.status === 204) return void 0;
  return res.json();
}
const api = {
  // ----- Public -------------------------------------------------------------
  listArticles: (limit = 20, offset = 0) => req(`/articles?limit=${limit}&offset=${offset}`),
  listArticlesAdmin: (limit = 50, offset = 0) => req(
    `/articles?include_unpublished=true&limit=${limit}&offset=${offset}`,
    { auth: true }
  ),
  getArticle: (slug, lang) => req(
    `/articles/${encodeURIComponent(slug)}${lang ? `?lang=${encodeURIComponent(lang)}` : ""}`
  ),
  donationAmounts: () => req(`/donations/amounts`),
  checkout: (body) => req(`/donations/checkout`, {
    method: "POST",
    body: JSON.stringify(body)
  }),
  languages: () => req(`/translate/languages`),
  // ----- Auth ---------------------------------------------------------------
  login: async (email, password) => {
    const res = await req(`/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    setToken(res.token);
    return res;
  },
  logout: () => setToken(null),
  // ----- Admin: articles ----------------------------------------------------
  getArticleById: (id) => (
    // Backend exposes get-by-slug, not get-by-id, so admin form fetches by slug
    // after we look up the slug in the list. For now, the editor receives the
    // slug as the route param.
    req(`/articles/${encodeURIComponent(id)}`)
  ),
  createArticle: (body) => req(`/articles`, {
    method: "POST",
    auth: true,
    body: JSON.stringify(body)
  }),
  updateArticle: (id, body) => req(`/articles/${id}`, {
    method: "PUT",
    auth: true,
    body: JSON.stringify(body)
  }),
  deleteArticle: (id) => req(`/articles/${id}`, { method: "DELETE", auth: true }),
  // ----- Admin: donations ---------------------------------------------------
  listDonations: (status = "", limit = 50, offset = 0) => req(
    `/donations?status=${encodeURIComponent(status)}&limit=${limit}&offset=${offset}`,
    { auth: true }
  ),
  // ----- Admin: image uploads -----------------------------------------------
  // 1. Backend signs a SAS token bound to one specific blob.
  // 2. Browser PUTs the file bytes directly to Azure Blob (bypasses our API).
  // 3. We embed PublicURL in markdown.
  imageSAS: (file) => req(`/admin/images/sas`, {
    method: "POST",
    auth: true,
    body: JSON.stringify({
      filename: file.name,
      content_type: file.type,
      size_bytes: file.size
    })
  }),
  uploadToBlob: async (file, uploadURL) => {
    const res = await fetch(uploadURL, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": file.type
      },
      body: file
    });
    if (!res.ok) throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
  }
};
export {
  api as a,
  getToken as g,
  setToken as s
};
