"use client";

// Shared active-pill pattern from the Figma header: a subtle rounded
// container holding 2+ segments, the active one gets a white background
// and a soft drop-shadow, the inactive ones stay flat and transparent.
// Powers both the Components/Dashboard tabs (text segments) and the
// sun/moon theme toggle (icon-only, square segments), same visual
// mechanism either way.

export function SegmentedToggle({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-input-subtle flex justify-start items-start gap-1 rounded-2xl p-0.5">
      {children}
    </div>
  );
}

export function Segment({
  active,
  square,
  onClick,
  children,
}: {
  active: boolean;
  square?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? `bg-static-white shadow-sm flex h-9 items-center justify-center rounded-xl px-2.5 ${square ? "w-9" : ""}`
          : `flex h-9 items-center justify-center rounded-xl px-2.5 ${square ? "w-9" : ""}`
      }
    >
      {children}
    </button>
  );
}