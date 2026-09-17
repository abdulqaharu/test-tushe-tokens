"use client";

import { RadioGroupItem } from "@/components/ui/radio-group";

// Now a <label> wrapping a real RadioGroupItem, not a styled button with a
// decorative RadioDot in the corner. The two cards genuinely function as a
// two-option exclusive choice, so this closes the same accessibility gap
// Checkbox/Switch had: clicking anywhere on the card now correctly toggles
// the underlying radio input, and it's announced as an actual radio to
// assistive tech, not a generic button. Must be rendered inside a
// <RadioGroup> in the parent, that's what actually manages the shared
// selected value across both cards.

export function SelectableCard({
  value,
  icon,
  title,
  description,
  selected,
}: {
  value: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
}) {
  return (
    <label
      className={
        selected
          ? "bg-brand-subtle-selected border-brand-bold relative flex w-[243px] cursor-pointer flex-col items-start gap-5 rounded-lg border p-4 text-left"
          : "bg-input-subtle border-input-faint relative flex w-[243px] cursor-pointer flex-col items-start gap-5 rounded-lg border border-Input-faint p-4 text-left"
      }
    >
      <span className="size-7">{icon}</span>
      <div className="flex flex-col gap-2.5">
        <p className="text-surface-bold text-sm font-medium">{title}</p>
        <p className="text-surface-subtle text-xs">{description}</p>
      </div>
      <RadioGroupItem value={value} className="absolute right-[9px] top-[9px]" />
    </label>
  );
}