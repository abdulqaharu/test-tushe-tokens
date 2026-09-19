import * as React from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { FieldLabel } from "@/components/ui/input-fields/field-label";
import { FieldHint } from "@/components/ui/input-fields/field-hint";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface Currency {
  code: string; // e.g. "EUR"
  symbol: string; // e.g. "€"
  flagUrl: string;
}

/** Strips everything but digits and a single decimal point (max 2 decimal
 * places), then re-inserts thousands separators into the integer part. */
function formatAmount(raw: string): string {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const firstDot = cleaned.indexOf(".");
  const intPart =
    firstDot === -1 ? cleaned : cleaned.slice(0, firstDot);
  const decPart =
    firstDot === -1 ? "" : cleaned.slice(firstDot + 1).replace(/\./g, "").slice(0, 2);
  const groupedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return firstDot === -1 ? groupedInt : `${groupedInt}.${decPart}`;
}

export interface AmountInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "defaultValue"> {
  label?: string;
  required?: boolean;
  optional?: boolean;
  labelInfo?: string;
  hint?: string;
  error?: boolean;
  id?: string;
  currency: Currency;
  /** Full list the currency popover picks from. */
  currencies: Currency[];
  onCurrencyChange?: (currency: Currency) => void;
  /** Set false to hide the currency-picker suffix. */
  showCurrencyPicker?: boolean;
  /** Scopes the currency popover inside a themed container instead of document.body. */
  container?: React.ComponentProps<typeof PopoverContent>["container"];
  value?: string;
  defaultValue?: string;
}

/**
 * Tushe "Prime Text Input" — Amount type
 * Figma: node 4702:5686
 *
 * Note: unlike every other type, Amount uses a white/bordered surface
 * rather than the filled bg-input-subtle background — that's the
 * design as specced, not an inconsistency.
 *
 * Only digits and a single decimal point can ever land in the field —
 * everything else is stripped as it's typed, and the integer part is
 * grouped with thousands separators live.
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
      currencies,
      onCurrencyChange,
      showCurrencyPicker = true,
      container,
      className,
      disabled,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? React.useId();
    const [pickerOpen, setPickerOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(() =>
      formatAmount(defaultValue ?? ""),
    );
    const currentValue = value !== undefined ? formatAmount(value) : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatAmount(e.target.value);
      e.target.value = formatted;
      if (value === undefined) setInternalValue(formatted);
      onChange?.(e);
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
          <div
            className={cn(
              "flex min-w-0 flex-1 items-center gap-2 py-2.5 pl-3 pr-2.5",
              showCurrencyPicker && "border-r border-input-faint",
            )}
          >
            <span className="shrink-0 text-xs font-normal tracking-tight text-surface-faint">
              {currency.symbol}
            </span>
            <input
              ref={ref}
              id={inputId}
              type="text"
              inputMode="decimal"
              disabled={disabled}
              value={currentValue}
              onChange={handleChange}
              className={cn(
                "min-w-0 flex-1 bg-transparent text-sm font-medium tracking-tight text-surface-bold outline-none",
                "placeholder:text-surface-faint placeholder:font-medium",
                "disabled:cursor-not-allowed disabled:text-surface-faint-disabled",
              )}
              aria-invalid={error || undefined}
              {...props}
            />
          </div>

          {showCurrencyPicker && (
            <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    disabled={disabled}
                    className="flex shrink-0 items-center gap-2 py-2.5 pl-3 pr-2 disabled:cursor-not-allowed"
                  >
                    <img
                      src={currency.flagUrl}
                      alt={currency.code}
                      className="size-5 rounded-full object-cover"
                    />
                    <span className="flex items-center gap-0.5">
                      <span className="text-xs font-normal tracking-tight text-surface-bold">
                        {currency.code}
                      </span>
                      <CaretDownIcon className="size-3.5 icon-surface-subtle" />
                    </span>
                  </button>
                }
              />
              <PopoverContent container={container} className="w-56 p-1.5">
                <div className="flex flex-col">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        onCurrencyChange?.(c);
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
                        {c.symbol}
                      </span>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <FieldHint hint={hint} error={error} disabled={disabled} />
      </div>
    );
  },
);
AmountInput.displayName = "AmountInput";

export { AmountInput };
