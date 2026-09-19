import * as React from "react";
import { FieldLabel } from "./field-label";
import { FieldHint } from "./field-hint";
import { cn } from "@/lib/utils";

export interface WebsiteInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  required?: boolean;
  optional?: boolean;
  labelInfo?: string;
  hint?: string;
  error?: boolean;
  id?: string;
  /** Defaults to "https://" per the Figma spec. */
  prefix?: string;
}

/**
 * Tushe "Prime Text Input" — Website type
 * Figma: node 4702:5488
 */
const WebsiteInput = React.forwardRef<HTMLInputElement, WebsiteInputProps>(
  (
    {
      label,
      required,
      optional,
      labelInfo,
      hint,
      error,
      id,
      prefix = "https://",
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? React.useId();

    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <FieldLabel
            htmlFor={inputId}
            label={label}
            required={required}
            optional={optional}
            labelInfo={labelInfo}
          />
        )}

        <div
          className={cn(
            "flex h-10 w-full items-stretch overflow-hidden rounded-lg transition-shadow duration-150",
            error ? "bg-negative-faint" : "bg-input-subtle",
            disabled && "bg-input-faint-disabled",
            error
              ? "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-negative has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-white"
              : "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-white",
            className,
          )}
        >
          <span className="flex shrink-0 items-center px-3 text-xs font-normal  tracking-tight text-surface-muted">
            {prefix}
          </span>
          <input
            ref={ref}
            id={inputId}
            type="text"
            disabled={disabled}
            className={cn(
              "min-w-0 flex-1 border-l bg-transparent py-2.5 pl-3 pr-2.5 text-sm font-medium  tracking-tight text-surface-bold outline-none",
              "border-input-faint",
              "placeholder:text-surface-faint placeholder:font-medium",
              "disabled:cursor-not-allowed disabled:text-surface-faint-disabled",
            )}
            aria-invalid={error || undefined}
            {...props}
          />
        </div>

        <FieldHint hint={hint} error={error} disabled={disabled} />
      </div>
    );
  },
);
WebsiteInput.displayName = "WebsiteInput";

export { WebsiteInput };
