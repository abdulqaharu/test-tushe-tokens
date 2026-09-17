"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

// Confirmed directly from Base UI's own type definitions (via a
// TypeScript error, not a guess): onValueChange is
// (value: number | readonly number[], eventDetails: SliderRootChangeEventDetails) => void.
// So both shapes really are possible, exactly what the earlier defensive
// handling assumed, this just needed the type annotation widened to
// readonly number[] to match. The eventDetails second parameter can be
// safely omitted here, TypeScript allows a callback with fewer parameters
// than the type it's satisfying.
export function PriceSlider() {
  const [value, setValue] = useState(250);

  return (
    <div className="flex w-64 flex-col gap-1 px-1">
      <div className="flex items-center justify-between">
        <span className="text-surface-subtle text-sm font-medium">Price</span>
        <span className="text-surface-bold text-sm font-medium">${value.toFixed(2)}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(next: number | readonly number[]) => {
          setValue(Array.isArray(next) ? next[0] : next);
        }}
        min={0}
        max={500}
      />
    </div>
  );
}