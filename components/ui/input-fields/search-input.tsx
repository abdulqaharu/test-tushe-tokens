import * as React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { FieldLabel } from "./field-label";
import { FieldHint } from "./field-hint";
import { cn } from "@/lib/utils";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  required?: boolean;
  optional?: boolean;
  labelInfo?: string;
  hint?: string;
  error?: boolean;
  id?: string;
  /** e.g. "⌘1" — shown as a small badge on the right. Omit to hide. */
  shortcut?: string;
}

/**
 * Tushe "Prime Text Input" — Search type
 * Figma: node 4702:6046
 */
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    { label, required, optional, labelInfo, hint, error, id, shortcut, className, disabled, ...props },
    ref
  ) => {
    const inputId = id ?? React.useId();

    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <FieldLabel htmlFor={inputId} label={label} required={required} optional={optional} labelInfo={labelInfo} />
        )}

        <div
          className={cn(
            "flex h-10 w-full items-center gap-2 rounded-lg pl-3 pr-1",
            error ? "bg-negative-faint" : "bg-input-subtle",
            disabled && "bg-input-faint-disabled",
            className
          )}
        >
          <MagnifyingGlass className="size-5 shrink-0 icon-surface-faint" />
          <input
            ref={ref}
            id={inputId}
            type="search"
            disabled={disabled}
            className={cn(
              "min-w-0 flex-1 bg-transparent py-2.5 text-sm font-medium leading-5 tracking-tight text-surface-bold outline-none",
              "placeholder:text-surface-faint placeholder:font-medium",
              "disabled:cursor-not-allowed disabled:text-surface-faint-disabled"
            )}
            aria-invalid={error || undefined}
            {...props}
          />
          {shortcut && (
            <span className="flex h-8 shrink-0 items-center rounded border border-input-faint bg-surface-flat px-1.5 py-0.5 text-xs font-semibold leading-4 tracking-tighter text-surface-muted rounded-md">
              {shortcut}
            </span>
          )}
        </div>

        <FieldHint hint={hint} error={error} disabled={disabled} />
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
