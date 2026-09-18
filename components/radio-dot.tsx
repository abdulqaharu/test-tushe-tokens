// Exact structure from the Figma frame: two nested absolutely-positioned
// circles, not a native radio input styled to look like this. Shared
// between the five-control row and the selectable cards below, both use
// the identical selected/unselected treatment.

export function RadioDot({
  selected,
  className = "",
}: {
  selected: boolean;
  className?: string;
}) {
  return (
    <div className={`relative size-5 shrink-0 overflow-clip ${className}`}>
      {selected ? (
        <>
          <div className="bg-brand-bold absolute inset-[10%] rounded-full" />
          <div className="bg-surface-flat absolute inset-[30%] rounded-full" />
        </>
      ) : (
        <>
          <div className="bg-surface-bold absolute inset-[10%] rounded-full" />
          <div className="bg-surface-flat shadow-sm absolute inset-[17.5%] rounded-full" />
        </>
      )}
    </div>
  );
}
