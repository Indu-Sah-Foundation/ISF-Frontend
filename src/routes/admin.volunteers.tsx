import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AutoTextarea } from "@/components/admin/AutoTextarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { api, type Volunteer, type VolunteerKind } from "@/lib/api";

export const Route = createFileRoute("/admin/volunteers")({
  component: AdminVolunteersPage,
});

const KIND_TABS: { kind: VolunteerKind; label: string }[] = [
  { kind: "team", label: "Field Team" },
  { kind: "volunteer_field", label: "Volunteer Fields" },
  { kind: "research_field", label: "Research Fields" },
];

function AdminVolunteersPage() {
  const qc = useQueryClient();
  const [active, setActive] = useState<VolunteerKind>("team");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "volunteers"],
    queryFn: () => api.listVolunteers({ admin: true }),
  });

  const createMut = useMutation({
    mutationFn: () =>
      api.createVolunteer({
        kind: active,
        name: active === "team" ? "New team member" : "New field",
        published: false,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "volunteers"] }),
  });

  const visible = (data?.items || []).filter((v) => v.kind === active);

  return (
    <AdminShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tighter">
            Manage Volunteers
          </h1>
          <Button onClick={() => createMut.mutate()} disabled={createMut.isPending}>
            <Plus className="w-4 h-4 mr-2" />
            Add to {KIND_TABS.find((k) => k.kind === active)?.label}
          </Button>
        </div>

        {/* Kind tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {KIND_TABS.map((t) => (
            <button
              key={t.kind}
              onClick={() => setActive(t.kind)}
              className={
                "font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-2 border-2 transition-colors whitespace-nowrap " +
                (active === t.kind
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/40 text-muted-foreground hover:border-ink hover:text-foreground")
              }
            >
              {t.label} ({(data?.items || []).filter((v) => v.kind === t.kind).length})
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
          <p className="text-muted-foreground">No entries in this group yet.</p>
        )}

        <div className="space-y-6">
          {visible.map((v) => (
            <VolunteerRow key={v.id} volunteer={v} />
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

function VolunteerRow({ volunteer }: { volunteer: Volunteer }) {
  const qc = useQueryClient();
  const [draft, setDraft] = useState(volunteer);
  const [success, setSuccess] = useState("");

  const isTeam = draft.kind === "team";

  const updateMut = useMutation({
    mutationFn: () =>
      api.updateVolunteer(volunteer.id, {
        name: draft.name,
        bio: draft.bio,
        image_url: draft.image_url,
        position: draft.position,
        published: draft.published,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "volunteers"] });
      setSuccess("Saved");
      setTimeout(() => setSuccess(""), 1500);
    },
  });

  const deleteMut = useMutation({
    mutationFn: () => api.deleteVolunteer(volunteer.id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "volunteers"] }),
  });

  return (
    <Card className="border-2 border-ink pencil-shadow">
      <CardHeader className="flex flex-row items-center gap-3">
        <GripVertical className="w-4 h-4 text-muted-foreground" />
        <CardTitle className="font-display text-lg sm:text-xl font-bold tracking-tight flex-1 truncate">
          {draft.name || "Untitled"}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Switch
            checked={draft.published}
            onCheckedChange={(v) => setDraft({ ...draft, published: v })}
          />
          <Label className="text-xs uppercase tracking-wider">Publish</Label>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={isTeam ? "grid md:grid-cols-2 gap-4" : ""}>
          <div className="space-y-4">
            <Field label={isTeam ? "Name" : "Label"}>
              <Input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </Field>
            {isTeam && (
              <Field label="Bio">
                <AutoTextarea
                  value={draft.bio}
                  onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                  minRows={5}
                />
              </Field>
            )}
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
          {isTeam && (
            <ImageUploadField
              value={draft.image_url}
              onChange={(url) => setDraft({ ...draft, image_url: url })}
              label="Portrait"
            />
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-2">
          <Button onClick={() => updateMut.mutate()} disabled={updateMut.isPending}>
            {updateMut.isPending ? "Saving…" : "Save"}
          </Button>
          {success && <span className="font-mono text-xs text-primary">{success}</span>}
          <Button
            variant="ghost"
            className="ml-auto text-destructive hover:text-destructive"
            onClick={() => {
              if (confirm(`Delete "${draft.name}"?`)) deleteMut.mutate();
            }}
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Delete
          </Button>
        </div>
      </CardContent>
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
