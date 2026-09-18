import * as React from "react";
import {
  InfoIcon,
  UserCircleIcon,
  EnvelopeSimpleIcon,
  CalendarBlankIcon,
  SmileyIcon,
  CreditCardIcon,
} from "@phosphor-icons/react";
import { Input, type InputProps } from "./input";
import { cn } from "@/lib/utils";

/**
 * Tushe "Prime Text Input" — full composition (label + input + hint)
 * Figma: file lbqA08oyPYIx2fD4TPNTwu, node 4702:4840
 *
 * `type` covers the simple, single-left-icon variants only (same
 * structure as Basic, icon swap only). Phone, Website, Amount,
 * Search, Password, Link, and Invite are structurally different
 * and live in their own components — see phone-input.tsx,
 * website-input.tsx, amount-input.tsx, search-input.tsx,
 * password-input.tsx, link-input.tsx, invite-input.tsx.
 */
const TYPE_ICON_MAP = {
  basic: UserCircleIcon,
  email: EnvelopeSimpleIcon,
  date: CalendarBlankIcon,
  emoji: SmileyIcon,
  // Figma uses a decorative multi-layer "card provider" graphic here,
  // not a real icon — CreditCardIcon is the closest Phosphor equivalent.
  card: CreditCardIcon,
} as const;

export type TextFieldType = keyof typeof TYPE_ICON_MAP;

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
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const resolvedState = error ? "error" : state;
    const Icon = TYPE_ICON_MAP[type];
    const resolvedLeftIcon = leftIcon ?? <Icon weight="regular" />;

    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <div className="flex items-center gap-px">
            <label htmlFor={inputId} className="text-sm font-medium leading-4 tracking-tight text-surface-subtle">
              {label}
            </label>
            {required && <span className="text-xs leading-3 text-negative-bold">*</span>}
            {optional && <span className="text-xs leading-3 text-surface-muted">(Optional)</span>}
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
          {...props}
        />

        {hint && (
          <div
            className={cn(
              "flex items-center gap-1",
              error ? "text-negative-subtle" : "text-surface-muted",
              props.disabled && "text-surface-faint-disabled"
            )}
          >
            <InfoIcon className="size-4 shrink-0" />
            <p className="text-xs font-normal leading-4 tracking-tight">{hint}</p>
          </div>
        )}
      </div>
    );
  }
);
TextField.displayName = "TextField";

export { TextField };
