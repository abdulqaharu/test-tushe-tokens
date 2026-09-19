"use client";

import { useState } from "react";
import { WarningCircleIcon } from "@phosphor-icons/react";

// Rendered as a static card, not wired to Base UI's Dialog primitive, same
// reasoning as Column 2's "Request sent" card: nothing in this frame
// actually opens it, so treating it as a real triggered overlay would mean
// inventing a trigger the source design doesn't have. The textarea and
// buttons are still genuinely functional, only the "is this a modal"
// question is answered by what's actually in the frame.

const MAX_LENGTH = 200;

export function ConfirmDialogCard() {
  const [note, setNote] = useState("");

  return (
    <div className="bg-surface-subtle border-input-faint isolate flex w-full flex-col overflow-hidden rounded-xl border">
      <div className="flex flex-col gap-7 p-4 pt-5">
        <div className="flex items-center gap-1.5">
          <WarningCircleIcon
            weight="fill"
            className="icon-negative-subtle size-10"
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-surface-bold text-heading-sm">
            Suspend Abdulqahar Usman&rsquo;s account?
          </p>
          <p className="text-surface-muted text-body-base-normal">
            This will initiate a full refund to the customer via the original
            payment method. This cannot be undone.
          </p>
        </div>
        <div className="flex w-full flex-col gap-1.5">
          <span className="text-surface-subtle text-sm font-medium">
            Additional note
          </span>
          <div className="bg-input-faint relative flex h-40 w-full flex-col rounded-lg p-3">
            <textarea
              value={note}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNote(e.target.value.slice(0, MAX_LENGTH))
              }
              placeholder="Enter a description"
              className="text-surface-bold placeholder:text-surface-faint h-full w-full resize-none bg-transparent text-sm outline-none"
            />
            <span className="text-surface-faint absolute bottom-1.5 right-2.5 text-xs font-semibold">
              {note.length}/{MAX_LENGTH}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2.5 px-4 py-3">
        <button className="bg-surface-flat border-surface-subtle text-surface-bold flex h-9 items-center justify-center rounded-lg border px-3 text-sm font-medium">
          Cancel
        </button>
        <button className="bg-negative-subtle text-brand-inverse flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium">
          Suspend customer
        </button>
      </div>
    </div>
  );
}
