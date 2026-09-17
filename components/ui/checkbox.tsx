"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cn } from "cn"
import { CheckIcon } from "lucide-react"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-surface-bold transition-colors outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-surface-bold after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-brand-bold focus-visible:ring-3 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-negative-bold aria-invalid:ring-3 aria-invalid:ring-negative aria-invalid:aria-checked:border-brand-bold data-checked:border-brand-bold data-checked:bg-brand-bold data-checked:text-brand-inverse group-has-[:focus-visible]/field-label:data-checked:border-brand-bold",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
