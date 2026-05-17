import { useRef, useState } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { NodeSelection } from "@tiptap/pm/state";

/**
 * React NodeView for blog images. Renders the <img> + a corner resize
 * handle (visible while the image is selected) + a live px readout. The
 * new width is committed to the node's `width` attribute on mouseup so it
 * persists through save/load/drag-drop.
 *
 * Selection behaviour:
 *   Clicking anywhere on the image explicitly creates a NodeSelection on
 *   it. Without that, ProseMirror's default click handling sometimes lands
 *   a TextSelection NEXT to the image instead, which makes the toolbar's
 *   image-only controls flicker in and out.
 */
export function ResizableImageView({
  node,
  updateAttributes,
  selected,
  editor,
  getPos,
}: NodeViewProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [previewWidth, setPreviewWidth] = useState<number | null>(null);

  const align = (node.attrs.align as string) || "center";
  const savedWidth = node.attrs.width as number | string | null;
  // Width is stored as a px number; legacy string presets ("medium" etc.)
  // get a sensible fallback so old articles still render.
  const numericWidth =
    typeof savedWidth === "number"
      ? savedWidth
      : savedWidth === "small"
        ? 240
        : savedWidth === "large"
          ? 900
          : 480;

  const displayWidth = previewWidth ?? numericWidth;
  const editable = editor?.isEditable;

  /** Explicitly select this node so the toolbar's image controls show up. */
  const selectThisNode = () => {
    if (!editor || typeof getPos !== "function") return;
    const pos = getPos();
    if (typeof pos !== "number") return;
    const { state, view } = editor;
    const tr = state.tr.setSelection(NodeSelection.create(state.doc, pos));
    view.dispatch(tr);
  };

  const onResizeStart = (e: React.MouseEvent) => {
    if (!editable) return;
    e.preventDefault();
    e.stopPropagation();
    // Keep this node selected throughout the resize so the toolbar's image
    // controls don't disappear mid-drag.
    selectThisNode();

    const startX = e.clientX;
    // Use the saved attribute, NOT offsetWidth — offsetWidth can be a stale
    // value mid-React-render and was the source of the "snaps back to
    // original size" bug.
    const startWidth = numericWidth;

    const onMove = (ev: MouseEvent) => {
      const delta = ev.clientX - startX;
      // Floated right? Dragging left should grow the image. Invert delta.
      const next = Math.max(
        80,
        Math.min(1200, startWidth + (align === "right" ? -delta : delta)),
      );
      setPreviewWidth(next);
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      // Commit once on release — one transaction instead of one per pixel.
      setPreviewWidth((w) => {
        if (w != null) updateAttributes({ width: Math.round(w) });
        return null;
      });
      // Re-select so the toolbar stays open after the resize lands.
      selectThisNode();
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <NodeViewWrapper
      as="span"
      ref={containerRef}
      className={"rich-img-wrapper" + (selected ? " is-selected" : "")}
      data-align={align}
      style={{ width: displayWidth }}
      // `data-drag-handle` + `draggable` = ProseMirror lets you grab the
      // image and drop it elsewhere in the document. Text reflows around
      // the new position automatically.
      data-drag-handle
      draggable={editable ? true : undefined}
      onClick={(e: React.MouseEvent) => {
        // Select on click so the toolbar's image-only controls appear
        // reliably. preventDefault here would block ProseMirror's drag
        // initiation, so we don't.
        e.stopPropagation();
        selectThisNode();
      }}
    >
      <img
        src={node.attrs.src}
        alt={node.attrs.alt || ""}
        className={"rich-img" + (selected ? " is-selected" : "")}
        data-align={align}
        draggable={false}
      />
      {selected && editable && (
        <>
          {/* Floating align toolbar — appears just above the selected image
              so the admin doesn't have to scroll up to the main toolbar to
              reposition it. Left = float left (text wraps right),
              Center = block (no wrap), Right = float right (text wraps left). */}
          <span
            className="rich-img-floating-toolbar"
            onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            onDragStart={(e: React.DragEvent) => e.stopPropagation()}
            draggable={false}
          >
            <button
              type="button"
              className={"rich-img-align-btn " + (align === "left" ? "is-active" : "")}
              onClick={() => updateAttributes({ align: "left" })}
              title="Float left — text wraps right"
            >
              ⇤
            </button>
            <button
              type="button"
              className={"rich-img-align-btn " + (align === "center" ? "is-active" : "")}
              onClick={() => updateAttributes({ align: "center" })}
              title="Center — no text wrap"
            >
              ▭
            </button>
            <button
              type="button"
              className={"rich-img-align-btn " + (align === "right" ? "is-active" : "")}
              onClick={() => updateAttributes({ align: "right" })}
              title="Float right — text wraps left"
            >
              ⇥
            </button>
          </span>

          <span
            className={
              "rich-img-handle " +
              (align === "right" ? "rich-img-handle--bl" : "rich-img-handle--br")
            }
            onMouseDown={onResizeStart}
            onDragStart={(e) => e.stopPropagation()}
            draggable={false}
            aria-label="Drag to resize image"
          />
          <span className="rich-img-readout">{Math.round(displayWidth)}px</span>
        </>
      )}
    </NodeViewWrapper>
  );
}
