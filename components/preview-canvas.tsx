"use client";

import { useMemo, useRef, useState } from "react";
import { generateAccentScale, accentScaleToCssVars } from "@/lib/accent-scale-client";
import { AccentPicker } from "./accent-picker";
import { NeutralPicker } from "./neutral-picker";
import { SimpleListPicker } from "./simple-list-picker";
import { TextAaIcon, SunIcon, MoonIcon, CornersOutIcon } from "@phosphor-icons/react";
import { SegmentedToggle, Segment } from "./segmented-toggle";
import { ColumnOne } from "./column-one";
import { ColumnTwo } from "./column-two";
import { ColumnThree } from "./column-three";

// Step 1 of the preview build: prove the isolation mechanism works before
// building anything else on top of it. Everything inside the wrapper div
// responds to the five data-* attributes below, scoped to local component
// state, never touching the real <html> attributes the rest of the app
// uses. The "OUTSIDE" button below the wrapper exists specifically to prove
// that claim, not just assert it, it uses the exact same utility classes
// but sits outside the wrapper, so it should never change no matter what
// you pick in here.

const RADIUS_OPTIONS = ["default", "sharp", "round"];
const FONT_OPTIONS = ["preset-1", "preset-2", "preset-3", "preset-4", "preset-5"];
// Display only. The actual data-font value stays "preset-N", that's what
// the published CSS's [data-font="preset-N"] selectors and the
// FONT_NAME_TO_CSS_VAR mapping in build.js are keyed on. Renaming the real
// value would need a pipeline rebuild, this is just the label shown here.
const FONT_LABELS: Record<string, string> = {
  "preset-1": "Google Sans Flex",
  "preset-2": "DM Sans",
  "preset-3": "Outfit",
  "preset-4": "Manrope",
  "preset-5": "Inter",
};

export  function PreviewCanvas() {
  const [view, setView] = useState<"components" | "dashboard">("components");
  const [accentMode, setAccentMode] = useState<"preset" | "custom">("preset");
  const [accentPreset, setAccentPreset] = useState("tushe");
  const [customHex, setCustomHex] = useState("#F14602");
  const [neutral, setNeutral] = useState("Neutral");
  const [radius, setRadius] = useState("default");
  const [font, setFont] = useState("preset-5");
  const [theme, setTheme] = useState("Light");
  // The container any popover living inside the scoped preview (currently
  // ColumnOne's State dropdown) needs to portal into, so it picks up this
  // div's local data-theme/data-accent/etc instead of falling back to the
  // real page's actual values.
  const scopedContainerRef = useRef<HTMLDivElement>(null);

  // Recomputed only when the hex actually changes, not on every render,
  // this runs on every pointer-move while dragging the picker otherwise.
  const customAccentVars = useMemo(() => {
    if (accentMode !== "custom") return undefined;
    const scale = generateAccentScale(customHex);
    return accentScaleToCssVars(scale);
  }, [accentMode, customHex]);

  return (
    <div className="">
      <div className="flex items-center justify-between sticky top-0 bg-surface-flat border-b border-surface-faint py-4 px-8">
        <SegmentedToggle>
          <Segment active={view === "components"} onClick={() => setView("components")}>
            <span className={view === "components" ? "text-brand-bold text-sm font-medium" : "text-surface-muted text-sm font-medium"}>
              Components
            </span>
          </Segment>
          <Segment active={view === "dashboard"} onClick={() => setView("dashboard")}>
            <span className={view === "dashboard" ? "text-brand-bold text-sm font-medium" : "text-surface-muted text-sm font-medium"}>
              Dashboard
            </span>
          </Segment>
        </SegmentedToggle>
        <SegmentedToggle>
            <Segment square active={theme === "Light"} onClick={() => setTheme("Light")}>
              <SunIcon weight="fill" className="text-surface-muted size-4" />
            </Segment>
            <Segment square active={theme === "Dark"} onClick={() => setTheme("Dark")}>
              <MoonIcon weight="fill" className="text-surface-muted size-4" />
            </Segment>
          </SegmentedToggle>
      </div>
      <div
          ref={scopedContainerRef}
          data-accent={accentMode === "preset" ? accentPreset : "custom"}
          data-neutral={neutral}
          data-radius={radius}
          data-font={font}
          data-theme={theme}
          style={customAccentVars}
          className="bg-surface-flat py-4 px-8 min-h-screen font-sans"
        >
           {view === "dashboard" ? (
        <p className="text-surface-muted text-sm">Dashboard view, empty state for now.</p>
      ) : (
         <div className="container mx-auto grid grid-cols-3">
          <ColumnOne container={scopedContainerRef.current} />
          <ColumnTwo />
          <ColumnThree />
         </div>)}
        </div>

        <div className="fixed w-full bottom-0 flex justify-center gap-4 px-8 py-4 border-t border-surface-faint bg-surface-flat">
        <AccentPicker
          mode={accentMode}
          preset={accentPreset}
          hex={customHex}
          onSelectPreset={(name: string) => {
            setAccentMode("preset");
            setAccentPreset(name);
          }}
          onCustomHex={(hex: string) => {
            setAccentMode("custom");
            setCustomHex(hex);
          }}
        />

        <NeutralPicker value={neutral} onChange={setNeutral} />
        <SimpleListPicker
          label="Radius"
          value={radius}
          options={RADIUS_OPTIONS}
          triggerIcon={<CornersOutIcon />}
          onChange={setRadius}
        />
        <SimpleListPicker
          label="Font Family"
          value={font}
          options={FONT_OPTIONS}
          labels={FONT_LABELS}
          triggerIcon={<TextAaIcon className="text-surface-muted size-4" />}
          onChange={setFont}
        />
      </div>
    </div>
  );
}