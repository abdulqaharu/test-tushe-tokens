import * as React from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { FieldLabel } from "@/components/ui/input-fields/field-label";
import { FieldHint } from "@/components/ui/input-fields/field-hint";
import { cn } from "@/lib/utils";

export interface Currency {
  code: string; // e.g. "EUR"
  symbol: string; // e.g. "€"
  flagUrl: string;
}

export interface AmountInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  required?: boolean;
  optional?: boolean;
  labelInfo?: string;
  hint?: string;
  error?: boolean;
  id?: string;
  currency: Currency;
  /** Set false to hide the currency-picker suffix. */
  showCurrencyPicker?: boolean;
  onCurrencyPickerOpen?: () => void;
}

/**
 * Tushe "Prime Text Input" — Amount type
 * Figma: node 4702:5686
 *
 * Note: unlike every other type, Amount uses a white/bordered surface
 * rather than the filled bg-input-subtle background — that's the
 * design as specced, not an inconsistency.
 */
const AmountInput = React.forwardRef<HTMLInputElement, AmountInputProps>(
  (
    {
      label,
      required,
      optional,
      labelInfo,
      hint,
      error,
      id,
      currency,
      showCurrencyPicker = true,
      onCurrencyPickerOpen,
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
            "flex h-10 w-full items-stretch overflow-hidden rounded-lg border",
            "bg-surface-flat border-input-faint",
            error && "bg-negative-faint",
            disabled && "bg-input-faint-disabled",
            className
          )}
        >
          <div
            className={cn(
              "flex min-w-0 flex-1 items-center gap-2 py-2.5 pl-3 pr-2.5",
              showCurrencyPicker && "border-r border-input-faint"
            )}
          >
            <span className="shrink-0 text-xs font-normal leading-4 tracking-tight text-surface-faint">
              {currency.symbol}
            </span>
            <input
              ref={ref}
              id={inputId}
              type="text"
              inputMode="decimal"
              disabled={disabled}
              className={cn(
                "min-w-0 flex-1 bg-transparent text-sm font-medium leading-5 tracking-tight text-surface-bold outline-none",
                "placeholder:text-surface-faint placeholder:font-medium",
                "disabled:cursor-not-allowed disabled:text-surface-faint-disabled"
              )}
              aria-invalid={error || undefined}
              {...props}
            />
          </div>

          {showCurrencyPicker && (
            <button
              type="button"
              onClick={onCurrencyPickerOpen}
              disabled={disabled}
              className="flex shrink-0 items-center gap-2 py-2.5 pl-3 pr-2 disabled:cursor-not-allowed"
            >
              <img src={currency.flagUrl} alt={currency.code} className="size-5 rounded-full object-cover" />
              <span className="flex items-center gap-0.5">
                <span className="text-xs font-normal leading-4 tracking-tight text-surface-bold">
                  {currency.code}
                </span>
                <CaretDownIcon className="size-3.5 icon-surface-subtle" />
              </span>
            </button>
          )}
        </div>

        <FieldHint hint={hint} error={error} disabled={disabled} />
      </div>
    );
  }
);
AmountInput.displayName = "AmountInput";

export { AmountInput };
