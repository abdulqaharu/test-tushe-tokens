"use client";

import { DotsSixVerticalIcon } from "@phosphor-icons/react";
import { Checkbox } from "@/components/ui/checkbox";
import type { SortableListeners } from "./sortable-item";

// Drag activation is scoped to the handle icon specifically (via
// handleAttributes/handleListeners/handleRef), not the whole row, matching
// the dedicated drag-handle affordance shown in the Figma design. These
// props are optional so this component still works as a plain static row
// with no drag behavior at all, if it's ever reused somewhere that isn't
// wrapped in a SortableItem.

export function ReorderableListItem({
  title,
  description,
  checked,
  onCheckedChange,
  handleAttributes,
  handleListeners,
  handleRef,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  handleAttributes?: React.HTMLAttributes<HTMLElement>;
  handleListeners?: SortableListeners;
  handleRef?: (element: HTMLElement | null) => void;
}) {
  return (
    <div className="bg-input-flat flex w-full items-center gap-5 p-4">
      <button
        ref={handleRef}
        {...handleAttributes}
        {...handleListeners}
        aria-label="Drag to reorder"
        className="cursor-grab touch-none active:cursor-grabbing"
      >
        <DotsSixVerticalIcon className="text-surface-muted size-[18px] shrink-0" />
      </button>
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <div className="flex flex-1 flex-col gap-2.5">
        <p className="text-surface-bold text-sm font-medium">{title}</p>
        <p className="text-surface-subtle text-sm">{description}</p>
      </div>
    </div>
  );
}
