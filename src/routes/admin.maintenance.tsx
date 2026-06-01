import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Wrench, ExternalLink, CheckCircle2, Circle } from "lucide-react";
import { AdminShell } from "@/components/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api, type MaintenanceResult } from "@/lib/api";

export const Route = createFileRoute("/admin/maintenance")({
  component: AdminMaintenancePage,
});

const areaLabel: Record<MaintenanceResult["area"], string> = {
  frontend: "Website",
  backend: "API / Server",
  infra: "Infrastructure",
};

function AdminMaintenancePage() {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lastResult, setLastResult] = useState<MaintenanceResult | null>(null);

  const list = useQuery({
    queryKey: ["admin", "maintenance"],
    queryFn: () => api.listMaintenance(),
    refetchOnWindowFocus: true,
  });

  const createMut = useMutation({
    mutationFn: () => api.createMaintenance({ title, description }),
    onSuccess: (res) => {
      setLastResult(res);
      setTitle("");
      setDescription("");
      qc.invalidateQueries({ queryKey: ["admin", "maintenance"] });
    },
  });

  const issues = list.data?.items || [];

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-10">
        <header className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tighter flex items-center gap-3">
            <Wrench className="size-7" /> Maintenance
          </h1>
          <p className="mt-2 text-muted-foreground">
            Report something that needs fixing. It's filed as a GitHub issue and
            automatically routed to the right part of the system — you don't need
            to know which.
          </p>
        </header>

        {/* New request form */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (title.trim().length >= 3) createMut.mutate();
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="m-title"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block"
                >
                  What's the issue?
                </label>
                <input
                  id="m-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  minLength={3}
                  maxLength={200}
                  placeholder="e.g. The donate button is cut off on iPad"
                  className="w-full py-3 px-4 bg-background border border-border focus:border-primary outline-none font-display"
                />
              </div>
              <div>
                <label
                  htmlFor="m-desc"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block"
                >
                  Details (optional)
                </label>
                <textarea
                  id="m-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  maxLength={5000}
                  placeholder="Steps to reproduce, what page, what you expected…"
                  wrap="soft"
                  className="block w-full py-3 px-4 bg-background border border-border focus:border-primary outline-none font-display resize-none overflow-x-hidden whitespace-pre-wrap break-words box-border"
                />
              </div>

              {createMut.isError && (
                <p className="text-sm text-destructive font-mono">
                  {(createMut.error as Error).message}
                </p>
              )}

              <Button
                type="submit"
                disabled={createMut.isPending || title.trim().length < 3}
              >
                {createMut.isPending ? "Filing…" : "Submit request"}
              </Button>
            </form>

            {lastResult && (
              <div className="mt-5 border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
                Filed to <strong>{areaLabel[lastResult.area]}</strong> (
                {lastResult.repo}) —{" "}
                <a
                  href={lastResult.issue.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline inline-flex items-center gap-1"
                >
                  issue #{lastResult.issue.number}
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent requests */}
        <h2 className="font-display text-xl font-extrabold tracking-tight mb-4">
          Recent requests
        </h2>

        {list.isLoading && (
          <p className="text-muted-foreground">Loading…</p>
        )}
        {list.isError && (
          <p className="text-muted-foreground font-mono text-sm">
            Couldn't load maintenance issues. The GitHub integration may not be
            configured yet.
          </p>
        )}
        {!list.isLoading && issues.length === 0 && !list.isError && (
          <p className="text-muted-foreground">No maintenance requests yet.</p>
        )}

        <div className="space-y-2">
          {issues.map((it) => (
            <a
              key={it.html_url}
              href={it.html_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 border border-border hover:border-primary px-4 py-3 transition-colors group"
            >
              {it.state === "closed" ? (
                <CheckCircle2 className="size-4 text-primary shrink-0" />
              ) : (
                <Circle className="size-4 text-muted-foreground shrink-0" />
              )}
              <span className="flex-1 font-display group-hover:text-primary transition-colors">
                {it.title}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                #{it.number} · {it.state}
              </span>
              <ExternalLink className="size-3.5 text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
