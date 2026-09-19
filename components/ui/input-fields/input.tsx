import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Tushe "Prime Text Input" — Basic type
 * Figma: file lbqA08oyPYIx2fD4TPNTwu, node 4702:4840
 * Colors/states come straight from @tushe/tokens utility classes.
 */
const inputVariants = cva(
  [
    "flex w-full items-center gap-2 rounded-lg",
    "bg-input-subtle",
    "font-medium text-sm  tracking-tight",
    "text-surface-bold",
    "placeholder:text-surface-faint placeholder:font-medium",
    "outline-none transition-shadow duration-150",
    "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-white",
    "disabled:bg-input-faint-disabled disabled:text-surface-faint-disabled disabled:cursor-not-allowed",
  ],
  {
    variants: {
      size: {
        md: "h-10 pl-3 pr-2.5 py-2.5", // Medium (40)
        sm: "h-9 pl-3 pr-2.5 py-2", // Small (36)
        xs: "h-8 pl-3 pr-2.5 py-2", // X-Small (32)
      },
      state: {
        default: "",
        error: "bg-negative-faint has-[:focus-visible]:ring-negative",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, state, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className={cn(inputVariants({ size, state }), className)}>
        {leftIcon && (
          <span className="flex size-5 shrink-0 items-center justify-center icon-surface-faint">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          className="w-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-inherit disabled:cursor-not-allowed"
          aria-invalid={state === "error" || undefined}
          {...props}
        />
        {rightIcon && (
          <span className="flex size-5 shrink-0 items-center justify-center">
            {rightIcon}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
