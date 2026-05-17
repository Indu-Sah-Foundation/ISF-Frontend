import { forwardRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Textarea that grows vertically with its content. Use this in admin forms
 * anywhere overflow happens (project block bullets, blog titles, bios)
 * so the admin can always see everything they're writing without scrolling
 * a tiny fixed-height box.
 *
 * Behaviour:
 *   - Starts at one line (or `minRows` if set).
 *   - On every change, resizes to fit its scrollHeight, with no max.
 *   - Same look as the shadcn <Input> / <Textarea> so it slots in cleanly.
 */
interface Props
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> {
  /** Floor for the rendered height in lines. Defaults to 1. */
  minRows?: number;
}

export const AutoTextarea = forwardRef<HTMLTextAreaElement, Props>(
  function AutoTextarea({ className, value, onChange, minRows = 1, ...rest }, refIn) {
    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    // Bridge forwarded ref to our internal one.
    const setRef = (el: HTMLTextAreaElement | null) => {
      innerRef.current = el;
      if (typeof refIn === "function") refIn(el);
      else if (refIn) (refIn as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
    };

    const resize = () => {
      const el = innerRef.current;
      if (!el) return;
      // Reset to a single line first so we measure shrinking too.
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    };

    useEffect(() => {
      resize();
      // Resize on window changes so wrapping is recomputed for the new width.
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }, [value]);

    return (
      <textarea
        {...rest}
        ref={setRef}
        value={value}
        onChange={(e) => {
          onChange?.(e);
          resize();
        }}
        rows={minRows}
        className={cn(
          // Same baseline as shadcn Input/Textarea so this slots in cleanly.
          "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          "ring-offset-background placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-none overflow-hidden leading-snug",
          className,
        )}
      />
    );
  },
);
