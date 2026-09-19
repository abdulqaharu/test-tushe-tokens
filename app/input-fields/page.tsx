"use client";

import * as React from "react";
import { TextField, type TextFieldType } from "@/components/ui/input-fields/text-field";
import { DateInput } from "@/components/ui/input-fields/date-input";
import { EmojiInput } from "@/components/ui/input-fields/emoji-input";
import { PhoneInput } from "@/components/ui/input-fields/phone-input";
import { WebsiteInput } from "@/components/ui/input-fields/website-input";
import { AmountInput } from "@/components/ui/input-fields/amount-input";
import { SearchInput } from "@/components/ui/input-fields/search-input";
import { PasswordInput } from "@/components/ui/input-fields/password-input";
import { LinkInput } from "@/components/ui/input-fields/link-input";
import { InviteInput } from "@/components/ui/input-fields/invite-input";
import {
  MOCK_COUNTRIES,
  DEFAULT_COUNTRY,
  MOCK_CURRENCIES,
  DEFAULT_CURRENCY,
  MOCK_PERMISSIONS,
  DEFAULT_PERMISSION,
} from "@/lib/mock-data";

/** Small layout helpers — presentational only, not part of the design system. */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-b border-surface-faint pb-10">
      <h2 className="text-lg font-semibold text-surface-bold">{title}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

function Cell({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-surface-faint p-4">
      <span className="text-xs font-medium uppercase tracking-wide text-surface-muted">{caption}</span>
      {children}
    </div>
  );
}

const TEXT_FIELD_TYPES: TextFieldType[] = ["basic", "email", "card"];

export default function ComponentPreviewPage() {
  const [country, setCountry] = React.useState(DEFAULT_COUNTRY);
  const [currency, setCurrency] = React.useState(DEFAULT_CURRENCY);
  const [permission, setPermission] = React.useState<string>(DEFAULT_PERMISSION);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 bg-surface-flat px-6 py-10">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-surface-bold">Tushe Text Input — Component Preview</h1>
        <p className="text-sm text-surface-muted">
          Every type and state, for visual QA against Figma node 4702:4840.
        </p>
      </header>

      {/* 1. Type variants (simple icon-swap types via TextField) */}
      <Section title="Type variants — TextField">
        {TEXT_FIELD_TYPES.map((type) => (
          <Cell key={type} caption={type}>
            <TextField
              type={type}
              label={type[0].toUpperCase() + type.slice(1)}
              placeholder={type === "card" ? "0000 0000 0000 0000" : "Placeholder text..."}
              hint={
                type === "email"
                  ? "Blurs to validate — try an incomplete address."
                  : type === "card"
                    ? "Formats live and checks the Luhn digit on blur."
                    : "This is a hint text to help user."
              }
            />
          </Cell>
        ))}
        <Cell caption="date">
          <DateInput label="Date" hint="Pick any subset of day / month / year." />
        </Cell>
        <Cell caption="emoji">
          <EmojiInput label="Emoji" placeholder="Type or pick an emoji..." hint="Click the smiley to open the picker." />
        </Cell>
      </Section>

      {/* 2. States (Basic type) */}
      <Section title="States — TextField (Basic)">
        <Cell caption="Default / Placeholder">
          <TextField label="Company" placeholder="Placeholder text..." hint="This is a hint text to help user." />
        </Cell>
        <Cell caption="Filled">
          <TextField label="Company" defaultValue="Acme Inc." hint="This is a hint text to help user." />
        </Cell>
        <Cell caption="Error">
          <TextField label="Company" error placeholder="Placeholder text..." hint="This field is required." />
        </Cell>
        <Cell caption="Disabled">
          <TextField label="Company" disabled defaultValue="Acme Inc." hint="This is a hint text to help user." />
        </Cell>
        <Cell caption="Required + Optional tags">
          <TextField label="Company" required hint="This is a hint text to help user." />
        </Cell>
        <Cell caption="With label info tooltip">
          <TextField label="Company" optional labelInfo="Your registered business name" />
        </Cell>
      </Section>

      {/* 3. Sizes (Basic type) */}
      <Section title="Sizes — TextField (Basic)">
        <Cell caption="Medium (40)">
          <TextField label="Company" size="md" placeholder="Placeholder text..." />
        </Cell>
        <Cell caption="Small (36)">
          <TextField label="Company" size="sm" placeholder="Placeholder text..." />
        </Cell>
        <Cell caption="X-Small (32)">
          <TextField label="Company" size="xs" placeholder="Placeholder text..." />
        </Cell>
      </Section>

      {/* 4. Phone */}
      <Section title="Phone">
        <Cell caption="Default">
          <PhoneInput
            label="Phone Number"
            country={country}
            countries={MOCK_COUNTRIES}
            onCountryChange={setCountry}
            placeholder="(555) 000-0000"
            hint="Pick a country, then a number of the right length for it."
          />
        </Cell>
        <Cell caption="Error">
          <PhoneInput
            label="Phone Number"
            country={country}
            countries={MOCK_COUNTRIES}
            onCountryChange={setCountry}
            error
            hint="Enter a valid phone number."
          />
        </Cell>
        <Cell caption="Disabled">
          <PhoneInput
            label="Phone Number"
            country={country}
            countries={MOCK_COUNTRIES}
            disabled
            defaultValue="5550000000"
          />
        </Cell>
      </Section>

      {/* 5. Website */}
      <Section title="Website">
        <Cell caption="Default">
          <WebsiteInput label="Website" placeholder="www.example.com" hint="This is a hint text to help user." />
        </Cell>
        <Cell caption="Error">
          <WebsiteInput label="Website" error placeholder="www.example.com" hint="Enter a valid URL." />
        </Cell>
        <Cell caption="Disabled">
          <WebsiteInput label="Website" disabled defaultValue="www.example.com" />
        </Cell>
      </Section>

      {/* 6. Amount */}
      <Section title="Amount">
        <Cell caption="With currency picker">
          <AmountInput
            label="Amount"
            currency={currency}
            currencies={MOCK_CURRENCIES}
            onCurrencyChange={setCurrency}
            placeholder="0.00"
            hint="Only digits land here, grouped live as you type."
          />
        </Cell>
        <Cell caption="Without currency picker">
          <AmountInput
            label="Amount"
            currency={currency}
            currencies={MOCK_CURRENCIES}
            showCurrencyPicker={false}
            placeholder="0.00"
          />
        </Cell>
        <Cell caption="Error">
          <AmountInput
            label="Amount"
            currency={currency}
            currencies={MOCK_CURRENCIES}
            error
            hint="Amount exceeds available balance."
          />
        </Cell>
        <Cell caption="Disabled">
          <AmountInput
            label="Amount"
            currency={currency}
            currencies={MOCK_CURRENCIES}
            disabled
            defaultValue="50000"
          />
        </Cell>
      </Section>

      {/* 7. Search */}
      <Section title="Search">
        <Cell caption="Default">
          <SearchInput placeholder="Search..." />
        </Cell>
        <Cell caption="With shortcut badge">
          <SearchInput placeholder="Search..." shortcut="⌘1" />
        </Cell>
        <Cell caption="Disabled">
          <SearchInput placeholder="Search..." disabled />
        </Cell>
      </Section>

      {/* 8. Password */}
      <Section title="Password">
        <Cell caption="Default">
          <PasswordInput label="Password" placeholder="Enter password" hint="This is a hint text to help user." />
        </Cell>
        <Cell caption="With strength checklist">
          <PasswordInput label="Password" showStrength defaultValue="Passw0rd" />
        </Cell>
        <Cell caption="Error">
          <PasswordInput label="Password" error hint="Password is too weak." />
        </Cell>
        <Cell caption="Disabled">
          <PasswordInput label="Password" disabled defaultValue="password123" />
        </Cell>
      </Section>

      {/* 9. Link */}
      <Section title="Link (Figma 'Button' type)">
        <Cell caption="Default">
          <LinkInput label="Share Link" defaultValue="https://tushe.app/invite/abc123" />
        </Cell>
        <Cell caption="Error">
          <LinkInput label="Share Link" error hint="Could not generate link." />
        </Cell>
        <Cell caption="Disabled">
          <LinkInput label="Share Link" disabled defaultValue="https://tushe.app/invite/abc123" />
        </Cell>
      </Section>

      {/* 10. Invite */}
      <Section title="Invite (Figma 'Dropdown' type)">
        <Cell caption="Default">
          <InviteInput
            label="Invite Members"
            permission={permission}
            permissions={MOCK_PERMISSIONS}
            onPermissionChange={setPermission}
            placeholder="Enter email or name"
            hint="Pick an access level from the dropdown."
          />
        </Cell>
        <Cell caption="Error">
          <InviteInput
            label="Invite Members"
            permission={permission}
            permissions={MOCK_PERMISSIONS}
            onPermissionChange={setPermission}
            error
            hint="This person is already a member."
          />
        </Cell>
        <Cell caption="Disabled">
          <InviteInput
            label="Invite Members"
            permission={permission}
            permissions={MOCK_PERMISSIONS}
            disabled
            defaultValue="jane@company.com"
          />
        </Cell>
      </Section>
    </div>
  );
}
