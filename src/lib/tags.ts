// Thumbnail handling for blog articles.
//
// Thumbnails ride INSIDE the markdown body as a leading HTML comment so we
// don't need a backend schema change:
//
//   <!-- thumbnail: https://blob.url/cover.jpg -->
//   <p>Real article body…</p>
//
// The comment is stripped from previews and rendered output. If no explicit
// thumbnail is set, the blog list card falls back to firstImage(body_md).
//
// (File is named tags.ts for historical reasons — per-article tag support
// was removed before launch and this file kept its name so existing
// imports stayed valid.)

const THUMB_RE = /<!--\s*thumbnail:\s*([^\s>][^>]*?)\s*-->\s*\n?/i;

/** Strip the thumbnail comment so it never renders in the preview/body. */
export function stripTagsComment(bodyMd: string): string {
  return bodyMd.replace(THUMB_RE, "");
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
