// Tag handling for blog articles.
//
// Tags are stored INSIDE the markdown body as a leading HTML comment so we
// don't need a backend schema change:
//
//   <!-- tags: Dental, STEM -->
//   # Real article title…
//
// The comment is stripped from previews and rendered output. If no explicit
// tags comment is present we fall back to keyword inference from the title.
import type { Article } from "./api";

export type Tag = "Dental" | "STEM" | "Relief" | "Education" | "Community" | "Events";

export const ALL_TAGS: Tag[] = ["Dental", "STEM", "Education", "Relief", "Community", "Events"];

const TAGS_RE = /^\s*<!--\s*tags:\s*([^>]+?)\s*-->\s*\n?/i;

/** Pull tags out of a leading `<!-- tags: ... -->` comment in body_md. */
export function readBodyTags(bodyMd: string): Tag[] {
  const m = bodyMd.match(TAGS_RE);
  if (!m) return [];
  return m[1]
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is Tag => (ALL_TAGS as string[]).includes(s));
}

/** Strip the `<!-- tags: ... -->` line so it never renders in the preview. */
export function stripTagsComment(bodyMd: string): string {
  return bodyMd.replace(TAGS_RE, "").replace(THUMB_RE, "");
}

// ---------------------------------------------------------------------------
// Thumbnail — optional cover image stored as a leading HTML comment, same
// pattern as tags so we don't need a backend schema change.
//
//   <!-- thumbnail: https://blob.url/cover.jpg -->
//
// If absent, the blog list card falls back to firstImage(body_md).
// ---------------------------------------------------------------------------
const THUMB_RE = /<!--\s*thumbnail:\s*([^\s>][^>]*?)\s*-->\s*\n?/i;

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

/** Write a new tags comment at the top of body_md (replaces any existing one). */
export function writeBodyTags(bodyMd: string, tags: Tag[]): string {
  const stripped = stripTagsComment(bodyMd);
  if (tags.length === 0) return stripped;
  return `<!-- tags: ${tags.join(", ")} -->\n${stripped}`;
}

// Keyword inference — only used when the article has no explicit tags.
const INFER_RULES: { tag: Tag; words: RegExp }[] = [
  { tag: "Dental", words: /\b(smile|dental|oral|tooth|teeth|cavity|hygiene)\b/i },
  { tag: "STEM", words: /\b(robotics|stem|engineering|lego|programming|coding)\b/i },
  { tag: "Relief", words: /\b(covid|relief|flood|disaster|cold[- ]?wave|emergency)\b/i },
  { tag: "Education", words: /\b(education|school|classroom|teacher|literacy)\b/i },
  { tag: "Events", words: /\b(anniversary|event|ceremony|celebration)\b/i },
];

export function tagsForArticle(a: Pick<Article, "title" | "slug" | "body_md">): Tag[] {
  // 1. Explicit tags written by the author win.
  const explicit = readBodyTags(a.body_md || "");
  if (explicit.length > 0) return explicit;

  // 2. Otherwise infer from title + slug. Returns [] if nothing matches —
  //    we no longer fall back to "Community" since that confused readers.
  const text = `${a.title} ${a.slug}`;
  const matched = INFER_RULES.filter((r) => r.words.test(text)).map((r) => r.tag);
  return Array.from(new Set(matched));
}
