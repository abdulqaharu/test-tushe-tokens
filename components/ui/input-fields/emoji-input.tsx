import * as React from "react";
import { SmileyIcon } from "@phosphor-icons/react";
import { FieldLabel } from "./field-label";
import { FieldHint } from "./field-hint";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Small curated set, not a full emoji database — this is a design-system
// demo, not a product feature, so a exhaustive/searchable emoji picker
// (which is what a real one would need) is out of scope here.
const EMOJIS = [
  "😀", "😂", "😍", "🥳", "😎", "🤔", "😢", "😡",
  "👍", "🙏", "👏", "🙌", "💪", "🤝", "👀", "🔥",
  "💯", "✅", "❌", "⭐", "🎉", "🚀", "❤️", "💡",
];

const nativeInputValueSetter = (typeof window !== "undefined"
  ? Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")
  : undefined
)?.set;

export interface EmojiInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  required?: boolean;
  optional?: boolean;
  labelInfo?: string;
  hint?: string;
  error?: boolean;
  id?: string;
  /** Scopes the emoji popover inside a themed container instead of document.body. */
  container?: React.ComponentProps<typeof PopoverContent>["container"];
}

/**
 * Tushe "Prime Text Input" — Emoji type
 * Figma: node 4702:4840 (icon-swap variant), extended here so the
 * leading smiley is a real picker instead of decoration. The field
 * stays a normal free-text input — clicking the icon inserts an emoji
 * at the caret without taking typing away.
 */
const EmojiInput = React.forwardRef<HTMLInputElement, EmojiInputProps>(
  ({ label, required, optional, labelInfo, hint, error, id, container, className, disabled, ...props }, ref) => {
    const inputId = id ?? React.useId();
    const innerRef = React.useRef<HTMLInputElement | null>(null);
    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref],
    );
    const [open, setOpen] = React.useState(false);

    const insertEmoji = (emoji: string) => {
      const node = innerRef.current;
      if (!node || !nativeInputValueSetter) return;
      const start = node.selectionStart ?? node.value.length;
      const end = node.selectionEnd ?? node.value.length;
      const next = node.value.slice(0, start) + emoji + node.value.slice(end);
      nativeInputValueSetter.call(node, next);
      node.dispatchEvent(new Event("input", { bubbles: true }));
      const caret = start + emoji.length;
      node.setSelectionRange(caret, caret);
      setOpen(false);
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
            "flex h-10 w-full items-center gap-2 rounded-lg pl-3 pr-2.5 transition-shadow duration-150",
            error ? "bg-negative-faint" : "bg-input-subtle",
            disabled && "bg-input-faint-disabled",
            error
              ? "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-negative has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-white"
              : "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-white",
            className,
          )}
        >
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <button
                  type="button"
                  disabled={disabled}
                  aria-label="Insert emoji"
                  className="flex size-5 shrink-0 items-center justify-center icon-surface-faint disabled:cursor-not-allowed"
                >
                  <SmileyIcon weight="regular" />
                </button>
              }
            />
            <PopoverContent container={container} finalFocus={innerRef} className="w-64 p-2">
              <div className="grid grid-cols-8 gap-1">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => insertEmoji(emoji)}
                    className="hover:bg-surface-flat-hover flex size-7 items-center justify-center rounded-md text-base"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <input
            ref={setRefs}
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
        </div>

        <FieldHint hint={hint} error={error} disabled={disabled} />
      </div>
    );
  },
);
EmojiInput.displayName = "EmojiInput";

export { EmojiInput };
