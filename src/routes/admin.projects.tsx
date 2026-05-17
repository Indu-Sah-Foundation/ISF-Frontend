import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { BlocksEditor } from "@/components/admin/BlocksEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AutoTextarea } from "@/components/admin/AutoTextarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, Plus, ChevronDown, ChevronRight } from "lucide-react";
import { api, type Project, type ProjectKind } from "@/lib/api";

export const Route = createFileRoute("/admin/projects")({
  component: AdminProjectsPage,
});

function AdminProjectsPage() {
  const qc = useQueryClient();
  const [active, setActive] = useState<ProjectKind>("current");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: () => api.listProjects({ admin: true }),
  });

  const createMut = useMutation({
    mutationFn: () =>
      api.createProject({
        slug: `project-${Date.now()}`,
        kind: active,
        title: "New project",
        label: active === "current" ? "Current Project" : "Upcoming",
        published: false,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "projects"] }),
  });

  const visible = (data?.items || []).filter((p) => p.kind === active);

  return (
    <AdminShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tighter">
            Manage Projects
          </h1>
          <Button onClick={() => createMut.mutate()} disabled={createMut.isPending}>
            <Plus className="w-4 h-4 mr-2" />
            Add {active === "current" ? "current" : "upcoming"} project
          </Button>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {(["current", "upcoming"] as ProjectKind[]).map((k) => (
            <button
              key={k}
              onClick={() => setActive(k)}
              className={
                "font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-2 border-2 transition-colors " +
                (active === k
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/40 text-muted-foreground hover:border-ink")
              }
            >
              {k} ({(data?.items || []).filter((p) => p.kind === k).length})
            </button>
          ))}
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50 mb-6">
            <AlertDescription className="text-red-800">
              {(error as Error).message}
            </AlertDescription>
          </Alert>
        )}

        {isLoading && <p className="text-muted-foreground">Loading…</p>}

        {visible.length === 0 && !isLoading && (
          <p className="text-muted-foreground">No projects in this group yet.</p>
        )}

        <div className="space-y-6">
          {visible.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const qc = useQueryClient();
  const [draft, setDraft] = useState(project);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState("");

  const updateMut = useMutation({
    mutationFn: () =>
      api.updateProject(project.id, {
        kind: draft.kind,
        title: draft.title,
        label: draft.label,
        lede: draft.lede,
        image_url: draft.image_url,
        image_variant: draft.image_variant,
        blocks: draft.blocks,
        position: draft.position,
        published: draft.published,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      setSuccess("Saved");
      setTimeout(() => setSuccess(""), 1500);
    },
  });

  const deleteMut = useMutation({
    mutationFn: () => api.deleteProject(project.id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "projects"] }),
  });

  return (
    <Card className="border-2 border-ink pencil-shadow">
      <CardHeader
        className="flex flex-row items-center gap-3 cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
        <CardTitle className="font-display text-lg sm:text-xl font-bold tracking-tight flex-1 truncate">
          {draft.title || "Untitled project"}
        </CardTitle>
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Switch
            checked={draft.published}
            onCheckedChange={(v) => setDraft({ ...draft, published: v })}
          />
          <Label className="text-xs uppercase tracking-wider">Publish</Label>
        </div>
      </CardHeader>

      {open && (
        <CardContent className="space-y-6 pt-0">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Field label="Title">
                <Input
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                />
              </Field>
              <Field label="Eyebrow label (above title)">
                <Input
                  value={draft.label}
                  onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                  placeholder='e.g. "Current Project" or "01"'
                />
              </Field>
              <Field label="Slug (URL)">
                <Input
                  value={draft.slug}
                  disabled
                  className="font-mono opacity-60"
                />
              </Field>
              <Field label="Lede (intro paragraph)">
                <AutoTextarea
                  value={draft.lede}
                  minRows={4}
                  onChange={(e) => setDraft({ ...draft, lede: e.target.value })}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Image variant">
                  <select
                    value={draft.image_variant}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        image_variant: e.target.value as "default" | "alt",
                      })
                    }
                    className="w-full h-9 border border-input rounded-md px-2 text-sm bg-background"
                  >
                    <option value="default">default</option>
                    <option value="alt">alt</option>
                  </select>
                </Field>
                <Field label="Sort position">
                  <Input
                    type="number"
                    value={draft.position}
                    onChange={(e) =>
                      setDraft({ ...draft, position: Number(e.target.value) || 0 })
                    }
                  />
                </Field>
              </div>
            </div>

            <ImageUploadField
              value={draft.image_url}
              onChange={(url) => setDraft({ ...draft, image_url: url })}
              label="Hero image"
              height="h-64"
            />
          </div>

          <BlocksEditor
            blocks={draft.blocks || []}
            onChange={(blocks) => setDraft({ ...draft, blocks })}
          />

          <div className="flex items-center gap-3 flex-wrap pt-2 border-t border-border">
            <Button onClick={() => updateMut.mutate()} disabled={updateMut.isPending}>
              {updateMut.isPending ? "Saving…" : "Save"}
            </Button>
            {success && (
              <span className="font-mono text-xs text-primary">{success}</span>
            )}
            <Button
              variant="ghost"
              className="ml-auto text-destructive hover:text-destructive"
              onClick={() => {
                if (confirm(`Delete "${draft.title}"?`)) deleteMut.mutate();
              }}
            >
              <Trash2 className="w-4 h-4 mr-1.5" />
              Delete
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground block mb-1">
        {label}
      </Label>
      {children}
    </div>
  );
}
