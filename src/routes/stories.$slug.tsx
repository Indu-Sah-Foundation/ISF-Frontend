import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Languages, Loader2 } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { api, ApiError } from "@/lib/api";
import { stripTagsComment } from "@/lib/tags";
import { expandYouTubeEmbeds } from "@/lib/youtube";

export const Route = createFileRoute("/stories/$slug")({
  component: StoryPage,
  notFoundComponent: () => (
    <SiteShell>
      <div className="px-6 py-32 max-w-3xl mx-auto text-center">
        <h1 className="font-display text-5xl font-extrabold tracking-tighter mb-4">
          Blog not found
        </h1>
        <p className="text-muted-foreground mb-8">
          This blog may have been moved or unpublished.
        </p>
        <Link to="/stories" className="font-mono text-xs uppercase underline">
          ← Back to all blogs
        </Link>
      </div>
    </SiteShell>
  ),
});

// Sticky preference so a visitor's chosen language follows them between
// articles. Falls back to "" (the article's source language) if absent.
const LANG_KEY = "isf_blog_lang";

function StoryPage() {
  const { slug } = Route.useParams();
  // Every article opens in English on first click. The reader can switch
  // to another language via the picker, but that choice is per-tab and
  // does NOT persist to localStorage — opening a different article (or
  // re-opening this one) starts fresh in English again. This avoids the
  // confusing case where a reader who once tried Nepali sees every
  // future article auto-translated.
  const [lang, setLang] = useState<string>("");

  const { data, isLoading, isFetching, error } = useQuery({
    // Keyed by (slug, lang) so switching language triggers a refetch. The
    // backend caches each (slug, lang) pair in Redis so repeat hits in
    // any language are fast.
    queryKey: ["article", slug, lang],
    queryFn: async () => {
      try {
        return await api.getArticle(slug, lang || undefined);
      } catch (e: any) {
        // Detect a real 404 via the typed ApiError status rather than
        // string-matching the message (the message is now user-friendly
        // copy like "We couldn't find what you were looking for.").
        if (e instanceof ApiError && e.status === 404) throw notFound();
        throw e;
      }
    },
    retry: 1,
  });

  // Track which language is CURRENTLY rendered. When the user picks a
  // new language, React Query keeps the previous data on screen during
  // the refetch - and for the first frame after the new data lands,
  // we'd briefly show the just-arrived (still-untranslated cold-path)
  // bytes before the cache hits. We instead hide the body until the
  // fetch is complete AND the request language equals what we asked for.
  const renderedLang = useRef<string>(lang);
  useEffect(() => {
    if (!isFetching) renderedLang.current = lang;
  }, [isFetching, lang]);

  const showTranslating = isFetching && !isLoading && renderedLang.current !== lang;

  return (
    <SiteShell hideNav>
      {/* TOP NAV STRIP - back link + language picker */}
      <div className="px-6 pt-2 max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <Link
          to="/stories"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary inline-flex items-center gap-2"
        >
          ← All blogs
        </Link>
        <LanguagePicker
          value={lang}
          onChange={setLang}
          loading={isFetching && !isLoading}
        />
      </div>

      {isLoading && (
        <div className="px-6 py-16 max-w-3xl mx-auto space-y-6">
          <div className="h-12 w-3/4 bg-muted animate-pulse rounded" />
          <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
          <div className="h-72 bg-muted animate-pulse rounded mt-8" />
        </div>
      )}

      {error && (
        <p className="px-6 py-16 max-w-3xl mx-auto text-muted-foreground">
          This blog couldn't load: {(error as Error).message}
        </p>
      )}

      {/* While switching languages we hide the previous body completely
          (otherwise the stale text flashes for the duration of the
          refetch - which can be several seconds the first time a given
          (article, language) pair is translated). */}
      {showTranslating ? (
        <TranslatingIntermediary lang={lang} />
      ) : (
        data && <StoryBody data={data} lang={renderedLang.current} />
      )}
    </SiteShell>
  );
}

/**
 * Drop the FIRST top-level image in an HTML body - it's already shown on
 * the blog list as the card thumbnail, so we don't repeat it at the top of
 * the article. Mid-article images (the ones the author actually placed
 * between paragraphs) are untouched.
 */
function stripFirstImage(html: string): string {
  // First strip a leading paragraph that contains only an image (whitespace ok).
  const leadingPara = html.match(/^\s*<p[^>]*>\s*<img[^>]*>\s*<\/p>/i);
  if (leadingPara) return html.slice(leadingPara[0].length);
  // Otherwise drop the first bare <img> tag in the document.
  return html.replace(/<img[^>]*>/i, "");
}


const RTL_LANGS = new Set(["ar", "he", "fa", "ur"]);

function isRTL(lang: string): boolean {
  return RTL_LANGS.has(lang.toLowerCase().split("-")[0]);
}

function StoryBody({
  data,
  lang,
}: {
  data: { title: string; body_md: string; published_at: string | null };
  lang: string;
}) {
  // Every body is HTML (the WYSIWYG always saves HTML). Pass through
  // directly so the image wrapper spans + float CSS work and text
  // wraps around floated images. Then expand any YouTube links into
  // embedded players.
  const stripped = stripTagsComment(data.body_md || "");
  const cleaned = stripFirstImage(stripped);
  const html = expandYouTubeEmbeds(cleaned);

  const rtl = isRTL(lang);
  const dir = rtl ? "rtl" : "ltr";

  return (
    <>
      <header className="px-6 pt-10 pb-12 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 flex-wrap mb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
            {data.published_at
              ? new Date(data.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Draft"}
          </span>
        </div>
        <h1
          dir={dir}
          className={
            "font-display text-4xl md:text-6xl font-extrabold tracking-tighter leading-[1.05] text-balance max-w-4xl " +
            (rtl ? "text-right ml-auto" : "")
          }
        >
          {data.title}
        </h1>
      </header>

      <article className="px-6 max-w-6xl mx-auto pb-24">
        <div
          dir={dir}
          className={
            "prose-article max-w-none " + (rtl ? "text-right" : "")
          }
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </>
  );
}

// ---------------------------------------------------------------------------
// LanguagePicker - dropdown that drives the `lang` query param.
// ---------------------------------------------------------------------------

/** Languages shown in the picker. Trimmed to English + Nepali for now
 *  while we burn down the Azure Translator free-tier quota. Add codes
 *  back to this array to expose more languages - the rest of the
 *  pipeline already supports any Azure-supported code. */
const PRIMARY_LANGS: { code: string; label: string }[] = [
  { code: "",   label: "English" },
  { code: "ne", label: "नेपाली · Nepali" },
  { code: "hi", label: "हिन्दी · Hindi" },
  { code: "es", label: "Español · Spanish" },
  { code: "ar", label: "العربية · Arabic" },
];

function LanguagePicker({
  value,
  onChange,
  loading,
}: {
  value: string;
  onChange: (lang: string) => void;
  loading: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
      <Languages className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">{loading ? "Translating…" : "Read in"}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-background border border-ink/40 rounded px-2 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-foreground focus:outline-none focus:border-ink"
      >
        {PRIMARY_LANGS.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}

// ---------------------------------------------------------------------------
// TranslatingIntermediary - full-screen friendly placeholder shown while a
// language switch is in flight. Prevents the previous translation from
// flashing while React Query refetches the new one (the first hit of a
// new language can take several seconds - Azure cold-translate + DB save).
// ---------------------------------------------------------------------------

// Derive the loading-screen label from the same PRIMARY_LANGS array
// that drives the picker, so adding/removing a language only requires
// editing ONE place. Falls through to the raw code (or "the source
// language" if empty) on the off-chance an unknown code slips in.
function languageLabel(code: string): string {
  if (!code) return "the source language";
  const hit = PRIMARY_LANGS.find((l) => l.code === code);
  return hit ? hit.label : code;
}

function TranslatingIntermediary({ lang }: { lang: string }) {
  const label = languageLabel(lang);
  return (
    <div className="px-6 py-24 max-w-3xl mx-auto text-center">
      <Loader2 className="w-10 h-10 mx-auto text-primary animate-spin mb-6" />
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-3">
        Translating
      </p>
      <p className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-balance">
        Preparing this blog in <span className="pencil-underline">{label}</span>.
      </p>
      <p className="text-sm text-muted-foreground mt-4">
        First-time translations can take a few seconds. Subsequent visits are
        cached and load instantly.
      </p>
    </div>
  );
}
