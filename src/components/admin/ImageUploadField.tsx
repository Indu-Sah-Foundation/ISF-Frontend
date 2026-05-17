import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, X } from "lucide-react";
import { api } from "@/lib/api";

/**
 * Reusable image input for admin forms: shows the current image preview,
 * lets you swap it by uploading a new file (direct-to-Blob via SAS) OR by
 * pasting a remote URL, and clears with one click.
 *
 * Storage flow:
 *   1. POST /admin/images/sas — backend returns short-lived upload URL +
 *      the final public_url.
 *   2. Browser PUTs file bytes straight to Azure Blob.
 *   3. We hand the public_url back to the parent via onChange.
 */
export function ImageUploadField({
  value,
  onChange,
  label = "Image",
  height = "h-40",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  height?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setError("");
    setUploading(true);
    try {
      const sas = await api.imageSAS(file);
      await api.uploadToBlob(file, sas.upload_url);
      onChange(sas.public_url);
    } catch (e: any) {
      setError(e?.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground block">
        {label}
      </label>

      {value ? (
        <div className="relative border-2 border-ink rounded overflow-hidden bg-cream/40">
          {/* object-contain keeps the WHOLE image visible (letterboxed if
              the natural aspect doesn't match), so the admin can verify
              what they actually uploaded instead of seeing a crop. */}
          <img
            src={value}
            alt=""
            className={`${height} w-full object-contain block`}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-ink/80 text-cream rounded p-1 hover:bg-ink"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          className={`${height} border-2 border-dashed border-ink/40 rounded flex items-center justify-center bg-cream/30`}
        >
          <p className="text-sm text-muted-foreground">No image</p>
        </div>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <UploadCloud className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
              Uploading…
            </>
          ) : (
            <>
              <UploadCloud className="w-3.5 h-3.5 mr-1.5" />
              {value ? "Replace" : "Upload"}
            </>
          )}
        </Button>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="…or paste an image URL"
          className="flex-1 min-w-[180px] font-mono text-xs"
        />
      </div>

      {error && (
        <p className="font-mono text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
