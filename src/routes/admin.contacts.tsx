import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Mail, Trash2, CheckCircle2, Circle } from "lucide-react";
import { AdminShell } from "@/components/AdminShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";

export const Route = createFileRoute("/admin/contacts")({
  component: AdminContactsPage,
});

function AdminContactsPage() {
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "contacts"],
    queryFn: () => api.listContacts(200, 0),
    refetchOnWindowFocus: true,
  });

  const markReadMut = useMutation({
    mutationFn: ({ id, read }: { id: string; read: boolean }) =>
      api.markContactRead(id, read),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "contacts"] });
    },
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => api.deleteContact(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "contacts"] });
    },
  });

  const items = data?.items || [];
  const unread = items.filter((c) => !c.read).length;

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-10">
        <header className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tighter">
            Messages
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Contact-form submissions from the public site.
            {items.length > 0 && (
              <>
                {" "}
                <span className="font-mono">{items.length}</span> total
                {unread > 0 && (
                  <>
                    , <span className="font-mono text-primary">{unread}</span>{" "}
                    unread
                  </>
                )}
                .
              </>
            )}
          </p>
        </header>

        {isLoading && <p className="text-muted-foreground">Loading messages…</p>}
        {isError && (
          <p className="text-destructive font-mono text-sm">
            Couldn't load messages. Refresh in a moment.
          </p>
        )}

        {!isLoading && items.length === 0 && (
          <Card className="border-2 border-ink">
            <CardContent className="py-12 text-center text-muted-foreground">
              <Mail className="w-8 h-8 mx-auto mb-3 opacity-50" />
              No messages yet. New contact-form submissions will appear here.
            </CardContent>
          </Card>
        )}

        <ul className="space-y-4">
          {items.map((c) => (
            <li
              key={c.id}
              className={
                "border-2 border-ink p-5 sm:p-6 transition-colors " +
                (c.read ? "bg-cream/40" : "bg-cream")
              }
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {!c.read && (
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] bg-primary text-primary-foreground px-1.5 py-0.5">
                        New
                      </span>
                    )}
                    <a
                      href={`mailto:${c.email}?subject=Re: Your message to Indu Sah Foundation`}
                      className="font-display font-extrabold text-base sm:text-lg break-all hover:underline underline-offset-2"
                    >
                      {c.email}
                    </a>
                  </div>
                  <p className="font-mono text-[11px] text-muted-foreground mt-1">
                    {new Date(c.created_at).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                    {c.ip && <span className="ml-2 opacity-60">· {c.ip}</span>}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => markReadMut.mutate({ id: c.id, read: !c.read })}
                    aria-label={c.read ? "Mark unread" : "Mark read"}
                  >
                    {c.read ? (
                      <Circle className="w-4 h-4" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm(`Delete this message from ${c.email}?`)) {
                        deleteMut.mutate(c.id);
                      }
                    }}
                    aria-label="Delete message"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <p className="mt-4 whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-pretty">
                {c.message}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </AdminShell>
  );
}
