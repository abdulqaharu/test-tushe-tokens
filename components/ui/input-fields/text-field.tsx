import * as React from "react";
import {
  InfoIcon,
  UserCircleIcon,
  EnvelopeSimpleIcon,
  CreditCardIcon,
} from "@phosphor-icons/react";
import { Input, type InputProps } from "./input";
import { cn } from "@/lib/utils";

/**
 * Tushe "Prime Text Input" — full composition (label + input + hint)
 * Figma: file lbqA08oyPYIx2fD4TPNTwu, node 4702:4840
 *
 * `type` covers the simple, single-left-icon variants only (same
 * structure as Basic, icon swap only, plus lightweight per-type
 * validation/masking that doesn't need its own popover UI). Date and
 * Emoji need a popover (calendar / emoji grid) so they're structurally
 * different and live in their own components — see date-input.tsx and
 * emoji-input.tsx. Phone, Website, Amount, Search, Password, Link, and
 * Invite are likewise structurally different and live in their own
 * components — see phone-input.tsx, website-input.tsx, amount-input.tsx,
 * search-input.tsx, password-input.tsx, link-input.tsx, invite-input.tsx.
 */
const TYPE_ICON_MAP = {
  basic: UserCircleIcon,
  email: EnvelopeSimpleIcon,
  card: CreditCardIcon,
} as const;

export type TextFieldType = keyof typeof TYPE_ICON_MAP;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatCardNumber(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.match(/.{1,4}/g)?.join(" ") ?? digits;
}

/** Standard Luhn checksum — the same check card issuers use. */
function isLuhnValid(digits: string) {
  let sum = 0;
  let alternate = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = Number(digits[i]);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

export interface TextFieldProps extends InputProps {
  type?: TextFieldType;
  label?: string;
  required?: boolean;
  optional?: boolean;
  labelInfo?: string;
  hint?: string;
  error?: boolean;
  id?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      type = "basic",
      label,
      required,
      optional,
      labelInfo,
      hint,
      error,
      state,
      className,
      id,
      leftIcon,
      value,
      defaultValue,
      onChange,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? React.useId();
    const [invalid, setInvalid] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(
      type === "card" ? formatCardNumber(String(defaultValue ?? "")) : defaultValue ?? "",
    );
    const isCard = type === "card";
    const isEmail = type === "email";
    const currentValue =
      value !== undefined ? (isCard ? formatCardNumber(String(value)) : value) : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isCard) {
        e.target.value = formatCardNumber(e.target.value);
      }
      if (value === undefined) setInternalValue(e.target.value);
      if (invalid) setInvalid(false);
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (isEmail) {
        setInvalid(e.target.value.length > 0 && !EMAIL_RE.test(e.target.value));
      } else if (isCard) {
        const digits = e.target.value.replace(/\D/g, "");
        setInvalid(digits.length > 0 && (digits.length !== 16 || !isLuhnValid(digits)));
      }
      onBlur?.(e);
    };

    const resolvedState = error || invalid ? "error" : state;
    const Icon = TYPE_ICON_MAP[type];
    const resolvedLeftIcon = leftIcon ?? <Icon weight="regular" />;

    let resolvedHint = hint;
    if (invalid && !hint) {
      if (isEmail) resolvedHint = "Enter a valid email address.";
      if (isCard) resolvedHint = "Enter a valid 16-digit card number.";
    }

    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <div className="flex items-center gap-px">
            <label
              htmlFor={inputId}
              className="text-sm font-medium tracking-tight text-surface-subtle"
            >
              {label}
            </label>
            {required && (
              <span className="text-xs leading-3 text-negative-bold">*</span>
            )}
            {optional && (
              <span className="text-xs leading-3 text-surface-muted">
                (Optional)
              </span>
            )}
            {labelInfo && (
              <span title={labelInfo} className="ml-0.5">
                <InfoIcon className="size-4 icon-surface-faint" />
              </span>
            )}
          </div>
        )}

        <Input
          id={inputId}
          ref={ref}
          state={resolvedState}
          className={className}
          leftIcon={resolvedLeftIcon}
          type={isEmail ? "email" : "text"}
          inputMode={isCard ? "numeric" : undefined}
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={resolvedState === "error" || undefined}
          {...props}
        />

        {resolvedHint && (
          <div
            className={cn(
              "flex items-center gap-1",
              resolvedState === "error" ? "text-negative-subtle" : "text-surface-muted",
              props.disabled && "text-surface-faint-disabled",
            )}
          >
            <InfoIcon className="size-4 shrink-0" />
            <p className="text-xs font-normal tracking-tight">{resolvedHint}</p>
          </div>
        )}
      </div>
    );
  },
);
TextField.displayName = "TextField";

export { TextField };
