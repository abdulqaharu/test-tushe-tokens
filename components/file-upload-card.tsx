"use client";

import { useRef, useState } from "react";
import { IdentificationCardIcon, CloudArrowUpIcon, FileIcon } from "@phosphor-icons/react";

// The radio indicator at top is a static visual here, not a real
// RadioGroup, there's only one card in this frame with nothing else to
// select between, so there's no real group for it to belong to. The
// dropzone below it is genuinely functional though: a real native file
// input, triggered by the button, plus actual drag-and-drop handling, not
// just decorative.

export function FileUploadCard() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (files && files.length > 0) {
      setFileName(files[0].name);
    }
  }

  return (
    <div className="bg-brand-subtle-selected border-brand-bold flex w-full flex-col gap-0.5 rounded-xl border p-1">
      <div className="relative flex items-center gap-2 rounded-xl px-3 py-2.5">
        <IdentificationCardIcon className="text-surface-bold size-7" />
        <p className="text-surface-bold flex-1 text-sm font-medium">National Identification Number</p>
        <span className="relative size-5 shrink-0 overflow-clip">
          <span className="bg-brand-bold absolute inset-[10%] rounded-full" />
          <span className="bg-surface-flat absolute inset-[30%] rounded-full" />
        </span>
      </div>

      <div
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={(e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setIsDraggingOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={
          isDraggingOver
            ? "bg-brand-subtle shadow flex w-full flex-col items-center gap-5 rounded-xl px-4 py-8"
            : "bg-surface-flat shadow flex w-full flex-col items-center gap-5 rounded-xl px-4 py-8"
        }
      >
        {fileName ? (
          <FileIcon weight="fill" className="text-brand-bold size-10" />
        ) : (
          <div className="relative h-10 w-8">
            <div className="border-surface-subtle absolute left-0 top-1 h-8 w-6 -rotate-15 rounded border bg-surface-subtle shadow-sm" />
            <div className="border-surface-subtle bg-surface-flat absolute left-0 top-0 h-10 w-[31px] rounded border shadow" />
          </div>
        )}

        <div className="flex flex-col items-center gap-2.5 text-center">
          <p className="text-surface-bold text-sm font-medium">
            {fileName ?? "Choose a file or drag & drop it here."}
          </p>
          <p className="text-surface-muted text-xs">
            {fileName ? "Ready to upload." : "JPEG, PNG, and PDF formats, up to 1 MB."}
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)}
        />
        <button
          onClick={() => inputRef.current?.click()}
          className="bg-surface-subtle text-surface-bold flex h-8 items-center gap-1 rounded-lg px-3 text-sm font-medium"
        >
          <CloudArrowUpIcon className="size-3.5" />
          Choose file
        </button>
      </div>
    </div>
  );
}