"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DimensionTrigger } from "./dimension-trigger";

const ACCENT_PRESETS = ["Purple", "Blue", "Teal", "Green", "tushe"];

export function AccentPicker({
  mode,
  preset,
  hex,
  onSelectPreset,
  onCustomHex,
}: {
  mode: "preset" | "custom";
  preset: string;
  hex: string;
  onSelectPreset: (name: string) => void;
  onCustomHex: (hex: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <DimensionTrigger
            label="Accent"
            value={mode === "preset" ? preset : hex}
            swatch={
              mode === "preset" ? (
                <span
                  className="size-[18px] rounded-full border border-white"
                  style={{
                    background: `var(--primitives-color-${preset.toLowerCase()}-500)`,
                  }}
                />
              ) : (
                <span
                  className="size-[18px] rounded-full border border-white"
                  style={{ background: hex }}
                />
              )
            }
          />
        }
      />
      <PopoverContent className="w-[181px] p-[10px]">
        <div className="flex items-center justify-between">
          {ACCENT_PRESETS.map((name) => (
            <button
              key={name}
              onClick={() => {
                onSelectPreset(name);
                setOpen(false);
              }}
              aria-label={name}
              className="size-[14px] rounded-full border border-white"
              style={{
                background: `var(--primitives-color-${name.toLowerCase()}-500)`,
              }}
            />
          ))}
        </div>

        <div className="mt-[10px]">
          <HexColorPicker
            color={hex}
            onChange={onCustomHex}
            style={{ width: "100%", height: 152 }}
          />
        </div>

        <div className="bg-input-subtle mt-[10px] flex h-7 items-center rounded-lg px-2">
          <span
            className="mr-1.5 size-[14px] shrink-0 rounded-full border border-white"
            style={{ background: hex }}
          />
          <span className="text-surface-faint text-xs">#</span>
          <input
            value={hex.replace("#", "")}
            onChange={(e) => onCustomHex(`#${e.target.value}`)}
            className="text-surface-bold ml-1 w-full bg-transparent text-xs font-medium outline-none"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
