"use client";

import { useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Full-width form-field style, not the compact toolbar pill DimensionTrigger
// uses. The Figma frame's State field has no leading icon and spans the
// full width of its container, a genuinely different layout, not a
// same-component reuse.

export function SelectField({
  label,
  placeholder,
  options,
  value,
  onChange,
  container,
}: {
  label: string;
  placeholder: string;
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
  container?: HTMLDivElement | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-1.5">
      <span className="text-surface-subtle text-sm font-medium">{label}</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <button className="bg-input-subtle flex h-9 w-full items-center gap-2 rounded-lg py-2 pl-2.5 pr-2">
              <span
                className={
                  value
                    ? "text-surface-bold flex-1 text-left text-sm font-medium"
                    : "text-surface-faint flex-1 text-left text-sm font-medium"
                }
              >
                {value ?? placeholder}
              </span>
              <CaretDownIcon className="text-surface-muted size-4 shrink-0" />
            </button>
          }
        />
        <PopoverContent container={container} className="w-64 p-1.5">
          <div className="flex flex-col">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="hover:bg-surface-flat-hover flex h-8 items-center rounded-md px-2 text-left"
              >
                <span className="text-surface-bold text-sm">{opt}</span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
