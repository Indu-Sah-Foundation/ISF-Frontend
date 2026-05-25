import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { AdminShell } from "@/components/AdminShell";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { RichEditor } from "@/components/RichEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AutoTextarea } from "@/components/admin/AutoTextarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, UploadCloud } from "lucide-react";
import {
  readThumbnail,
  stripTagsComment,
  writeThumbnail,
} from "@/lib/tags";

interface SearchParams {
  /** Slug of the article to edit. Falsy = new post. */
  slug?: string;
}

export const Route = createFileRoute("/admin/editor")({
  validateSearch: (search: Record<string, any>): SearchParams => ({
    slug: search.slug as string | undefined,
  }),
  component: EditorPage,
});

function EditorPage() {
  return (
    <AdminShell>
      <Editor />
    </AdminShell>
  );
}

function Editor() {
  const navigate = useNavigate();
  const { slug: articleSlug } = useSearch({ from: "/admin/editor" });
  const isEditing = !!articleSlug;

  const [article, setArticle] = useState({
    id: "",
    title: "",
    slug: "",
    body_md: "",
    source_lang: "en",
    published_at: null as string | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    if (!articleSlug) return;
    // Clear any stale article state from a previous editor session so
    // we never flash one blog's content while another is loading.
    setArticle({
      id: "",
      title: "",
      slug: "",
      body_md: "",
      source_lang: "en",
      published_at: null,
    });
    setIsPublished(false);
    (async () => {
      setIsLoading(true);
      setError("");
      try {
        const found = await api.getArticle(articleSlug);
        setArticle({ ...found });
        setIsPublished(!!found.published_at);
      } catch (e: any) {
        setError(e?.message || "Failed to load blog");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [articleSlug]);

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleTitleChange = (value: string) => {
    setArticle((prev) => ({
      ...prev,
      title: value,
      slug: prev.slug || generateSlug(value),
    }));
  };

  // Thumbnail rides as a leading HTML comment inside body_md so we don't
  // need a backend schema change. The RichEditor sees + writes only the
  // post-comment HTML; we splice the comment back in on save.
  const thumbnail = useMemo(
    () => readThumbnail(article.body_md) || "",
    [article.body_md],
  );

  const setThumbnail = (url: string) =>
    setArticle((p) => ({
      ...p,
      body_md: writeThumbnail(p.body_md, url || null),
    }));

  const editorValue = useMemo(
    () => stripTagsComment(article.body_md || ""),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [articleSlug, article.id],
  );

  const handleEditorChange = (html: string) => {
    // Splice the thumbnail comment back in on every keystroke so it
    // survives editor updates.
    setArticle((p) => ({
      ...p,
      body_md: writeThumbnail(html, thumbnail || null),
    }));
  };

  const handleSave = async () => {
    if (!article.title.trim() || !article.slug.trim()) {
      setError("Title and slug are required");
      return;
    }
    if (!stripTagsComment(article.body_md).trim()) {
      setError("Write something before saving");
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccess("");
    try {
      if (isEditing && article.id) {
        await api.updateArticle(article.id, {
          title: article.title,
          body_md: article.body_md,
          publish: isPublished,
          published_at: article.published_at,
        });
        setSuccess("Blog updated");
      } else {
        await api.createArticle({
          slug: article.slug,
          title: article.title,
          body_md: article.body_md,
          source_lang: article.source_lang || "en",
          publish: isPublished,
          published_at: article.published_at,
        });
        setSuccess("Blog created");
        setTimeout(() => navigate({ to: "/admin/articles" }), 800);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to save blog");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-muted-foreground">Loading blog…</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
      <button
        onClick={() => navigate({ to: "/admin/articles" })}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to blogs
      </button>

      <Card className="border-2 border-ink pencil-shadow">
        <CardHeader className="flex flex-row items-end justify-between gap-4 flex-wrap">
          <CardTitle className="font-display text-2xl sm:text-3xl font-extrabold tracking-tighter">
            {isEditing ? "Edit Blog" : "Create New Blog"}
          </CardTitle>
          <div className="flex items-center gap-3 flex-wrap">
            {uploading && (
              <span className="font-mono text-[11px] text-primary inline-flex items-center gap-1.5">
                <UploadCloud className="w-3.5 h-3.5 animate-pulse" />
                Uploading {uploading}…
              </span>
            )}
            <div className="flex items-center gap-2 border-2 border-ink px-3 py-2 rounded">
              <Switch
                id="published"
                checked={isPublished}
                onCheckedChange={setIsPublished}
                disabled={isSaving}
              />
              <Label
                htmlFor="published"
                className="cursor-pointer text-xs uppercase tracking-wider"
              >
                Publish
              </Label>
            </div>
            <Button onClick={handleSave} disabled={isSaving} className="min-w-[120px]">
              {isSaving ? "Saving…" : isPublished ? "Save & publish" : "Save draft"}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          {/* Title + slug */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <AutoTextarea
                id="title"
                value={article.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Blog title"
                disabled={isSaving}
                className="mt-1.5 text-lg leading-snug"
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={article.slug}
                onChange={(e) =>
                  setArticle((prev) => ({ ...prev, slug: e.target.value }))
                }
                placeholder="blog-url-slug"
                disabled={isSaving || isEditing}
                className="mt-1.5 font-mono"
              />
              {isEditing && (
                <p className="text-xs text-muted-foreground mt-1">
                  Slug is immutable after creation.
                </p>
              )}
            </div>
          </div>

          {/* Publish date - leave blank to use the current moment. Set to
              an older date when migrating historical posts so they sort
              correctly on the public /stories list. Only takes effect when
              "Publish" is toggled on. */}
          <div>
            <Label htmlFor="publish-date">Publish date</Label>
            <Input
              id="publish-date"
              type="date"
              value={article.published_at ? article.published_at.slice(0, 10) : ""}
              onChange={(e) =>
                setArticle((p) => ({
                  ...p,
                  published_at: e.target.value
                    ? new Date(e.target.value + "T12:00:00Z").toISOString()
                    : null,
                }))
              }
              disabled={isSaving}
              className="mt-1.5 w-48 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave blank to use today. Backdate older posts here.
            </p>
          </div>

          {/* Thumbnail: the cover image shown on the /stories list card.
              Optional - if blank, the public card falls back to the first
              image found inside the body. */}
          <ImageUploadField
            value={thumbnail}
            onChange={setThumbnail}
            label="Blog card thumbnail (optional - defaults to first image in body)"
            height="h-32"
          />

          {/* Single-pane WYSIWYG - what you type is what readers see */}
          <div>
            <Label className="mb-1.5 block">Content</Label>
            <RichEditor
              value={editorValue}
              onChange={handleEditorChange}
              onUploadStart={(name) => setUploading(name)}
              onUploadEnd={() => setUploading(null)}
              onUploadError={(msg) => {
                setUploading(null);
                setError(msg);
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
