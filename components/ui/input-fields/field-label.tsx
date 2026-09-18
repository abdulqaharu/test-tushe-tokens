import * as React from "react";
import { Info } from "@phosphor-icons/react";

export interface FieldLabelProps {
  htmlFor: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  labelInfo?: string;
}

export function FieldLabel({ htmlFor, label, required, optional, labelInfo }: FieldLabelProps) {
  return (
    <div className="flex items-center gap-px">
      <label htmlFor={htmlFor} className="text-sm font-medium leading-4 tracking-tight text-surface-subtle">
        {label}
      </label>
      {required && <span className="text-xs leading-3 text-negative-bold">*</span>}
      {optional && <span className="text-xs leading-3 text-surface-muted">(Optional)</span>}
      {labelInfo && (
        <span title={labelInfo} className="ml-0.5">
          <Info className="size-4 icon-surface-faint" />
        </span>
      )}
    </div>
  );
}
