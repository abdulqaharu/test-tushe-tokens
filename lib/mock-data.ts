import type { Country } from "@/components/ui/input-fields/phone-input";
import type { Currency } from "@/components/ui/input-fields/amount-input";

/**
 * Flag images come from flagcdn.com (free, no-key CDN). Swap for your
 * own asset pipeline if you'd rather not depend on an external host.
 */
export const MOCK_COUNTRIES: Country[] = [
  { code: "US", dialCode: "+1", flagUrl: "https://flagcdn.com/w40/us.png" },
  { code: "NG", dialCode: "+234", flagUrl: "https://flagcdn.com/w40/ng.png" },
  { code: "GB", dialCode: "+44", flagUrl: "https://flagcdn.com/w40/gb.png" },
  { code: "KE", dialCode: "+254", flagUrl: "https://flagcdn.com/w40/ke.png" },
  { code: "GH", dialCode: "+233", flagUrl: "https://flagcdn.com/w40/gh.png" },
];

export const DEFAULT_COUNTRY = MOCK_COUNTRIES[1]; // NG, matches Tushe's home market

export const MOCK_CURRENCIES: Currency[] = [
  { code: "NGN", symbol: "₦", flagUrl: "https://flagcdn.com/w40/ng.png" },
  { code: "USD", symbol: "$", flagUrl: "https://flagcdn.com/w40/us.png" },
  { code: "EUR", symbol: "€", flagUrl: "https://flagcdn.com/w40/eu.png" },
  { code: "GBP", symbol: "£", flagUrl: "https://flagcdn.com/w40/gb.png" },
];

export const DEFAULT_CURRENCY = MOCK_CURRENCIES[0]; // NGN

export const MOCK_PERMISSIONS = ["can view", "can edit", "can manage", "no access"] as const;

export const DEFAULT_PERMISSION = MOCK_PERMISSIONS[0]; // "can view"
