// Faithful port of the radius picker's trigger icon from Figma: four small
// L-shaped corner brackets pointing outward, not a stock icon from Phosphor
// or any other set, since nothing in a generic icon library matches this
// specific decorative mark.

export function RadiusIcon() {
  const bracket = "border-surface-bold border-l-2 border-t-2 border-solid rounded-tl size-[6px]";
  return (
    <div className="relative size-4">
      <div className={`absolute left-0 top-0 ${bracket}`} />
      <div className="absolute right-0 top-0 flex size-[6px] rotate-90 items-center justify-center">
        <div className={bracket} />
      </div>
      <div className="absolute bottom-0 left-0 flex size-[6px] -rotate-90 items-center justify-center">
        <div className={bracket} />
      </div>
      <div className="absolute bottom-0 right-0 flex size-[6px] rotate-180 items-center justify-center">
        <div className={bracket} />
      </div>
    </div>
  );
}
