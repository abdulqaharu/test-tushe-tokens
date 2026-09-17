"use client";

import { useState } from "react";
import { InfoIcon, EnvelopeSimpleIcon, WechatLogoIcon, TerminalWindowIcon, DevicesIcon, SpinnerIcon } from "@phosphor-icons/react";


import { SelectableCard } from "./selectable-card";
import { SegmentedToggle, Segment } from "./segmented-toggle";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PriceSlider } from "./ui/price-slider";
import { SelectField } from "./select-field";


// Mock content only, per the decision this session, the real State field
// has no options list captured from Figma to translate.
const MOCK_STATES = ["Lagos", "Abuja (FCT)", "Rivers", "Kano", "Oyo"];

export function ColumnOne({ container }: { container?: HTMLDivElement | null }){
 const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [toggleOn, setToggleOn] = useState(true);
  const [state, setState] = useState<string | null>(null);
  const [contactTab, setContactTab] = useState<"emails" | "chat">("emails");
  const [selectedCard, setSelectedCard] = useState<"api" | "branded">("api");
  const [demoRadio, setDemoRadio] = useState("a");

  return (
    <div className="flex items-start max-w-90 flex-col gap-10">
      {/* Company text input */}
      <div className="flex w-full flex-col gap-1">
        <span className="text-surface-subtle text-sm font-medium">Company</span>
        <input
          placeholder="Paystack"
          className="bg-input-subtle text-surface-bold h-9 w-full rounded-lg px-2.5 py-2 text-sm font-medium outline-none placeholder:text-surface-faint"
        />
        <div className="flex items-center gap-1">
          <InfoIcon className="text-surface-muted size-4" />
          <span className="text-surface-muted text-xs">We wont share your email</span>
        </div>
      </div>

      {/* State dropdown, mock content */}
      <SelectField
        label="State"
        placeholder="Select one"
        options={MOCK_STATES}
        value={state}
        onChange={setState}
        container={container}
      />

      {/* Five-control row: checkbox, switch, a real (mock) radio pair,
          and a loading spinner. The radios are now an actual working
          group, not two fixed states side by side, RadioGroup needs its
          default vertical stacking overridden to sit inline in this row. */}
      <div className="flex w-64 items-center justify-center gap-8">
        <Checkbox checked={checkboxChecked} onCheckedChange={setCheckboxChecked} />
        <Switch checked={toggleOn} onCheckedChange={setToggleOn} />
        <RadioGroup value={demoRadio} onValueChange={(v: string) => setDemoRadio(v)} className="flex items-center gap-3">
          <RadioGroupItem value="a" />
          <RadioGroupItem value="b" />
        </RadioGroup>
        <SpinnerIcon className="text-surface-muted shrink-0 size-6 animate-spin" />
      </div>

      <PriceSlider />

      {/* Emails/Chat pill, reuses the same SegmentedToggle as the
          Components/Dashboard tabs and the theme toggle */}
      <SegmentedToggle>
        <Segment active={contactTab === "emails"} onClick={() => setContactTab("emails")}>
          <div className="flex items-center gap-1.5">
            <EnvelopeSimpleIcon className={contactTab === "emails" ? "text-brand-bold size-4" : "text-surface-muted size-4"} />
            <span className={contactTab === "emails" ? "text-brand-bold text-sm font-medium" : "text-surface-muted text-sm font-medium"}>
              Emails
            </span>
          </div>
        </Segment>
        <Segment active={contactTab === "chat"} onClick={() => setContactTab("chat")}>
          <div className="flex items-center gap-1.5">
            <WechatLogoIcon className={contactTab === "chat" ? "text-brand-bold size-4" : "text-surface-muted size-4"} />
            <span className={contactTab === "chat" ? "text-brand-bold text-sm font-medium" : "text-surface-muted text-sm font-medium"}>
              Chat
            </span>
          </div>
        </Segment>
      </SegmentedToggle>

      {/* The two selectable cards, now a real RadioGroup instead of two
          independently-clickable divs */}
      <RadioGroup
        value={selectedCard}
        onValueChange={(value: string) => setSelectedCard(value as "api" | "branded")}
        className="flex flex-col gap-4"
      >
        <SelectableCard
          value="api"
          icon={<TerminalWindowIcon className="text-surface-bold size-7" />}
          title="Developer / API access"
          description="Build with our API and SDKs. No branded interface."
          selected={selectedCard === "api"}
        />
        <SelectableCard
          value="branded"
          icon={<DevicesIcon className="text-surface-bold size-7" />}
          title="Branded web or mobile app"
          description="A hosted, white-labeled product with your own branding."
          selected={selectedCard === "branded"}
        />
      </RadioGroup>
    </div>
  );
}
