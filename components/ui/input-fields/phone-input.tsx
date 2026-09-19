import * as React from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { FieldLabel } from "./field-label";
import { FieldHint } from "./field-hint";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface Country {
  code: string; // ISO 2-letter, e.g. "US"
  dialCode: string; // e.g. "+1"
  flagUrl: string; // path/URL to flag asset
}

// Expected national-number digit length per country, [min, max]. Not
// exhaustive — real validation would come from a phone-number library
// (e.g. libphonenumber), this is a lightweight stand-in so the demo can
// genuinely reject the wrong number of digits per country instead of
// accepting anything. Unlisted countries fall back to the general
// E.164 national-number bounds (7–15 digits).
const MOBILE_LENGTH: Record<string, [number, number]> = {
  US: [10, 10],
  NG: [10, 10],
  GB: [10, 10],
  KE: [9, 9],
  GH: [9, 9],
};

function isValidMobile(digits: string, countryCode: string) {
  const [min, max] = MOBILE_LENGTH[countryCode] ?? [7, 15];
  return digits.length >= min && digits.length <= max;
}

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "defaultValue"> {
  label?: string;
  required?: boolean;
  optional?: boolean;
  labelInfo?: string;
  hint?: string;
  error?: boolean;
  id?: string;
  country: Country;
  /** Full list the country popover picks from. */
  countries: Country[];
  onCountryChange?: (country: Country) => void;
  /** Scopes the country popover inside a themed container instead of document.body. */
  container?: React.ComponentProps<typeof PopoverContent>["container"];
  value?: string;
  defaultValue?: string;
}

/**
 * Tushe "Prime Text Input" — Phone type
 * Figma: node 4702:5147
 *
 * Country is picked from a real popover (flag + dial code list). The
 * number field itself only accepts digits and is validated against the
 * selected country's expected mobile-number length on blur.
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
      countries,
      onCountryChange,
      container,
      className,
      disabled,
      value,
      defaultValue,
      onChange,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? React.useId();
    const [pickerOpen, setPickerOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? "",
    );
    const currentValue = value !== undefined ? value : internalValue;
    const [invalid, setInvalid] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const digits = e.target.value.replace(/\D/g, "");
      e.target.value = digits;
      if (value === undefined) setInternalValue(digits);
      if (invalid) setInvalid(false);
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setInvalid(
        e.target.value.length > 0 && !isValidMobile(e.target.value, country.code),
      );
      onBlur?.(e);
    };

    const showError = error || invalid;

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
            showError ? "bg-negative-faint" : "bg-input-subtle",
            disabled && "bg-input-faint-disabled",
            showError
              ? "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-negative has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-white"
              : "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-white",
            className,
          )}
        >
          <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
            <PopoverTrigger
              render={
                <button
                  type="button"
                  disabled={disabled}
                  className="flex shrink-0 items-center gap-2 py-2.5 pl-3 pr-2 disabled:cursor-not-allowed"
                >
                  <img
                    src={country.flagUrl}
                    alt={country.code}
                    className="size-5 rounded-full object-cover"
                  />
                  <span className="flex items-center gap-0.5">
                    <span className="text-xs font-normal tracking-tight text-surface-bold">
                      {country.dialCode}
                    </span>
                    <CaretDownIcon className="size-3.5 icon-surface-subtle" />
                  </span>
                </button>
              }
            />
            <PopoverContent container={container} className="w-56 p-1.5">
              <div className="flex max-h-64 flex-col overflow-y-auto">
                {countries.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      onCountryChange?.(c);
                      setPickerOpen(false);
                    }}
                    className="hover:bg-surface-flat-hover flex h-9 items-center gap-2 rounded-md px-2 text-left"
                  >
                    <img
                      src={c.flagUrl}
                      alt={c.code}
                      className="size-5 shrink-0 rounded-full object-cover"
                    />
                    <span className="text-surface-bold text-sm font-medium">
                      {c.code}
                    </span>
                    <span className="text-surface-muted text-sm">
                      {c.dialCode}
                    </span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <input
            ref={ref}
            id={inputId}
            type="tel"
            inputMode="numeric"
            disabled={disabled}
            value={currentValue}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              "min-w-0 flex-1 border-l bg-transparent py-2.5 pl-3 pr-2.5 text-sm font-medium tracking-tight text-surface-bold outline-none",
              "border-input-faint",
              "placeholder:text-surface-faint placeholder:font-medium",
              "disabled:cursor-not-allowed disabled:text-surface-faint-disabled",
            )}
            aria-invalid={showError || undefined}
            {...props}
          />
        </div>

        <FieldHint
          hint={invalid && !hint ? "Enter a valid mobile number for this country." : hint}
          error={showError}
          disabled={disabled}
        />
      </div>
    );
  },
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
