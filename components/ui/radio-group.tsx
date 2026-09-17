"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "cn"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-surface-subtle bg-surface-bold outline-none group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-surface-bold after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-brand-bold focus-visible:ring-3 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-negative-bold aria-invalid:ring-3 aria-invalid:ring-negative aria-invalid:aria-checked:border-brand-bold data-checked:border-brand-bold data-checked:bg-brand-bold data-checked:text-brand-inverse group-has-[:focus-visible]/field-label:data-checked:border-brand-bold",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-static-white" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
