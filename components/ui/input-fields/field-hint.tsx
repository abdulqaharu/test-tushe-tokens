import * as React from "react";
import { InfoIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface FieldHintProps {
  hint?: string;
  error?: boolean;
  disabled?: boolean;
}

export function FieldHint({ hint, error, disabled }: FieldHintProps) {
  if (!hint) return null;
  return (
    <div
      className={cn(
        "flex items-center gap-1",
        error ? "text-negative-subtle" : "text-surface-muted",
        disabled && "text-surface-faint-disabled",
      )}
    >
      <InfoIcon className="size-4 shrink-0" />
      <p className="text-xs font-normal  tracking-tight">{hint}</p>
    </div>
  );
}
