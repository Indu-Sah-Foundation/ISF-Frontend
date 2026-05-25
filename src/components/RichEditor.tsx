import { useCallback, useEffect, useRef } from "react";
import {
  EditorContent,
  ReactNodeViewRenderer,
  useEditor,
  type Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { ResizableImageView } from "./editor/ResizableImageView";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  ImagePlus,
  Link2,
  Undo2,
  Redo2,
  UploadCloud,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minus,
  Plus,
} from "lucide-react";
import { api } from "@/lib/api";

/**
 * Google-Docs-style WYSIWYG editor built on TipTap (headless ProseMirror).
 *
 * Behaviour:
 *   - Single editing surface — what you type IS what readers see (no preview).
 *   - One font, structural toolbar (headings, bullets, quote, link, image).
 *   - Drag/drop or paste an image → uploads via SAS → renders inline.
 *
 * Image handling:
 *   - Images are inserted with `data-align="center"` and `data-width="medium"`
 *     by default. Both attributes are persisted to the saved HTML so the
 *     public renderer styles them identically.
 *   - When an image is selected, the toolbar exposes alignment (left / center /
 *     right) and size (small / medium / large) buttons.
 *   - Dragging an image to a new spot in the document is built into ProseMirror
 *     — no extra wiring needed. To "wrap text around" an image, select it and
 *     click align-left or align-right; the public CSS floats it.
 */

// Extend the stock Image extension with:
//   - data-align ("left" | "center" | "right") — drives float CSS
//   - width (number, px) — drives the inline width on both sides
// The React NodeView (ResizableImageView) renders an <img> + a corner
// drag handle that updates `width` live as you resize. Saved HTML always
// has `data-align` and `width` inline so the public reader styles it
// identically without needing the NodeView.
const AlignableImage = Image.extend({
  // Letting ProseMirror know images can be dragged around the doc.
  // Without this, native drag is a no-op on the React NodeView wrapper.
  draggable: true,
  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: "center",
        parseHTML: (el) => el.getAttribute("data-align") || "center",
        renderHTML: (attrs) => ({ "data-align": attrs.align }),
      },
      width: {
        default: 480,
        parseHTML: (el) => {
          const w = el.getAttribute("width") || el.style.width;
          if (!w) return 480;
          const n = parseInt(w, 10);
          return Number.isFinite(n) && n > 0 ? n : 480;
        },
        renderHTML: (attrs) => {
          const w = typeof attrs.width === "number" ? attrs.width : 480;
          return { width: w, style: `width:${w}px` };
        },
      },
    };
  },
  // React NodeView gives us the drag handle. ProseMirror handles the rest.
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView);
  },
});

export function RichEditor({
  value,
  onChange,
  onUploadStart,
  onUploadEnd,
  onUploadError,
  placeholder = "Start writing your blog…",
}: {
  value: string;
  onChange: (html: string) => void;
  onUploadStart?: (filename: string) => void;
  onUploadEnd?: (filename: string) => void;
  onUploadError?: (message: string) => void;
  placeholder?: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      AlignableImage.configure({
        // `inline: true` lets the image sit INSIDE a paragraph so text can
        // actually flow around it when it's floated left/right (the Google
        // Docs behaviour). Without this, every image is a block in its own
        // paragraph and surrounding text never wraps.
        inline: true,
        HTMLAttributes: { class: "rich-img" },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-primary underline underline-offset-2" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "rich-editor prose-article max-w-none min-h-[28rem] focus:outline-none px-6 sm:px-10 py-8",
      },
      handleDrop: (_view, event) => {
        const files = Array.from(event.dataTransfer?.files || []).filter((f) =>
          f.type.startsWith("image/"),
        );
        if (files.length === 0) return false;
        event.preventDefault();
        for (const f of files) uploadAndInsert(f);
        return true;
      },
      handlePaste: (_view, event) => {
        const files = Array.from(event.clipboardData?.files || []).filter((f) =>
          f.type.startsWith("image/"),
        );
        if (files.length === 0) return false;
        event.preventDefault();
        for (const f of files) uploadAndInsert(f);
        return true;
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // -- Image upload via backend SAS → direct PUT to Blob ----------------------
  const uploadAndInsert = useCallback(
    async (file: File) => {
      if (!editor) return;
      onUploadStart?.(file.name);
      let sas;
      try {
        sas = await api.imageSAS(file);
      } catch (e: unknown) {
        const msg =
          e instanceof Error
            ? e.message
            : "Couldn't prepare the upload — please try again.";
        onUploadError?.(`Couldn't prepare "${file.name}" for upload. ${msg}`);
        onUploadEnd?.(file.name);
        return;
      }
      try {
        await api.uploadToBlob(file, sas.upload_url);
        editor
          .chain()
          .focus()
          .insertContent({
            type: "image",
            attrs: {
              src: sas.public_url,
              alt: file.name,
              align: "right",
              width: 360,
            },
          })
          .run();
      } catch (e: unknown) {
        const msg =
          e instanceof Error
            ? e.message
            : `Failed to upload ${file.name}.`;
        onUploadError?.(msg);
      } finally {
        onUploadEnd?.(file.name);
      }
    },
    [editor, onUploadStart, onUploadEnd, onUploadError],
  );

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value && value !== current) editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className="border-2 border-ink rounded overflow-hidden bg-card">
      <Toolbar editor={editor} onPickImage={() => fileRef.current?.click()} />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          for (const f of files) uploadAndInsert(f);
          if (fileRef.current) fileRef.current.value = "";
        }}
      />
      <EditorContent editor={editor} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toolbar
// ---------------------------------------------------------------------------

function Toolbar({
  editor,
  onPickImage,
}: {
  editor: Editor;
  onPickImage: () => void;
}) {
  const imageSelected = editor.isActive("image");
  const imgAttrs = imageSelected ? editor.getAttributes("image") : null;

  // Toolbar buttons mutate the selected image. We grab the node's position
  // BEFORE the update and re-create a NodeSelection on it AFTER, so the
  // controls stay open (otherwise ProseMirror collapses to a TextSelection
  // adjacent to the image and `isActive("image")` flips to false).
  const updateSelectedImage = (patch: Record<string, unknown>) => {
    const { selection } = editor.state;
    const pos = (selection as any).from as number;
    editor
      .chain()
      .focus()
      .updateAttributes("image", patch)
      .setNodeSelection(pos)
      .run();
  };
  const setImageAttr = (k: "align" | "width", v: string | number) =>
    updateSelectedImage({ [k]: v });

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b-2 border-ink bg-cream/70 backdrop-blur px-3 py-2">
      <Group>
        <TBtn label="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo2 className="w-4 h-4" />
        </TBtn>
        <TBtn label="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo2 className="w-4 h-4" />
        </TBtn>
      </Group>
      <Sep />
      <Group>
        <TBtn label="Heading 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading1 className="w-4 h-4" />
        </TBtn>
        <TBtn label="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="w-4 h-4" />
        </TBtn>
        <TBtn label="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="w-4 h-4" />
        </TBtn>
      </Group>
      <Sep />
      <Group>
        <TBtn label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="w-4 h-4" />
        </TBtn>
        <TBtn label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="w-4 h-4" />
        </TBtn>
        <TBtn label="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="w-4 h-4" />
        </TBtn>
      </Group>
      <Sep />
      <Group>
        <TBtn label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="w-4 h-4" />
        </TBtn>
        <TBtn label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="w-4 h-4" />
        </TBtn>
        <TBtn label="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="w-4 h-4" />
        </TBtn>
      </Group>
      <Sep />
      <Group>
        <TBtn
          label="Link"
          active={editor.isActive("link")}
          onClick={() => {
            const previous = editor.getAttributes("link").href;
            const url = window.prompt("URL", previous || "https://");
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().unsetLink().run();
            } else {
              editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
            }
          }}
        >
          <Link2 className="w-4 h-4" />
        </TBtn>
        <TBtn label="Insert image" onClick={onPickImage}>
          <ImagePlus className="w-4 h-4" />
        </TBtn>
      </Group>

      {/* Image controls — only show when an image is selected. */}
      {imageSelected && imgAttrs && (
        <>
          <Sep />
          <Group>
            <TBtn label="Align left (wrap text right)" active={imgAttrs.align === "left"} onClick={() => setImageAttr("align", "left")}>
              <AlignLeft className="w-4 h-4" />
            </TBtn>
            <TBtn label="Align center (no wrap)" active={imgAttrs.align === "center"} onClick={() => setImageAttr("align", "center")}>
              <AlignCenter className="w-4 h-4" />
            </TBtn>
            <TBtn label="Align right (wrap text left)" active={imgAttrs.align === "right"} onClick={() => setImageAttr("align", "right")}>
              <AlignRight className="w-4 h-4" />
            </TBtn>
          </Group>
          <Sep />
          <Group>
            {/* +/- buttons bump width by 80px. Or just grab the corner handle
                on the image itself to drag-resize. */}
            <TBtn
              label="Smaller (or drag corner)"
              onClick={() => {
                const cur = typeof imgAttrs.width === "number" ? imgAttrs.width : 480;
                updateSelectedImage({ width: Math.max(80, cur - 80) });
              }}
            >
              <Minus className="w-4 h-4" />
            </TBtn>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground px-1.5 min-w-[3.5rem] text-center">
              {typeof imgAttrs.width === "number" ? `${imgAttrs.width}px` : "480px"}
            </span>
            <TBtn
              label="Larger (or drag corner)"
              onClick={() => {
                const cur = typeof imgAttrs.width === "number" ? imgAttrs.width : 480;
                updateSelectedImage({ width: Math.min(1200, cur + 80) });
              }}
            >
              <Plus className="w-4 h-4" />
            </TBtn>
          </Group>
        </>
      )}

      <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline-flex items-center gap-1.5">
        <UploadCloud className="w-3.5 h-3.5" /> Drag to insert · click + drag corner to resize
      </span>
    </div>
  );
}

function TBtn({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      disabled={disabled}
      onClick={onClick}
      title={label}
      aria-label={label}
      className={
        "h-8 w-8 p-0 " +
        (active ? "bg-ink text-cream hover:bg-ink hover:text-cream" : "hover:bg-ink/10")
      }
    >
      {children}
    </Button>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>;
}

function Sep() {
  return <div className="w-px h-5 bg-ink/30 mx-1" />;
}
