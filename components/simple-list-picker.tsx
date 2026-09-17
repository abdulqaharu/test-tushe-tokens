"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DimensionTrigger } from "./dimension-trigger";

// Font and Radius are structurally identical in the Figma reference: a
// plain list of text options in the popover, no swatch per row (unlike
// Accent's color dots or Neutral's gradients). One component covers both
// rather than writing the same list twice.

export function SimpleListPicker({
  label,
  value,
  options,
  labels,
  triggerIcon,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  labels?: Record<string, string>;
  triggerIcon: React.ReactNode;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <DimensionTrigger label={label} value={labels?.[value] ?? value} swatch={triggerIcon} />
        }
      />
      <PopoverContent className="w-[169px] p-[6px]">
        <div className="flex flex-col">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="flex h-7 items-center rounded-lg px-1.5 text-left hover:bg-surface-flat-hover cursor-pointer"
            >
              <span className="text-surface-subtle text-sm capitalize font-medium">{labels?.[opt] ?? opt}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
