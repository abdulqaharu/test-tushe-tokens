import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "cn";

// Every data-horizontal:/data-vertical: variant below was dead in the
// original shadcn-generated file, confirmed against a shadcn/ui GitHub
// issue reporting the exact same bug: Base UI emits data-orientation, a
// valued attribute, never a bare data-horizontal/data-vertical boolean.
// Tailwind's shorthand data-horizontal: compiles to [data-horizontal],
// which matches nothing, so the track and indicator got zero dimension,
// only the thumb (unconditionally sized) ever rendered. Fixed by using
// the correct arbitrary-value variant, data-[orientation=horizontal]:.

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max];

  return (
    <SliderPrimitive.Root
      className={cn(
        "data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
        className,
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-2xl bg-input-subtle select-none data-[orientation=horizontal]:h-5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-5"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-brand-bold select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            // Pill-shaped (h-4 w-6 rounded-lg), matching the exact Figma
            // thumb, not the default small circle. thumbAlignment="edge"
            // above keeps a rectangular thumb correctly clamped within the
            // track at both ends, a circular thumb doesn't need that but a
            // pill does.
            className="relative block h-4 w-6 shrink-0 rounded-lg bg-static-white shadow transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 hover:ring-brand focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-brand active:ring-3 active:ring-brand disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
