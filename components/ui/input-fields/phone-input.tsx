import * as React from "react";
import { CaretDown } from "@phosphor-icons/react";
import { FieldLabel } from "./field-label";
import { FieldHint } from "./field-hint";
import { cn } from "@/lib/utils";

export interface Country {
  code: string; // ISO 2-letter, e.g. "US"
  dialCode: string; // e.g. "+1"
  flagUrl: string; // path/URL to flag asset
}

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  required?: boolean;
  optional?: boolean;
  labelInfo?: string;
  hint?: string;
  error?: boolean;
  id?: string;
  country: Country;
  /** Called when the user opens the country picker. Wire up your own dropdown/sheet. */
  onCountryPickerOpen?: () => void;
}

/**
 * Tushe "Prime Text Input" — Phone type
 * Figma: node 4702:5147
 *
 * Country selection UI (flag + dial code + caret) is presented but not
 * wired to a picker — pass `onCountryPickerOpen` to open your own
 * country-select dropdown/sheet, and update `country` from the parent.
 */
const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      required,
      optional,
      labelInfo,
      hint,
      error,
      id,
      country,
      onCountryPickerOpen,
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
            "flex h-10 w-full items-stretch overflow-hidden rounded-lg",
            error ? "bg-negative-faint" : "bg-input-subtle",
            disabled && "bg-input-faint-disabled",
            className
          )}
        >
          <button
            type="button"
            onClick={onCountryPickerOpen}
            disabled={disabled}
            className="flex shrink-0 items-center gap-2 py-2.5 pl-3 pr-2 disabled:cursor-not-allowed"
          >
            <img src={country.flagUrl} alt={country.code} className="size-5 rounded-full object-cover" />
            <span className="flex items-center gap-0.5">
              <span className="text-xs font-normal leading-4 tracking-tight text-surface-bold">
                {country.dialCode}
              </span>
              <CaretDown className="size-3.5 icon-surface-subtle" />
            </span>
          </button>

          <input
            ref={ref}
            id={inputId}
            type="tel"
            disabled={disabled}
            className={cn(
              "min-w-0 flex-1 border-l bg-transparent py-2.5 pl-3 pr-2.5 text-sm font-medium leading-5 tracking-tight text-surface-bold outline-none",
              "border-input-faint",
              "placeholder:text-surface-faint placeholder:font-medium",
              "disabled:cursor-not-allowed disabled:text-surface-faint-disabled"
            )}
            aria-invalid={error || undefined}
            {...props}
          />
        </div>

        <FieldHint hint={hint} error={error} disabled={disabled} />
      </div>
    );
  }
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
