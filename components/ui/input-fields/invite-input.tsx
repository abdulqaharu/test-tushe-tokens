import * as React from "react";
import {
  UserCircleIcon,
  LightningIcon,
  CaretDownIcon,
} from "@phosphor-icons/react";
import { FieldLabel } from "./field-label";
import { FieldHint } from "./field-hint";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  /** Full list the permission popover picks from. */
  permissions: readonly string[];
  onPermissionChange?: (permission: string) => void;
  /** Scopes the permission popover inside a themed container instead of document.body. */
  container?: React.ComponentProps<typeof PopoverContent>["container"];
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
      permissions,
      onPermissionChange,
      container,
      leftIcon,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? React.useId();
    const [pickerOpen, setPickerOpen] = React.useState(false);

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
            "flex h-10 w-full items-center gap-2 rounded-lg pl-3 pr-2.5 transition-shadow duration-150",
            error ? "bg-negative-faint" : "bg-input-subtle",
            disabled && "bg-input-faint-disabled",
            error
              ? "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-negative has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-white"
              : "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-white",
            className,
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
              "min-w-0 flex-1 bg-transparent py-2.5 text-sm font-medium tracking-tight text-surface-bold outline-none",
              "placeholder:text-surface-faint placeholder:font-medium",
              "disabled:cursor-not-allowed disabled:text-surface-faint-disabled",
            )}
            aria-invalid={error || undefined}
            {...props}
          />
          <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
            <PopoverTrigger
              render={
                <button
                  type="button"
                  disabled={disabled}
                  className="flex shrink-0 items-center gap-1 disabled:cursor-not-allowed"
                >
                  <LightningIcon className="size-5 icon-surface-faint" />
                  <span className="text-sm font-normal tracking-tight text-surface-subtle">
                    {permission}
                  </span>
                  <CaretDownIcon className="size-5 icon-surface-faint" />
                </button>
              }
            />
            <PopoverContent container={container} className="w-40 p-1.5">
              <div className="flex flex-col">
                {permissions.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      onPermissionChange?.(p);
                      setPickerOpen(false);
                    }}
                    className="hover:bg-surface-flat-hover flex h-8 items-center rounded-md px-2 text-left"
                  >
                    <span className="text-surface-bold text-sm">{p}</span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <FieldHint hint={hint} error={error} disabled={disabled} />
      </div>
    );
  },
);
InviteInput.displayName = "InviteInput";

export { InviteInput };
