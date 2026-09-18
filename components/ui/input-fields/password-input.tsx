import * as React from "react";
import { Lock, Eye, EyeSlash, CheckCircle, XCircle } from "@phosphor-icons/react";
import { FieldLabel } from "./field-label";
import { FieldHint } from "./field-hint";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  required?: boolean;
  optional?: boolean;
  labelInfo?: string;
  hint?: string;
  error?: boolean;
  id?: string;
  /** Shows the live "must contain at least..." checklist below the field. */
  showStrength?: boolean;
}

const STRENGTH_RULES = [
  { label: "At least 1 uppercase", test: (v: string) => /[A-Z]/.test(v) },
  { label: "At least 1 number", test: (v: string) => /[0-9]/.test(v) },
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
];

/**
 * Tushe "Prime Text Input" — Password type
 * Figma: node 4702:6244
 */
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      required,
      optional,
      labelInfo,
      hint,
      error,
      id,
      showStrength = false,
      className,
      disabled,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const [visible, setVisible] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(String(defaultValue ?? ""));
    const currentValue = value !== undefined ? String(value) : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) setInternalValue(e.target.value);
      onChange?.(e);
    };

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
          <Lock className="size-5 shrink-0 icon-surface-faint" />
          <input
            ref={ref}
            id={inputId}
            type={visible ? "text" : "password"}
            disabled={disabled}
            value={value !== undefined ? value : undefined}
            defaultValue={value === undefined ? defaultValue : undefined}
            onChange={handleChange}
            className={cn(
              "min-w-0 flex-1 bg-transparent py-2.5 text-xs font-normal leading-4 tracking-tight text-surface-bold outline-none",
              "placeholder:text-surface-faint",
              "disabled:cursor-not-allowed disabled:text-surface-faint-disabled"
            )}
            aria-invalid={error || undefined}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            disabled={disabled}
            aria-label={visible ? "Hide password" : "Show password"}
            className="flex shrink-0 items-center disabled:cursor-not-allowed"
          >
            {visible ? (
              <EyeSlash className="size-5 icon-surface-faint" />
            ) : (
              <Eye className="size-5 icon-surface-faint" />
            )}
          </button>
        </div>

        <FieldHint hint={hint} error={error} disabled={disabled} />

        {showStrength && (
          <div className="flex w-full flex-col gap-2 pt-1.5">
            <p className="text-[11px] font-normal leading-4 tracking-tight text-surface-subtle">Must contain at least;</p>
            <div className="flex flex-wrap items-start gap-2">
              {STRENGTH_RULES.map((rule) => {
                const passed = rule.test(currentValue);
                const Icon = passed ? CheckCircle : XCircle;
                return (
                  <div key={rule.label} className="flex items-center gap-1">
                    <Icon className={cn("size-4", passed ? "icon-success-bold" : "icon-surface-faint")} weight="fill" />
                    <span className="text-[11px] font-normal leading-4 tracking-tight text-surface-subtle">
                      {rule.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
