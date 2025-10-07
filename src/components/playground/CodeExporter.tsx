"use client";

import { useEffect } from "react";
import type { CopyStatus } from "@/hooks/useCodeGenerator";

interface CodeExporterProps {
  open: boolean;
  code: string;
  copyStatus: CopyStatus;
  onCopy: () => void;
  onClose: () => void;
}

export const CodeExporter = ({
  open,
  code,
  copyStatus,
  onCopy,
  onClose,
}: CodeExporterProps) => {
  useEffect(() => {
    if (open) {
      const { style } = document.body;
      const prevOverflow = style.overflow;
      style.overflow = "hidden";

      return () => {
        style.overflow = prevOverflow;
      };
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-12 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-labelledby="code-exporter-title"
    >
      <div className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <div>
            <p
              id="code-exporter-title"
              className="text-sm font-semibold text-neutral-800"
            >
              Generated snippet
            </p>
            <p className="text-xs text-neutral-500">
              Copy this React component into your app.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onCopy}
              className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-900"
            >
              {copyStatus === "copied"
                ? "Copied ✓"
                : copyStatus === "error"
                  ? "Copy failed"
                  : "Copy code"}
            </button>
            <button
              onClick={onClose}
              className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-900"
              aria-label="Close export dialog"
            >
              Close
            </button>
          </div>
        </header>

        <div className="relative max-h-[60vh] overflow-auto bg-neutral-950">
          <pre className="min-h-[280px] whitespace-pre text-xs leading-relaxed text-neutral-50">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
