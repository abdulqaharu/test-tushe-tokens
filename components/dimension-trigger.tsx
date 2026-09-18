"use client";

import { forwardRef } from "react";
import { CaretUpDownIcon } from "@phosphor-icons/react";

// The shared closed-state control every dimension picker uses: a small
// swatch/icon on the left, the current value as text, a caret on the right.
// Matches the "Accent / Neutral / Font Family / Radius" buttons from the
// Figma footer exactly, one component instead of four near-duplicates.

export const DimensionTrigger = forwardRef<
  HTMLButtonElement,
  {
    label: string;
    value: string;
    swatch: React.ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(function DimensionTrigger({ label, value, swatch, ...buttonProps }, ref) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-surface-bold text-sm font-medium">{label}</span>
      <button
        ref={ref}
        {...buttonProps}
        className="bg-input-subtle flex h-9 w-40 items-center rounded-xl pl-3 pr-2"
      >
        <span className="flex h-4 w-6 items-center pr-1">{swatch}</span>
        <span className="text-surface-bold flex-1 truncate text-left text-sm font-medium capitalize">
          {value}
        </span>
        <CaretUpDownIcon className="text-surface-muted size-4 shrink-0" />
      </button>
    </div>
  );
});

// Solid dot swatch, used by Accent (a single brand color has no light/dark
// range worth showing) and as the fallback for anything else that just
// needs a flat color indicator.
export function SolidSwatch({ colorClassName }: { colorClassName: string }) {
  return (
    <span
      className={`size-4.5 rounded-full border border-white ${colorClassName}`}
    />
  );
}

// Gradient dot swatch, used by Neutral specifically, per the decision to
// keep the gradient preview consistent between the closed trigger and the
// open picker rather than simplifying the trigger to a flat dot.
export function GradientSwatch({
  fromHex,
  toHex,
}: {
  fromHex: string;
  toHex: string;
}) {
  return (
    <span
      className="size-4.5 rounded-full border border-white"
      style={{ background: `linear-gradient(to bottom, ${fromHex}, ${toHex})` }}
    />
  );
}
