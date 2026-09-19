"use client";

import { useState } from "react";
import { GearIcon } from "@phosphor-icons/react";
import { Switch } from "@/components/ui/switch";

// The "Save Changes" button in the Figma frame is rendered at opacity-0,
// a layout placeholder Figma keeps to preserve spacing math in the
// original design tool, not something meaningful to reproduce as a
// literally invisible element in real code. Omitted entirely here.

export function IntegrationCard() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="bg-surface-subtle border-input-faint flex w-full flex-col items-start gap-5 rounded-xl border p-4">
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col items-start gap-4">
          <div className="bg-surface-flat shadow flex size-12 items-center justify-center rounded-xl">
            <div>
              <svg
                width="25"
                height="20"
                viewBox="0 0 25 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_963_86360)">
                  <path
                    d="M0 4.33423C0 3.04936 0.37569 1.95236 1.16409 1.16388L2.53522 2.53514C1.00915 4.05587 2.34189 8.784 6.687 13.1336C11.0321 17.4832 15.7625 18.8148 17.2872 17.2912L18.6583 18.6626C16.0861 21.235 10.2272 19.4099 5.32272 14.5035C1.92095 11.1 0 7.23855 0 4.33423Z"
                    fill="#009A46"
                  />
                  <path
                    d="M8.64799 19.8439C7.36323 19.8439 6.26633 19.4682 5.47656 18.6797L6.84769 17.3085C8.37102 18.8319 13.0987 17.4991 17.4479 13.1508C21.7971 8.80254 23.1271 4.07442 21.6038 2.55095L22.975 1.17969C25.5485 3.75217 23.7222 9.61157 18.8163 14.5165C15.4132 17.9241 11.5521 19.8439 8.64799 19.8439Z"
                    fill="#FF5805"
                  />
                  <path
                    d="M19.2697 12.5559C18.4374 10.1589 16.7372 7.59742 14.4817 5.3431C9.57724 0.436732 3.71837 -1.38978 1.14614 1.18407C0.963781 1.36782 1.12146 1.82171 1.49989 2.20017C1.87832 2.57864 2.33217 2.73496 2.51453 2.55259C4.03922 1.02912 8.7669 2.36198 13.1148 6.71162C15.1714 8.76852 16.7043 11.0653 17.4434 13.1908C18.0905 15.0544 18.0275 16.5573 17.2734 17.3115C17.0897 17.4938 17.2487 17.9491 17.6257 18.3262C18.0028 18.7033 18.458 18.8623 18.6417 18.6786C19.9594 17.3608 20.1829 15.1833 19.2697 12.5559Z"
                    fill="#F5AFCB"
                  />
                  <path
                    d="M22.9717 1.18337C21.6513 -0.137159 19.4766 -0.360675 16.8468 0.553956C14.4515 1.38494 11.8888 3.08667 9.63471 5.34102C4.73016 10.246 2.90381 16.1054 5.47605 18.6792C5.65979 18.8617 6.11363 18.7039 6.49206 18.3268C6.87049 17.9497 7.02816 17.4945 6.84444 17.3108C5.317 15.7873 6.65385 11.0592 11.0031 6.70954C13.0597 4.65265 15.3564 3.11958 17.4817 2.38048C19.3451 1.73461 20.8478 1.79632 21.6033 2.55051C21.7857 2.73289 22.2408 2.57519 22.618 2.19672C22.995 1.81826 23.154 1.36574 22.9717 1.18337Z"
                    fill="#FF9B00"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_963_86360">
                    <rect width="24.1379" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-surface-bold text-heading-sm">Flutterwave</p>
            <p className="text-surface-subtle text-body-base-normal">
              Quickly identifies compliance risks in contracts, reports, and
              filings
            </p>
          </div>
        </div>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>
      <button className="flex items-center gap-1">
        <GearIcon className="text-brand-bold size-3.5" />
        <span className="text-brand-bold text-sm font-medium">Configure</span>
      </button>
    </div>
  );
}
