import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { marked } from "marked";
import { Eye, Save } from "lucide-react";
import type { Article } from "@/lib/api";
import { api } from "@/lib/api";
import { ImageDropzone } from "./ImageDropzone";

type Mode = { kind: "create" } | { kind: "edit"; article: Article };

export function ArticleEditor({ mode }: { mode: Mode }) {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const initial =
    mode.kind === "edit"
      ? {
          slug: mode.article.slug,
          title: mode.article.title,
          body_md: mode.article.body_md,
          publish: !!mode.article.published_at,
        }
      : { slug: "", title: "", body_md: "", publish: false };

  const [slug, setSlug] = useState(initial.slug);
  const [title, setTitle] = useState(initial.title);
  const [body, setBody] = useState(initial.body_md);
  const [publish, setPublish] = useState(initial.publish);
  const [showPreview, setShowPreview] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);

  const onTitleChange = (v: string) => {
    setTitle(v);
    if (mode.kind === "create" && !slug) {
      setSlug(
        v
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .slice(0, 80),
      );
    }
  };

  const insertAtCursor = (text: string) => {
    const ta = bodyRef.current;
    if (!ta) {
      setBody((b) => b + text);
      return;
    }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    setBody(body.slice(0, start) + text + body.slice(end));
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + text.length;
      ta.setSelectionRange(pos, pos);
    });
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = Array.from(e.clipboardData.items);
    const imageItem = items.find((i) => i.type.startsWith("image/"));
    if (!imageItem) return;
    e.preventDefault();
    const file = imageItem.getAsFile();
    if (!file) return;
    try {
      const sas = await api.imageSAS(file);
      await api.uploadToBlob(file, sas.upload_url);
      insertAtCursor(`\n\n![pasted image](${sas.public_url})\n\n`);
    } catch (err) {
      console.error("paste upload failed", err);
    }
  };

  const save = useMutation({
    mutationFn: async () => {
      if (mode.kind === "create") {
        return api.createArticle({ slug, title, body_md: body, publish });
      }
      return api.updateArticle(mode.article.id, {
        title,
        body_md: body,
        publish,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-articles"] });
      qc.invalidateQueries({ queryKey: ["article"] });
      navigate({ to: "/admin/articles" });
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
      <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
        <div className="min-w-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {mode.kind === "create" ? "New article" : "Editing"}
          </span>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tighter mt-2 truncate max-w-2xl">
            {title || "Untitled"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="inline-flex items-center gap-2 border border-border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] hover:border-primary transition-colors"
          >
            <Eye size={14} />
            {showPreview ? "Edit" : "Preview"}
          </button>
          <button
            type="button"
            onClick={() => save.mutate()}
            disabled={save.isPending || !title || !slug || !body}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all disabled:opacity-50"
          >
            <Save size={14} />
            {save.isPending
              ? "Saving…"
              : publish
                ? "Save & publish"
                : "Save draft"}
          </button>
        </div>
      </div>

      {save.isError && (
        <div className="mb-6 border border-destructive/30 bg-destructive/5 p-4">
          <p className="font-mono text-sm text-destructive">
            {(save.error as Error).message}
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <Field label="Title">
            <input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full font-display text-2xl font-bold tracking-tight bg-transparent border-b border-border focus:border-primary outline-none py-3"
              placeholder="Article title"
            />
          </Field>

          <Field
            label="Slug"
            hint={
              mode.kind === "edit"
                ? "Slug is immutable after creation."
                : "URL: /stories/<slug>"
            }
          >
            <input
              value={slug}
              disabled={mode.kind === "edit"}
              onChange={(e) =>
                setSlug(
                  e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9-]/g, "-")
                    .replace(/-+/g, "-"),
                )
              }
              className="w-full font-mono text-sm bg-background border border-border focus:border-primary outline-none py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="url-friendly-slug"
            />
          </Field>

          <Field label={showPreview ? "Preview" : "Body (Markdown)"}>
            {showPreview ? (
              <div
                className="prose-article min-h-[400px] border border-border p-6 bg-card"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(body) as string,
                }}
              />
            ) : (
              <ImageDropzone onUploaded={(md) => insertAtCursor(md)}>
                <textarea
                  ref={bodyRef}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  onPaste={handlePaste}
                  rows={20}
                  className="w-full font-mono text-sm bg-background border border-border focus:border-primary outline-none py-3 px-4 leading-relaxed"
                  placeholder={`# Heading\n\nWrite the body in Markdown.\n\nDrag images anywhere onto this editor — they'll upload and insert as markdown.\n\n- bullets\n- supported\n\n[Link](https://example.com)`}
                />
              </ImageDropzone>
            )}
          </Field>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <div className="border border-border p-6 bg-card space-y-4">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Visibility
            </h3>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={publish}
                onChange={(e) => setPublish(e.target.checked)}
                className="mt-1 size-4 accent-primary"
              />
              <div>
                <div className="font-display font-bold text-sm">Publish</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Makes the article visible on /stories. Uncheck to keep as a
                  draft.
                </div>
              </div>
            </label>
          </div>

          {mode.kind === "edit" && (
            <div className="border border-border p-6 bg-card space-y-3">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Metadata
              </h3>
              <dl className="space-y-2 font-mono text-xs">
                <Row
                  k="Created"
                  v={new Date(mode.article.created_at).toLocaleString()}
                />
                <Row
                  k="Updated"
                  v={new Date(mode.article.updated_at).toLocaleString()}
                />
                <Row
                  k="Published"
                  v={
                    mode.article.published_at
                      ? new Date(mode.article.published_at).toLocaleString()
                      : "—"
                  }
                />
                <Row k="Source lang" v={mode.article.source_lang} />
              </dl>
            </div>
          )}

          <div className="border border-border p-6 bg-card">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
              Markdown tips
            </h3>
            <ul className="font-mono text-xs space-y-1.5 text-muted-foreground">
              <li># Heading</li>
              <li>## Subheading</li>
              <li>**bold** · *italic*</li>
              <li>[link](https://...)</li>
              <li>- bullet list</li>
              <li>&gt; blockquote</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 block">
        {label}
      </label>
      {children}
      {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground uppercase text-[10px] tracking-[0.15em]">
        {k}
      </dt>
      <dd className="text-right">{v}</dd>
    </div>
  );
}
