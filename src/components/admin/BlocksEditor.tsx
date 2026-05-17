import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AutoTextarea } from "./AutoTextarea";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import type { ProjectBlock } from "@/lib/api";

/**
 * Visual editor for the JSONB `blocks` array on a Project.
 *
 * Each block is one of three discriminated types:
 *   - paragraph    → heading + body text
 *   - bullets      → heading + list of items
 *   - subsections  → list of {heading, items[]} groups (e.g. ISF SMILE A/B/C)
 *
 * Admins add/reorder/remove blocks; the public /events page renders them
 * in order using the exact same shape we ship to the backend.
 */
export function BlocksEditor({
  blocks,
  onChange,
}: {
  blocks: ProjectBlock[];
  onChange: (next: ProjectBlock[]) => void;
}) {
  const update = (i: number, next: ProjectBlock) => {
    const out = blocks.slice();
    out[i] = next;
    onChange(out);
  };
  const remove = (i: number) => onChange(blocks.filter((_, j) => j !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const out = blocks.slice();
    [out[i], out[j]] = [out[j], out[i]];
    onChange(out);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Body blocks
        </Label>
        <div className="flex gap-1.5">
          <AddBtn onClick={() => onChange([...blocks, { type: "paragraph", body: "" }])}>
            + Paragraph
          </AddBtn>
          <AddBtn
            onClick={() => onChange([...blocks, { type: "bullets", items: [""] }])}
          >
            + Bullets
          </AddBtn>
          <AddBtn
            onClick={() =>
              onChange([
                ...blocks,
                { type: "subsections", items: [{ heading: "", items: [""] }] },
              ])
            }
          >
            + Sub-sections
          </AddBtn>
        </div>
      </div>

      {blocks.length === 0 && (
        <p className="text-sm text-muted-foreground border-2 border-dashed border-ink/30 rounded p-6 text-center">
          No body blocks yet. Add a paragraph, bullet list, or sub-sections above.
        </p>
      )}

      {blocks.map((b, i) => (
        <div
          key={i}
          className="border-2 border-ink/40 rounded p-4 space-y-3 bg-cream/30"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              {b.type}
            </span>
            <div className="flex gap-1">
              <IconBtn label="Move up" onClick={() => move(i, -1)}>
                <ArrowUp className="w-3.5 h-3.5" />
              </IconBtn>
              <IconBtn label="Move down" onClick={() => move(i, 1)}>
                <ArrowDown className="w-3.5 h-3.5" />
              </IconBtn>
              <IconBtn label="Remove" onClick={() => remove(i)} destructive>
                <Trash2 className="w-3.5 h-3.5" />
              </IconBtn>
            </div>
          </div>

          {b.type === "paragraph" && (
            <>
              <Input
                placeholder="Heading (optional)"
                value={b.heading || ""}
                onChange={(e) => update(i, { ...b, heading: e.target.value })}
              />
              <AutoTextarea
                placeholder="Paragraph body"
                minRows={3}
                value={b.body}
                onChange={(e) => update(i, { ...b, body: e.target.value })}
              />
            </>
          )}

          {b.type === "bullets" && (
            <BulletList
              heading={b.heading}
              items={b.items}
              onChange={(heading, items) => update(i, { ...b, heading, items })}
            />
          )}

          {b.type === "subsections" && (
            <SubSectionsEditor
              heading={b.heading}
              groups={b.items}
              onChange={(heading, items) => update(i, { ...b, heading, items })}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function BulletList({
  heading,
  items,
  onChange,
}: {
  heading?: string;
  items: string[];
  onChange: (heading: string | undefined, items: string[]) => void;
}) {
  const setItem = (i: number, v: string) => {
    const out = items.slice();
    out[i] = v;
    onChange(heading, out);
  };
  return (
    <>
      <Input
        placeholder="Heading (optional)"
        value={heading || ""}
        onChange={(e) => onChange(e.target.value, items)}
      />
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2 items-start">
            <AutoTextarea
              value={it}
              onChange={(e) => setItem(i, e.target.value)}
              placeholder={`Item ${i + 1}`}
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => onChange(heading, items.filter((_, j) => j !== i))}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => onChange(heading, [...items, ""])}
      >
        <Plus className="w-3.5 h-3.5 mr-1" /> Add item
      </Button>
    </>
  );
}

function SubSectionsEditor({
  heading,
  groups,
  onChange,
}: {
  heading?: string;
  groups: { heading: string; items: string[] }[];
  onChange: (
    heading: string | undefined,
    groups: { heading: string; items: string[] }[],
  ) => void;
}) {
  const setGroup = (i: number, g: { heading: string; items: string[] }) => {
    const out = groups.slice();
    out[i] = g;
    onChange(heading, out);
  };
  return (
    <>
      <Input
        placeholder="Section heading (optional)"
        value={heading || ""}
        onChange={(e) => onChange(e.target.value, groups)}
      />
      <div className="space-y-4">
        {groups.map((g, i) => (
          <div
            key={i}
            className="border border-ink/30 rounded p-3 space-y-2 bg-background"
          >
            <div className="flex gap-2 items-start">
              <Input
                value={g.heading}
                onChange={(e) => setGroup(i, { ...g, heading: e.target.value })}
                placeholder="Subsection heading (e.g. A · General Health Camp)"
              />
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => onChange(heading, groups.filter((_, j) => j !== i))}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
            <BulletList
              items={g.items}
              onChange={(_, items) => setGroup(i, { ...g, items })}
            />
          </div>
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => onChange(heading, [...groups, { heading: "", items: [""] }])}
      >
        <Plus className="w-3.5 h-3.5 mr-1" /> Add subsection
      </Button>
    </>
  );
}

function AddBtn({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button type="button" size="sm" variant="outline" onClick={onClick}>
      {children}
    </Button>
  );
}

function IconBtn({
  onClick,
  label,
  destructive,
  children,
}: {
  onClick: () => void;
  label: string;
  destructive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={
        "h-7 w-7 p-0 " + (destructive ? "text-destructive hover:text-destructive" : "")
      }
    >
      {children}
    </Button>
  );
}
