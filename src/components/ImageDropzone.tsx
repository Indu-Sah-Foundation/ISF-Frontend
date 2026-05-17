import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon, Upload, X } from "lucide-react";
import { api } from "@/lib/api";

interface UploadingFile {
  id: string;
  name: string;
  progress: "uploading" | "done" | "error";
  url?: string;
  error?: string;
}

interface Props {
  onUploaded: (markdown: string) => void;
  children: React.ReactNode;
}

const ACCEPT = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/gif": [".gif"],
};
const MAX_BYTES = 10 * 1024 * 1024;

export function ImageDropzone({ onUploaded, children }: Props) {
  const [files, setFiles] = useState<UploadingFile[]>([]);

  const upload = useCallback(
    async (file: File) => {
      const id = Math.random().toString(36).slice(2);
      setFiles((prev) => [
        ...prev,
        { id, name: file.name, progress: "uploading" },
      ]);
      try {
        const sas = await api.imageSAS(file);
        await api.uploadToBlob(file, sas.upload_url);
        const alt = file.name.replace(/\.[^.]+$/, "");
        onUploaded(`\n\n![${alt}](${sas.public_url})\n\n`);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, progress: "done", url: sas.public_url } : f,
          ),
        );
        setTimeout(
          () => setFiles((prev) => prev.filter((f) => f.id !== id)),
          3000,
        );
      } catch (err: any) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id
              ? {
                  ...f,
                  progress: "error",
                  error: err.message || "Upload failed",
                }
              : f,
          ),
        );
      }
    },
    [onUploaded],
  );

  const onDrop = useCallback(
    (accepted: File[]) => accepted.forEach(upload),
    [upload],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: ACCEPT,
    maxSize: MAX_BYTES,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div {...getRootProps()} className="relative">
      <input {...getInputProps()} />

      {isDragActive && (
        <div className="absolute inset-0 z-20 border-2 border-dashed border-primary bg-primary/5 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <Upload size={32} className="mx-auto mb-3 text-primary" />
            <p className="font-display font-bold text-lg">
              Drop image to upload
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-2">
              JPEG, PNG, WebP, GIF · max 10 MB
            </p>
          </div>
        </div>
      )}

      {children}

      <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
        <button
          type="button"
          onClick={open}
          className="inline-flex items-center gap-2 border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] hover:border-primary transition-colors"
        >
          <ImageIcon size={14} />
          Upload image
        </button>
        <p className="font-mono text-[10px] text-muted-foreground">
          Or drag &amp; drop into the editor (max 10 MB)
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-3 border border-border bg-card px-4 py-2 font-mono text-xs"
            >
              <span
                className={
                  f.progress === "done"
                    ? "text-primary"
                    : f.progress === "error"
                      ? "text-destructive"
                      : "text-muted-foreground"
                }
              >
                {f.progress === "done"
                  ? "✓"
                  : f.progress === "error"
                    ? "✗"
                    : "↑"}
              </span>
              <span className="truncate flex-1">{f.name}</span>
              <span className="text-muted-foreground text-[10px] uppercase tracking-[0.18em]">
                {f.progress === "uploading"
                  ? "Uploading…"
                  : f.progress === "done"
                    ? "Inserted"
                    : f.error || "Failed"}
              </span>
              {f.progress !== "uploading" && (
                <button
                  type="button"
                  onClick={() =>
                    setFiles((prev) => prev.filter((x) => x.id !== f.id))
                  }
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
