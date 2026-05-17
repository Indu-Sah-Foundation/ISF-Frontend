// Browser-only gallery store. Items are saved as base64 data URLs in
// localStorage so the admin can manage them without an external API.
//
// NOTE: This is browser-local. Until a real backend gallery endpoint exists,
// items added by an admin are visible to that browser only. Replace `load` /
// `save` with API calls when the Go backend gains gallery support.

/**
 * Tile size — drives both the rendered aspect ratio and how many columns/rows
 * the tile spans in the gallery masonry grid.
 *   S = small square, single cell
 *   M = portrait, single cell (default)
 *   L = wide landscape, spans 2 columns
 *   XL = hero, spans 2 columns × 2 rows
 */
export type GallerySize = "S" | "M" | "L" | "XL";

export interface GalleryItem {
  id: string;
  title: string;
  caption?: string;
  src: string; // data URL or remote URL
  size?: GallerySize;
  tags?: string[];
  createdAt: number;
}

export const GALLERY_TAGS = [
  "Dental",
  "STEM",
  "Relief",
  "Education",
  "Community",
  "Events",
] as const;

const KEY = "isf_gallery_items_v1";

export const gallery = {
  load(): GalleryItem[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as GalleryItem[]) : [];
    } catch {
      return [];
    }
  },
  save(items: GalleryItem[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(KEY, JSON.stringify(items));
  },
  add(item: Omit<GalleryItem, "id" | "createdAt">): GalleryItem {
    const items = gallery.load();
    const next: GalleryItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    items.unshift(next);
    gallery.save(items);
    return next;
  },
  update(id: string, patch: Partial<GalleryItem>) {
    const items = gallery.load().map((i) => (i.id === id ? { ...i, ...patch } : i));
    gallery.save(items);
  },
  remove(id: string) {
    gallery.save(gallery.load().filter((i) => i.id !== id));
  },
  reorder(ids: string[]) {
    const items = gallery.load();
    const map = new Map(items.map((i) => [i.id, i]));
    const next = ids.map((id) => map.get(id)!).filter(Boolean);
    gallery.save(next);
  },
};

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
