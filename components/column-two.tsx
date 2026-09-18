"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CheckCircleIcon } from "@phosphor-icons/react";
import { IntegrationCard } from "./integration-card";
import { ReorderableListItem } from "./reorderable-list-item";
import { SortableItem } from "./sortable-item";

// The "Request sent" card is rendered as a static, always-visible example
// in the Figma frame, not triggered by any action in this column, so it's
// built as a plain card here too, not wired to Base UI's Dialog primitive.
// There's nothing in this column that opens it, wiring it as a real modal
// would mean inventing a trigger that doesn't exist in the source design.

type ListRow = {
  id: string;
  title: string;
  description: string;
  checked: boolean;
};

const INITIAL_ROWS: ListRow[] = [
  {
    id: "kyc",
    title: "KYC & Verification Tiers",
    description: "Identity verification that maps to CBN KYC tiers",
    checked: false,
  },
  {
    id: "account",
    title: "Account",
    description: "Multi-currency accounts with double-entry ledger support.",
    checked: true,
  },
];

export function ColumnTwo() {
  const [rows, setRows] = useState(INITIAL_ROWS);

  // PointerSensor for mouse/touch, KeyboardSensor so this is genuinely
  // operable without a mouse too, same accessibility bar as the rest of
  // this build (Checkbox/Switch/Radio all got real semantics, this
  // shouldn't be the one interactive piece that only works by dragging).
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setRows((current: ListRow[]) => {
      const oldIndex = current.findIndex((r: ListRow) => r.id === active.id);
      const newIndex = current.findIndex((r: ListRow) => r.id === over.id);
      return arrayMove(current, oldIndex, newIndex);
    });
  }

  function toggleRow(id: string, checked: boolean) {
    setRows((current: ListRow[]) =>
      current.map((r: ListRow) => (r.id === id ? { ...r, checked } : r)),
    );
  }

  return (
    <div className="flex w-[360px] flex-col items-center gap-10">
      {/* Three buttons, matching the exact three treatments from the frame */}
      <div className="grid grid-cols-3 gap-3">
        <button className="bg-brand-bold text-brand-inverse flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium">
          Button
        </button>
        <button className="bg-negative-faint text-negative-subtle flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium">
          Button
        </button>
        <button className="bg-surface-inverse text-surface-inverse flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium">
          Button
        </button>
      </div>

      <IntegrationCard />

      <div className=" flex w-full flex-col overflow-hidden rounded-xl">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={rows.map((r: ListRow) => r.id)}
            strategy={verticalListSortingStrategy}
          >
            {rows.map((row: ListRow, index: number) => (
              <div key={row.id}>
                <SortableItem id={row.id}>
                  {({ attributes, listeners, setActivatorNodeRef }) => (
                    <ReorderableListItem
                      title={row.title}
                      description={row.description}
                      checked={row.checked}
                      onCheckedChange={(checked) => toggleRow(row.id, checked)}
                      handleAttributes={attributes}
                      handleListeners={listeners}
                      handleRef={setActivatorNodeRef}
                    />
                  )}
                </SortableItem>
                {index < rows.length - 1 && (
                  <div className="bg-surface-faint h-px w-full" />
                )}
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <div className="bg-surface-subtle border-input-faint flex w-full flex-col rounded-xl border">
        <div className="flex flex-col gap-7 p-4 pt-5">
          <CheckCircleIcon
            weight="fill"
            className="text-success-subtle size-10"
          />
          <div className="flex flex-col gap-4">
            <p className="text-surface-bold text-sm font-semibold">
              Request sent
            </p>
            <p className="text-surface-subtle text-sm">
              We'll follow up within 1 business day to activate Loan and confirm
              pricing. You can track this request on your Billing page.
            </p>
          </div>
        </div>
        <div className="flex justify-end p-4 pt-0">
          <button className="bg-surface-inverse text-surface-inverse flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
