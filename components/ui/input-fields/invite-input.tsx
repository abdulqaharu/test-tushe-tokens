import * as React from "react";
import { UserCircleIcon, LightningIcon, CaretDownIcon } from "@phosphor-icons/react";
import { FieldLabel } from "./field-label";
import { FieldHint } from "./field-hint";
import { cn } from "@/lib/utils";

export interface InviteInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  required?: boolean;
  optional?: boolean;
  labelInfo?: string;
  hint?: string;
  error?: boolean;
  id?: string;
  /** Current permission label, e.g. "can view". */
  permission: string;
  onPermissionPickerOpen?: () => void;
  leftIcon?: React.ReactNode;
}

/**
 * Tushe "Prime Text Input" — labeled "🔽 Dropdown" in Figma, but is
 * actually an invite field with an inline permission picker
 * (e.g. "can view ▾"), not a generic select.
 * Figma: node 4702:6622
 */
const InviteInput = React.forwardRef<HTMLInputElement, InviteInputProps>(
  (
    {
      label,
      required,
      optional,
      labelInfo,
      hint,
      error,
      id,
      permission,
      onPermissionPickerOpen,
      leftIcon,
      className,
      disabled,
      ...props
    },
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
            "flex h-10 w-full items-center gap-2 rounded-lg pl-3 pr-2.5",
            error ? "bg-negative-faint" : "bg-input-subtle",
            disabled && "bg-input-faint-disabled",
            className
          )}
        >
          <span className="flex size-5 shrink-0 items-center justify-center icon-surface-faint">
            {leftIcon ?? <UserCircleIcon weight="regular" />}
          </span>
          <input
            ref={ref}
            id={inputId}
            type="text"
            disabled={disabled}
            className={cn(
              "min-w-0 flex-1 bg-transparent py-2.5 text-sm font-medium leading-5 tracking-tight text-surface-bold outline-none",
              "placeholder:text-surface-faint placeholder:font-medium",
              "disabled:cursor-not-allowed disabled:text-surface-faint-disabled"
            )}
            aria-invalid={error || undefined}
            {...props}
          />
          <button
            type="button"
            onClick={onPermissionPickerOpen}
            disabled={disabled}
            className="flex shrink-0 items-center gap-1 disabled:cursor-not-allowed"
          >
            <LightningIcon className="size-5 icon-surface-faint" />
            <span className="text-sm font-normal leading-4 tracking-tight text-surface-subtle">{permission}</span>
            <CaretDownIcon className="size-5 icon-surface-faint" />
          </button>
        </div>

        <FieldHint hint={hint} error={error} disabled={disabled} />
      </div>
    );
  }
);
InviteInput.displayName = "InviteInput";

export { InviteInput };
