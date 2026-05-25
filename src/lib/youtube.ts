
export function parseYouTubeId(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    const host = url.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.slice(1).split("/")[0];
      return /^[\w-]{6,15}$/.test(id) ? id : null;
    }
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const v = url.searchParams.get("v");
      if (v && /^[\w-]{6,15}$/.test(v)) return v;
      const m = url.pathname.match(/^\/(embed|shorts|v)\/([\w-]{6,15})/);
      if (m) return m[2];
    }
    return null;
  } catch {
    return null;
  }
}

export function isYouTubeURL(raw: string): boolean {
  return !!parseYouTubeId(raw);
}

export function youtubeEmbedHTML(id: string): string {
  return (
    `<div class="rich-youtube" data-youtube-id="${id}">` +
    `<iframe ` +
    `src="https://www.youtube-nocookie.com/embed/${id}" ` +
    `title="YouTube video" ` +
    `loading="lazy" ` +
    `allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ` +
    `allowfullscreen` +
    `></iframe>` +
    `</div>`
  );
}


export function expandYouTubeEmbeds(html: string): string {
  // 1. <a href="YT_URL">…</a> — kill the link, replace with embed.
  html = html.replace(
    /<a\s+[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>[\s\S]*?<\/a>/gi,
    (whole, href: string) => {
      const id = parseYouTubeId(href);
      return id ? youtubeEmbedHTML(id) : whole;
    },
  );

  // 2. <p>YT_URL</p> on its own — the paragraph becomes the embed.
  html = html.replace(
    /<p[^>]*>\s*(https?:\/\/[^\s<]+)\s*<\/p>/gi,
    (whole, href: string) => {
      const id = parseYouTubeId(href);
      return id ? youtubeEmbedHTML(id) : whole;
    },
  );

  // 3. Bare YT URL anywhere else in the text — inline replace.
  html = html.replace(
    /(https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?[^\s<]*v=[\w-]{6,15}[^\s<]*|shorts\/[\w-]{6,15})|youtu\.be\/[\w-]{6,15})[^\s<]*)/gi,
    (whole: string) => {
      const id = parseYouTubeId(whole);
      return id ? youtubeEmbedHTML(id) : whole;
    },
  );

  return html;
}
