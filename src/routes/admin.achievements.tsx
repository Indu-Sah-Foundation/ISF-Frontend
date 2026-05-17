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
import { api, type Achievement } from "@/lib/api";

export const Route = createFileRoute("/admin/achievements")({
  component: AdminAchievementsPage,
});

function AdminAchievementsPage() {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "achievements"],
    queryFn: () => api.listAchievements(true),
  });

  const createMut = useMutation({
    mutationFn: () =>
      api.createAchievement({
        slot: `award-${Date.now()}`,
        title: "New achievement",
        published: false,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "achievements"] }),
  });

  return (
    <AdminShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tighter">
            Manage Achievements
          </h1>
          <Button onClick={() => createMut.mutate()} disabled={createMut.isPending}>
            <Plus className="w-4 h-4 mr-2" />
            {createMut.isPending ? "Adding…" : "Add achievement"}
          </Button>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50 mb-6">
            <AlertDescription className="text-red-800">
              {(error as Error).message}
            </AlertDescription>
          </Alert>
        )}

        {isLoading && <p className="text-muted-foreground">Loading…</p>}

        {data && data.items.length === 0 && (
          <p className="text-muted-foreground">
            No achievements yet — click "Add achievement" to create one.
          </p>
        )}

        <div className="space-y-6">
          {data?.items.map((a) => (
            <AchievementRow key={a.id} achievement={a} />
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

function AchievementRow({ achievement }: { achievement: Achievement }) {
  const qc = useQueryClient();
  const [draft, setDraft] = useState(achievement);
  const [success, setSuccess] = useState("");

  const updateMut = useMutation({
    mutationFn: () =>
      api.updateAchievement(achievement.id, {
        title: draft.title,
        organization: draft.organization,
        place: draft.place,
        body: draft.body,
        image_url: draft.image_url,
        position: draft.position,
        published: draft.published,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "achievements"] });
      setSuccess("Saved");
      setTimeout(() => setSuccess(""), 1500);
    },
  });

  const deleteMut = useMutation({
    mutationFn: () => api.deleteAchievement(achievement.id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "achievements"] }),
  });

  return (
    <Card className="border-2 border-ink pencil-shadow">
      <CardHeader className="flex flex-row items-center gap-3">
        <GripVertical className="w-4 h-4 text-muted-foreground" />
        <CardTitle className="font-display text-lg sm:text-xl font-bold tracking-tight flex-1 truncate">
          {draft.title || "Untitled achievement"}
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
            <Field label="Title">
              <Input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </Field>
            <Field label="Organization">
              <Input
                value={draft.organization}
                onChange={(e) => setDraft({ ...draft, organization: e.target.value })}
              />
            </Field>
            <Field label="Place">
              <Input
                value={draft.place}
                onChange={(e) => setDraft({ ...draft, place: e.target.value })}
              />
            </Field>
            <Field label="Body">
              <AutoTextarea
                value={draft.body}
                onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                minRows={4}
              />
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
          <ImageUploadField
            value={draft.image_url}
            onChange={(url) => setDraft({ ...draft, image_url: url })}
            label="Certificate / letter image"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-2">
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
