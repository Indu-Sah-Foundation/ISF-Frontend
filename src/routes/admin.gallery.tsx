import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Trash2, Upload, GripVertical, Youtube } from "lucide-react";
import { api, type GalleryItem, type GallerySize } from "@/lib/api";
import { isYouTubeURL } from "@/lib/youtube";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGalleryPage,
});

function AdminGalleryPage() {
  const qc = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Admin-curated tag names drive both the management panel and the
  // per-image multi-select below. Fetched from the backend so changes
  // appear without a code deploy.
  const { data: tagsData } = useQuery({
    queryKey: ["admin", "gallery-tags"],
    queryFn: () => api.listGalleryTags(),
  });
  const tagNames = (tagsData?.items || []).map((t) => t.name);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "gallery"],
    queryFn: () => api.listGallery(true),
  });

  const createMut = useMutation({
    mutationFn: (input: { src: string; title: string }) =>
      api.createGalleryItem({
        src: input.src,
        title: input.title,
        size: "M",
        tags: [],
        published: true,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "gallery"] }),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Partial<GalleryItem> }) =>
      api.updateGalleryItem(id, patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "gallery"] }),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => api.deleteGalleryItem(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "gallery"] }),
  });

  const handleFiles = async (files: FileList | File[]) => {
    setError("");
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    for (const f of arr) {
      setUploading(f.name);
      try {
        // SAS upload → direct PUT to Blob → store public URL in DB.
        const sas = await api.imageSAS(f);
        await api.uploadToBlob(f, sas.upload_url);
        await createMut.mutateAsync({
          src: sas.public_url,
          title: f.name.replace(/\.[^.]+$/, ""),
        });
      } catch (e: any) {
        setError(e?.message || `Upload failed for ${f.name}`);
      } finally {
        setUploading(null);
      }
    }
  };

  const items = data?.items || [];

  return (
    <AdminShell>
      <div className="px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-4xl font-extrabold tracking-tighter">
              Manage Gallery
            </h1>
          </div>
          <Button asChild variant="outline">
            <Link to="/gallery">View public gallery</Link>
          </Button>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50 mb-4">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Uploader - drag/drop or click. Images go to Azure Blob via SAS;
            only the public URL is stored in Postgres. */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
          }}
          className="border-2 border-dashed border-ink rounded p-10 text-center mb-8 bg-cream/40"
        >
          <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          <p className="font-display font-bold mb-1">Drag &amp; drop images here</p>
          <p className="text-sm text-muted-foreground mb-4">
            or click below - JPG / PNG / WEBP
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
          <Button onClick={() => inputRef.current?.click()} disabled={!!uploading}>
            {uploading ? `Uploading ${uploading}…` : "Choose images"}
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Saved to Azure Blob + Postgres - visible to everyone immediately.
          </p>
        </div>

        {/* YouTube video tile — gallery items can also be video links,
            not just images. Stored as a normal gallery row with src set
            to the YouTube URL; MediaTile + lightbox detect the URL
            shape and render an iframe instead of an <img>. */}
        <AddYouTubePanel
          onAdd={(url) =>
            createMut.mutate({
              src: url,
              title: "",
            })
          }
        />

        {/* Admin-curated tag list. Tags defined here drive both the
            per-image multi-select on each card AND the section groupings
            on the public /gallery page. */}
        <TagsPanel />

        {isLoading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : items.length === 0 ? (
          <Card className="border-2 border-ink">
            <CardContent className="py-10 text-center text-muted-foreground">
              No images yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((it) => (
              <GalleryRow
                key={it.id}
                item={it}
                tagNames={tagNames}
                onUpdate={(patch) => updateMut.mutate({ id: it.id, patch })}
                onDelete={() => {
                  if (confirm(`Delete "${it.title}"? This also deletes the image from Azure Blob.`)) {
                    deleteMut.mutate(it.id);
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}

function GalleryRow({
  item,
  tagNames,
  onUpdate,
  onDelete,
}: {
  item: GalleryItem;
  tagNames: string[];
  onUpdate: (patch: Partial<GalleryItem>) => void;
  onDelete: () => void;
}) {
  const [draft, setDraft] = useState(item);
  // Batched-save model: every edit mutates local `draft` only. The Save
  // button is enabled whenever the draft differs from the server item,
  // and clicking it pushes ALL changed fields at once via onUpdate.
  const dirty =
    draft.title !== item.title ||
    draft.caption !== item.caption ||
    draft.size !== item.size ||
    draft.tags.join("|") !== item.tags.join("|");

  return (
    <div
      className={
        "border-2 pencil-shadow bg-cream group transition-colors " +
        (dirty ? "border-primary" : "border-ink")
      }
    >
      <div className="relative">
        <img src={item.src} alt={item.title} className="w-full h-44 object-cover" />
        <div className="absolute top-2 left-2 bg-ink/80 text-cream rounded p-1 opacity-0 group-hover:opacity-100 transition">
          <GripVertical className="w-4 h-4" />
        </div>
        {dirty && (
          <span className="absolute top-2 right-2 font-mono text-[9px] uppercase tracking-[0.2em] bg-primary text-primary-foreground px-2 py-1 rounded">
            Unsaved
          </span>
        )}
      </div>
      <div className="p-3 space-y-2">
        <Input
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          placeholder="Title"
        />
        <Input
          value={draft.caption}
          onChange={(e) => setDraft({ ...draft, caption: e.target.value })}
          placeholder="Caption (optional)"
        />

        <div>
          <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground block mb-1">
            Size
          </label>
          <div className="grid grid-cols-4 gap-1">
            {(["S", "M", "L", "XL"] as GallerySize[]).map((s) => {
              const active = draft.size === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setDraft({ ...draft, size: s })}
                  className={
                    "font-mono text-[11px] uppercase tracking-[0.18em] py-1.5 border-2 transition-colors " +
                    (active
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/40 text-muted-foreground hover:border-ink")
                  }
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground block mb-1">
            Tags
          </label>
          <div className="flex flex-wrap gap-1">
            {tagNames.length === 0 && (
              <span className="font-mono text-[10px] text-muted-foreground italic">
                No tags defined yet — add one in the Tags panel above.
              </span>
            )}
            {tagNames.map((t) => {
              const active = draft.tags.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    const next = active
                      ? draft.tags.filter((x) => x !== t)
                      : [...draft.tags, t];
                    setDraft({ ...draft, tags: next });
                  }}
                  className={
                    "font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-1 border transition-colors text-left max-w-full break-words " +
                    (active
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/30 text-muted-foreground hover:border-ink")
                  }
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save / revert when dirty. Save sends one PUT with every changed
            field; nothing is persisted until the admin clicks it. */}
        <div className="flex items-center gap-2 pt-1">
          <Button
            size="sm"
            className="flex-1"
            disabled={!dirty}
            onClick={() => {
              onUpdate({
                title: draft.title,
                caption: draft.caption,
                size: draft.size,
                tags: draft.tags,
              });
            }}
          >
            {dirty ? "Save changes" : "Saved"}
          </Button>
          {dirty && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setDraft(item)}
              title="Discard unsaved changes"
            >
              Revert
            </Button>
          )}
        </div>

        <Button size="sm" variant="ghost" className="w-full" onClick={onDelete}>
          <Trash2 className="w-4 h-4 mr-2 text-destructive" />
          Remove
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TagsPanel — admin-curated list of allowed gallery tag names.
// ---------------------------------------------------------------------------

function TagsPanel() {
  const qc = useQueryClient();
  const [newTag, setNewTag] = useState("");

  const { data } = useQuery({
    queryKey: ["admin", "gallery-tags"],
    queryFn: () => api.listGalleryTags(),
  });
  const tags = data?.items || [];

  const createMut = useMutation({
    mutationFn: (name: string) => api.createGalleryTag(name, tags.length),
    onSuccess: () => {
      setNewTag("");
      qc.invalidateQueries({ queryKey: ["admin", "gallery-tags"] });
    },
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => api.deleteGalleryTag(id),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["admin", "gallery-tags"] }),
  });

  return (
    <Card className="border-2 border-ink mb-8">
      <CardContent className="p-5 space-y-4">
        <div>
          <h2 className="font-display text-lg font-extrabold tracking-tight">
            Tags
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Tag names become the section headings on the public /gallery
            page. Add what you need; delete removes the tag from the
            picker but does NOT untag existing images.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t.id}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 border-2 border-ink bg-cream max-w-full"
            >
              <span className="break-words">{t.name}</span>
              <button
                type="button"
                aria-label={`Delete tag ${t.name}`}
                onClick={() => {
                  if (confirm(`Delete tag "${t.name}"?`)) deleteMut.mutate(t.id);
                }}
                className="text-muted-foreground hover:text-destructive shrink-0"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
          {tags.length === 0 && (
            <span className="font-mono text-[11px] text-muted-foreground italic">
              No tags yet.
            </span>
          )}
        </div>

        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const name = newTag.trim();
            if (!name) return;
            createMut.mutate(name);
          }}
        >
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="New tag name (e.g. Dental Camp 2024)"
            disabled={createMut.isPending}
            className="font-mono text-sm"
          />
          <Button type="submit" disabled={!newTag.trim() || createMut.isPending}>
            {createMut.isPending ? "Adding…" : "Add tag"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// AddYouTubePanel — paste a YouTube URL, create a gallery row whose `src`
// is the YouTube link instead of a Blob URL. The public renderer detects
// the URL shape and shows an iframe.
// ---------------------------------------------------------------------------

function AddYouTubePanel({ onAdd }: { onAdd: (url: string) => void }) {
  const [url, setUrl] = useState("");
  const [touched, setTouched] = useState(false);
  const valid = isYouTubeURL(url.trim());

  return (
    <Card className="border-2 border-ink mb-8">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Youtube className="w-5 h-5 text-destructive" />
          <h2 className="font-display text-lg font-extrabold tracking-tight">
            Add a YouTube video
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Paste a YouTube URL (youtube.com/watch?v=… or youtu.be/…). It will
          appear in the gallery as a playable embed, sized large by default.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!valid) {
              setTouched(true);
              return;
            }
            onAdd(url.trim());
            setUrl("");
            setTouched(false);
          }}
        >
          <Input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setTouched(true);
            }}
            placeholder="https://youtu.be/dQw4w9WgXcQ"
            className="font-mono text-sm flex-1"
          />
          <Button type="submit" disabled={!valid}>
            Add video
          </Button>
        </form>
        {touched && url && !valid && (
          <p className="text-xs text-destructive font-mono">
            That doesn't look like a YouTube URL.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
