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
import { api, type TeamMember, type TeamKind } from "@/lib/api";

export const Route = createFileRoute("/admin/team")({
  component: AdminTeamPage,
});

const KIND_TABS: { kind: TeamKind; label: string }[] = [
  { kind: "founder", label: "Founders" },
  { kind: "advisor_intl", label: "International Advisors" },
  { kind: "advisor_nat", label: "National Advisors" },
  { kind: "board", label: "Board Members" },
];

function AdminTeamPage() {
  const qc = useQueryClient();
  const [active, setActive] = useState<TeamKind>("founder");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "team"],
    queryFn: () => api.listTeam({ admin: true }),
  });

  const createMut = useMutation({
    mutationFn: () =>
      api.createTeamMember({
        kind: active,
        name: "New person",
        published: false,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "team"] }),
  });

  const visible = (data?.items || []).filter((p) => p.kind === active);

  return (
    <AdminShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tighter">
            Manage Team
          </h1>
          <Button onClick={() => createMut.mutate()} disabled={createMut.isPending}>
            <Plus className="w-4 h-4 mr-2" />
            Add to {KIND_TABS.find((k) => k.kind === active)?.label}
          </Button>
        </div>

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
          {visible.map((m) => (
            <TeamRow key={m.id} member={m} />
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

function TeamRow({ member }: { member: TeamMember }) {
  const qc = useQueryClient();
  const [draft, setDraft] = useState(member);
  const [success, setSuccess] = useState("");

  // Board members only display name + role on the public page, so we hide
  // the bio/extras/motto fields for them to keep the form simple.
  const compact = draft.kind === "board";

  const updateMut = useMutation({
    mutationFn: () =>
      api.updateTeamMember(member.id, {
        name: draft.name,
        role: draft.role,
        extras: draft.extras,
        bio: draft.bio,
        motto: draft.motto,
        image_url: draft.image_url,
        position: draft.position,
        published: draft.published,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "team"] });
      setSuccess("Saved");
      setTimeout(() => setSuccess(""), 1500);
    },
  });

  const deleteMut = useMutation({
    mutationFn: () => api.deleteTeamMember(member.id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "team"] }),
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
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Field label="Name">
              <Input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </Field>
            <Field label="Role / title">
              <Input
                value={draft.role}
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                placeholder='e.g. "Co-Founder · Executive Director"'
              />
            </Field>
            {!compact && (
              <>
                <Field label="Extras (credentials line under role)">
                  <Input
                    value={draft.extras}
                    onChange={(e) => setDraft({ ...draft, extras: e.target.value })}
                  />
                </Field>
                <Field label="Bio">
                  <AutoTextarea
                    value={draft.bio}
                    onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                    minRows={5}
                  />
                </Field>
                <Field label="Motto (optional italic pull-quote)">
                  <Input
                    value={draft.motto}
                    onChange={(e) => setDraft({ ...draft, motto: e.target.value })}
                  />
                </Field>
              </>
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
          <ImageUploadField
            value={draft.image_url}
            onChange={(url) => setDraft({ ...draft, image_url: url })}
            label="Portrait"
            height={compact ? "h-40" : "h-64"}
          />
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
