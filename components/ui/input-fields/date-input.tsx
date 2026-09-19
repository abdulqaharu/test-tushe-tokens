import * as React from "react";
import { CalendarBlankIcon } from "@phosphor-icons/react";
import { FieldLabel } from "./field-label";
import { FieldHint } from "./field-hint";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function daysInMonth(month: number | null, year: number | null) {
  if (month == null) return 31;
  // Default to a leap year when the year isn't picked yet, so Feb 29
  // stays selectable rather than disappearing until a year is chosen.
  return new Date(year ?? 2024, month + 1, 0).getDate();
}

export interface DateValue {
  day: number | null;
  month: number | null;
  year: number | null;
}

function formatDateValue({ day, month, year }: DateValue): string {
  const monthName = month != null ? MONTHS[month] : null;
  if (monthName && day != null && year != null) return `${monthName} ${day}, ${year}`;
  if (monthName && year != null) return `${monthName} ${year}`;
  if (monthName && day != null) return `${monthName} ${day}`;
  if (monthName) return monthName;
  if (year != null) return String(year);
  if (day != null) return String(day);
  return "";
}

const selectClassName =
  "h-8 flex-1 rounded-md border border-input-faint bg-surface-flat px-2 text-sm font-medium text-surface-bold outline-none focus-visible:ring-2 focus-visible:ring-brand";

export interface DateInputProps {
  label?: string;
  required?: boolean;
  optional?: boolean;
  labelInfo?: string;
  hint?: string;
  error?: boolean;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  /** Uncontrolled initial value. */
  defaultValue?: Partial<DateValue>;
  /** Controlled value — omit to let the field manage its own state. */
  value?: Partial<DateValue>;
  onValueChange?: (value: DateValue) => void;
  /** How many years back from the current year the Year dropdown offers. */
  yearRange?: number;
  /** Scopes the popover inside a themed container instead of document.body. */
  container?: React.ComponentProps<typeof PopoverContent>["container"];
}

/**
 * Tushe "Prime Text Input" — Date type
 * Figma: node 4702:4840 (icon-swap variant), extended here with the
 * actual date-picking behavior since a free-text date field can't
 * genuinely guarantee "only accepts dates" on its own.
 *
 * The field itself is a button, not a text input — typing an arbitrary
 * string could never be validated as a real date with any confidence,
 * so it only ever accepts values chosen from the Day / Month / Year
 * dropdowns in the popover. Any subset can be picked (just a year, just
 * a month, day + month, all three, etc.) — nothing forces the other two.
 */
const DateInput = React.forwardRef<HTMLButtonElement, DateInputProps>(
  (
    {
      label,
      required,
      optional,
      labelInfo,
      hint,
      error,
      id,
      disabled,
      placeholder = "Select date",
      className,
      defaultValue,
      value,
      onValueChange,
      yearRange = 100,
      container,
    },
    ref,
  ) => {
    const inputId = id ?? React.useId();
    const [open, setOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState<DateValue>({
      day: defaultValue?.day ?? null,
      month: defaultValue?.month ?? null,
      year: defaultValue?.year ?? null,
    });
    const current: DateValue = {
      day: value?.day ?? internalValue.day,
      month: value?.month ?? internalValue.month,
      year: value?.year ?? internalValue.year,
    };

    const update = (patch: Partial<DateValue>) => {
      const next = { ...current, ...patch };
      if (value === undefined) setInternalValue(next);
      onValueChange?.(next);
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: yearRange }, (_, i) => currentYear - i);
    const maxDay = daysInMonth(current.month, current.year);
    const days = Array.from({ length: maxDay }, (_, i) => i + 1);

    const displayValue = formatDateValue(current);

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

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <button
                ref={ref}
                id={inputId}
                type="button"
                disabled={disabled}
                className={cn(
                  "flex h-10 w-full items-center gap-2 rounded-lg pl-3 pr-2.5 text-left transition-shadow duration-150",
                  error ? "bg-negative-faint" : "bg-input-subtle",
                  disabled && "bg-input-faint-disabled cursor-not-allowed",
                  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                  error ? "focus-visible:ring-negative" : "focus-visible:ring-brand",
                  className,
                )}
              >
                <CalendarBlankIcon className="size-5 shrink-0 icon-surface-faint" />
                <span
                  className={cn(
                    "flex-1 text-sm font-medium tracking-tight",
                    displayValue ? "text-surface-bold" : "text-surface-faint",
                    disabled && "text-surface-faint-disabled",
                  )}
                >
                  {displayValue || placeholder}
                </span>
              </button>
            }
          />
          <PopoverContent container={container} className="w-72 p-3">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <select
                  aria-label="Day"
                  className={selectClassName}
                  value={current.day ?? ""}
                  onChange={(e) =>
                    update({ day: e.target.value === "" ? null : Number(e.target.value) })
                  }
                >
                  <option value="">Day</option>
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <select
                  aria-label="Month"
                  className={selectClassName}
                  value={current.month ?? ""}
                  onChange={(e) =>
                    update({ month: e.target.value === "" ? null : Number(e.target.value) })
                  }
                >
                  <option value="">Month</option>
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  aria-label="Year"
                  className={selectClassName}
                  value={current.year ?? ""}
                  onChange={(e) =>
                    update({ year: e.target.value === "" ? null : Number(e.target.value) })
                  }
                >
                  <option value="">Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => update({ day: null, month: null, year: null })}
                  className="text-surface-muted hover:text-surface-bold text-xs font-medium"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-surface-inverse text-surface-inverse flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium"
                >
                  Done
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <FieldHint hint={hint} error={error} disabled={disabled} />
      </div>
    );
  },
);
DateInput.displayName = "DateInput";

export { DateInput };
