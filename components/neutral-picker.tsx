"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DimensionTrigger } from "./dimension-trigger";

// Gradient pairs pulled directly from the actual Figma frame, not
// computed or guessed, so the preview matches what was actually designed
// rather than an approximation of a "light to dark" range.
const NEUTRAL_PRESETS: { name: string; from: string; to: string }[] = [
  { name: "Mauve", from: "#594c5b", to: "#bda1c1" },
  { name: "Taupe", from: "#5b4f4b", to: "#c1a89f" },
  { name: "Slate", from: "#475569", to: "#8ca8cf" },
  { name: "Neutral", from: "#525252", to: "#b8b8b8" },
  { name: "Cream", from: "#525252", to: "#D2CAA2" },
];

function GradientDot({ from, to }: { from: string; to: string }) {
  return (
    <span
      className="size-4.5 shrink-0 rounded-full border border-white"
      style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }}
    />
  );
}

export function NeutralPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = NEUTRAL_PRESETS.find((p) => p.name === value) ?? NEUTRAL_PRESETS[3];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <DimensionTrigger
            label="Neutral"
            value={value}
            swatch={<GradientDot from={current.from} to={current.to} />}
          />
        }
      />
      <PopoverContent className="w-[169px] p-[6px]">
        <div className="flex flex-col">
          {NEUTRAL_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                onChange(p.name);
                setOpen(false);
              }}
              className="flex h-7 items-center gap-1.5 rounded-lg px-1.5 hover:bg-surface-flat-hover cursor-pointer"
            >
              <GradientDot from={p.from} to={p.to} />
              <span className="text-surface-subtle text-sm font-medium">{p.name}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
