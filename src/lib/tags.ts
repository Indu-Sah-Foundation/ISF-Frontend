// Thumbnail handling for blog articles.
//
// Thumbnails ride INSIDE the markdown body as a leading HTML comment so we
// don't need a backend schema change:
//
//   <!-- thumbnail: https://blob.url/cover.jpg -->
//   # Real article title…
//
// The comment is stripped from previews and rendered output. If no explicit
// thumbnail is set, the blog list card falls back to firstImage(body_md).
//
// (Historically this file also handled per-article tags via the same
// leading-comment trick; tags were removed but the file is still named
// `tags.ts` and exports `stripTagsComment` so existing imports keep working.)

const THUMB_RE = /<!--\s*thumbnail:\s*([^\s>][^>]*?)\s*-->\s*\n?/i;
// Legacy `<!-- tags: ... -->` comments left over from before tags were
// removed - we still strip them so they don't render into the body of
// any old post.
const LEGACY_TAGS_RE = /^\s*<!--\s*tags:\s*([^>]+?)\s*-->\s*\n?/i;

/** Strip both the thumbnail comment and any legacy tags comment so neither
 *  ever renders in the preview/body. */
export function stripTagsComment(bodyMd: string): string {
  return bodyMd.replace(LEGACY_TAGS_RE, "").replace(THUMB_RE, "");
}

export function readThumbnail(bodyMd: string): string | null {
  const m = bodyMd.match(THUMB_RE);
  if (!m) return null;
  const url = m[1].trim();
  return url || null;
}

export function writeThumbnail(bodyMd: string, url: string | null): string {
  const stripped = bodyMd.replace(THUMB_RE, "");
  if (!url || !url.trim()) return stripped;
  return `<!-- thumbnail: ${url.trim()} -->\n${stripped}`;
}
