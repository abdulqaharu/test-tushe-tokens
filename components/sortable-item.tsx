"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// The listeners type is derived directly from useSortable's own return
// type rather than importing SyntheticListenerMap by a guessed path.
// dnd-kit's exact internal export location for that type isn't something
// worth assuming, this way is guaranteed correct since it's mechanically
// tied to the hook itself, not a separate assumption that could drift.
export type SortableListeners = ReturnType<typeof useSortable>["listeners"];

// Generic wrapper, not specific to the KYC/Account rows, anything needing
// drag-to-reorder can use this. Deliberately exposes attributes/listeners
// via render props rather than attaching them to the whole row itself,
// since the actual Figma design has a dedicated drag-handle icon, dragging
// should only activate from that handle, not by grabbing anywhere on the
// row.

export function SortableItem({
  id,
  children,
}: {
  id: string;
  children: (props: {
    attributes: React.HTMLAttributes<HTMLElement>;
    listeners: SortableListeners;
    setActivatorNodeRef: (element: HTMLElement | null) => void;
  }) => React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ attributes, listeners, setActivatorNodeRef })}
    </div>
  );
}