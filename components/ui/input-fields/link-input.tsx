import * as React from "react";
import { LinkSimpleIcon, CopyIcon, CheckIcon } from "@phosphor-icons/react";
import { FieldLabel } from "./field-label";
import { FieldHint } from "./field-hint";
import { cn } from "@/lib/utils";

export interface LinkInputProps extends Omit<
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
  onCopyLink?: (value: string) => void;
}

/**
 * Tushe "Prime Text Input" — labeled "🔘 Button" in Figma, but is
 * actually a link field with a copy-to-clipboard action.
 * Figma: node 4702:6424
 */
const LinkInput = React.forwardRef<HTMLInputElement, LinkInputProps>(
  (
    {
      label,
      required,
      optional,
      labelInfo,
      hint,
      error,
      id,
      onCopyLink,
      className,
      disabled,
      value,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? React.useId();
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
      const text = String(value ?? "");
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        onCopyLink?.(text);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        // Clipboard API unavailable (non-secure context, etc.) — silently no-op.
      }
    };

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
            "flex h-10 w-full items-stretch overflow-hidden rounded-lg border transition-shadow duration-150",
            "bg-surface-flat border-input-faint",
            error && "bg-negative-faint",
            disabled && "bg-input-faint-disabled",
            error
              ? "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-negative has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-white"
              : "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-white",
            className,
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2 border-r border-input-faint py-2.5 pl-3 pr-2.5">
            <LinkSimpleIcon className="size-5 shrink-0 icon-surface-faint" />
            <input
              ref={ref}
              id={inputId}
              type="url"
              disabled={disabled}
              value={value}
              className={cn(
                "min-w-0 flex-1 bg-transparent text-sm font-medium  tracking-tight text-surface-bold outline-none",
                "placeholder:text-surface-faint placeholder:font-medium",
                "disabled:cursor-not-allowed disabled:text-surface-faint-disabled",
              )}
              aria-invalid={error || undefined}
              {...props}
            />
          </div>
          <button
            type="button"
            onClick={handleCopy}
            disabled={disabled}
            aria-label="Copy link"
            className="flex shrink-0 items-center justify-center p-2.5 disabled:cursor-not-allowed"
          >
            {copied ? (
              <CheckIcon className="size-5 icon-success-bold" />
            ) : (
              <CopyIcon className="size-5 icon-surface-faint" />
            )}
          </button>
        </div>

        <FieldHint hint={hint} error={error} disabled={disabled} />
      </div>
    );
  },
);
LinkInput.displayName = "LinkInput";

export { LinkInput };
