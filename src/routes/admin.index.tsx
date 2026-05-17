import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { auth, api } from "@/lib/api";
import { AdminShell } from "@/components/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, FileText, Image as ImageIcon, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminPage,
});

function AdminPage() {
  // AdminShell handles auth gating; here we just render the dashboard.
  const user = typeof window !== "undefined" ? auth.getUser() : null;

  return (
    <AdminShell>
      <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="mb-10 border-b-2 border-ink pb-8">
          <span className="font-mono text-primary text-xs uppercase tracking-[0.2em]">
            Admin
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tighter mt-2">
            Blog <span className="pencil-underline">Manager</span>
          </h1>
          {user && (
            <p className="text-muted-foreground mt-3">
              Signed in as <span className="font-mono">{user.email}</span> ·{" "}
              <span className="font-mono uppercase text-xs">{user.role}</span>
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 border-ink pencil-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" /> New Blog
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Write a new blog. Drag images directly into the editor.
              </p>
              <Button className="w-full" asChild>
                <Link to="/admin/editor">Create new blog</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-ink pencil-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" /> All Blogs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Edit, publish, unpublish, or delete existing posts.
              </p>
              <Button className="w-full" variant="outline" asChild>
                <Link to="/admin/articles">Manage blogs</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-ink pencil-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" /> Gallery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Drag, drop, reorder and caption photos for the public gallery.
              </p>
              <Button className="w-full" variant="outline" asChild>
                <Link to="/admin/gallery">Manage gallery</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <BlobCleanupCard />
      </div>
    </AdminShell>
  );
}

// ---------------------------------------------------------------------------
// BlobCleanupCard — scans Azure Blob for images that no DB row references
// anymore (deleted articles, removed gallery items, replaced project /
// achievement / team / volunteer photos) and deletes them. Preview first,
// confirm, then delete.
// ---------------------------------------------------------------------------

function BlobCleanupCard() {
  const [preview, setPreview] = useState<{
    total_blobs: number;
    referenced: number;
    orphans: string[];
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const runPreview = async () => {
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      const r = await api.previewBlobCleanup();
      setPreview(r);
    } catch (e: any) {
      setError(e?.message || "Preview failed");
    } finally {
      setBusy(false);
    }
  };

  const runDelete = async () => {
    if (!preview || preview.orphans.length === 0) return;
    if (
      !confirm(
        `Delete ${preview.orphans.length} orphaned image${preview.orphans.length === 1 ? "" : "s"} from Azure Blob? This can't be undone.`,
      )
    ) {
      return;
    }
    setBusy(true);
    setError("");
    try {
      const r = await api.runBlobCleanup();
      setSuccess(`Deleted ${r.deleted.length} of ${r.orphans.length} orphans.`);
      setPreview(null);
    } catch (e: any) {
      setError(e?.message || "Cleanup failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="border-2 border-ink pencil-shadow mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trash2 className="w-5 h-5" /> Blob Storage Cleanup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Find and delete images sitting in Azure Blob that no longer
          appear in any blog body, gallery item, project, achievement,
          team member, or volunteer record. Preview first — nothing is
          deleted until you confirm.
        </p>

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

        {preview && (
          <div className="border-2 border-ink/30 rounded p-4 bg-cream/40">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Scan results
            </p>
            <div className="grid grid-cols-3 gap-4 mb-3">
              <Stat label="Total blobs" value={preview.total_blobs} />
              <Stat label="In use" value={preview.referenced} />
              <Stat label="Orphans" value={preview.orphans.length} />
            </div>
            {preview.orphans.length > 0 && (
              <details className="text-xs font-mono mt-2">
                <summary className="cursor-pointer text-muted-foreground">
                  Show orphan list
                </summary>
                <ul className="mt-2 max-h-40 overflow-y-auto space-y-1 text-muted-foreground">
                  {preview.orphans.map((o) => (
                    <li key={o} className="truncate">{o}</li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}

        <div className="flex gap-3 flex-wrap">
          <Button variant="outline" onClick={runPreview} disabled={busy}>
            {busy && !preview ? "Scanning…" : "Scan for orphans"}
          </Button>
          {preview && preview.orphans.length > 0 && (
            <Button
              variant="destructive"
              onClick={runDelete}
              disabled={busy}
            >
              {busy ? "Deleting…" : `Delete ${preview.orphans.length} orphan${preview.orphans.length === 1 ? "" : "s"}`}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="font-display text-2xl font-extrabold">{value}</div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
