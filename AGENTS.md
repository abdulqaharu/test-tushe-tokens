# AGENTS.md — Tushe UI Sandbox

This repo is a standalone sandbox for building and visually testing Tushe design
system UI against the real `@tushe-abdulqahar/tokens` package before anything
gets ported into the main Tushe product repo (the Nx monorepo, `@finstack/*`
package scope, NestJS API + worker apps). Nothing here ships directly — it's
where components get built, checked against Figma, and proven out against the
token pipeline first. `CLAUDE.md` in this repo already points here (`@AGENTS.md`),
so Claude Code picks this up automatically.

The input-fields work below is the current effort within this sandbox, not the
whole point of the repo — expect other component sets to move through the same
build-here-then-port-later pattern over time.

Source of truth for the input-fields effort specifically: Figma file
`lbqA08oyPYIx2fD4TPNTwu`, node `4702:4840` ("Prime Text Input [1.0]").

## Current status — input-fields effort

The input-fields showcase (component set + preview page) is built. Next step:
wire `app/input-fields/page.tsx` and `components/ui/input-fields/` into the main
preview canvas (`components/preview-canvas.tsx`) rather than leaving it as a
separate standalone page — see "The actual open task" below for the specific
first move (the Company field in `column-one.tsx`).

## Repo facts (verified against the actual repo, not assumed)

- Next.js 16.3.5, React 19.2.8, Tailwind v4 (`@tailwindcss/postcss`) — new enough
  that training-data assumptions about older Next/Tailwind conventions may not hold.
- shadcn is initialized (`components.json`): style `base-nova`, base color `neutral`,
  CSS variables on, aliases `@/components`, `@/lib`, `@/components/ui`, `@/hooks`.
- `components.json` says `"iconLibrary": "lucide"` but that's stale/unused — the
  actual icon set in use is **Phosphor** (`@phosphor-icons/react`), confirmed by
  the user directly and by every existing component (`column-one.tsx`, etc.)
  importing from it. `lucide-react` is only used in the shadcn-generated
  `components/ui/checkbox.tsx`. Don't "fix" the icon imports toward lucide.
- `lib/utils.ts` already exists with the standard `cn()` (clsx + tailwind-merge).
  Don't recreate it.
- All required deps are already in `package.json` — no install step needed:
  `class-variance-authority`, `clsx`, `tailwind-merge`, `@phosphor-icons/react`,
  `@tushe-abdulqahar/tokens`. (Note: `package.json` also lists a package literally
  named `"cn"` as a dependency — that's not the same as the local `cn()` util in
  `lib/utils.ts`; keep importing from `@/lib/utils`, not from the `cn` package.)
- Token wiring is real and already in `app/globals.css`:
  ```css
  @import "tailwindcss";
  @import "@tushe-abdulqahar/tokens/tokens.css";
  @import "@tushe-abdulqahar/tokens/theme-map.css";
  @import "@tushe-abdulqahar/tokens/utilities.css";
  ```
  (the actual import order/spelling is in the file — check it directly, don't
  retype from memory.)

## Files already built and in place

```
components/ui/input-fields/input.tsx          — base primitive (cva variants: size, state)
components/ui/input-fields/text-field.tsx     — label + input + hint; `type` prop covers
                                                  icon-swap-only variants: basic, email,
                                                  date, emoji, card
components/ui/input-fields/field-label.tsx    — shared label row
components/ui/input-fields/field-hint.tsx     — shared hint row
components/ui/input-fields/phone-input.tsx    — country code dropdown + input
components/ui/input-fields/website-input.tsx  — fixed "https://" prefix + input
components/ui/input-fields/amount-input.tsx   — currency symbol + input + currency picker
                                                  (white/bordered surface, NOT bg-input-subtle
                                                  — that's the Figma spec, not a bug)
components/ui/input-fields/search-input.tsx   — magnifying glass + optional shortcut badge
components/ui/input-fields/password-input.tsx — lock icon + working show/hide toggle +
                                                  optional live strength checklist
components/ui/input-fields/link-input.tsx     — Figma calls this "🔘 Button" but it's a
                                                  link field with copy-to-clipboard
components/ui/input-fields/invite-input.tsx   — Figma calls this "🔽 Dropdown" but it's an
                                                  invite field with an inline permission
                                                  picker (not a generic select)
lib/mock-data.ts                              — MOCK_COUNTRIES, MOCK_CURRENCIES,
                                                  MOCK_PERMISSIONS + DEFAULT_* exports
app/input-fields/page.tsx                     — visual QA page for every type/state/size
                                                  of the components above
```

Note the two separate preview pages, don't conflate them:
- `app/preview/page.tsx` → renders `<PreviewCanvas />` (`components/preview-canvas.tsx`)
  — this is the original token/component canvas (Company, State, Price, dialogs, etc.)
  hosted at test-tushe-tokens.vercel.app/preview.
- `app/input-fields/page.tsx` → the new one, just for the input-field variants above.

## The actual open task

`components/column-one.tsx` still has the original raw HTML `<input>` for the
Company field (the thing this whole effort started from):

```tsx
<input
  placeholder="Paystack"
  className="bg-input-subtle text-surface-bold h-9 w-full rounded-lg px-2.5 py-2 text-sm font-medium outline-none placeholder:text-surface-faint"
/>
```

This should become a `<TextField type="basic" label="Company" placeholder="Paystack" hint="We wont share your email" />`
from `components/ui/input-fields/text-field.tsx`. Check `components/file-upload-card.tsx`
and `components/accent-picker.tsx` too — both still have raw `<input>` elements
(grep confirmed) that weren't in scope for this effort but may be worth the same
treatment.

`components/select-field.tsx` (used for the State field, via `MOCK_STATES`) is a
separate pre-existing custom Popover-based select — not part of the input-fields
set above and not something to merge with it.

## Token rules — read before touching any styling

- **Never write raw `var(--...)` arbitrary values or hex codes.** Use the real
  `@tushe-abdulqahar/tokens` utility classes: `bg-input-subtle`, `text-surface-muted`,
  `text-negative-bold`, `icon-surface-faint`, `ring-brand`, `border-input-faint`, etc.
  Getting this wrong once already cost a rebuild in this component set — check
  `node_modules/@tushe-abdulqahar/tokens/utilities.css` for the exact utility name
  before inventing one.
- Category pattern: `{bg,text,icon,border}-{surface|input|state-name}-{bold|subtle|
  muted|faint|...}`. Focus rings are `ring-brand` / `ring-negative` / `ring-neutral`
  / `ring-warning` / `ring-success` (sets `--tw-ring-color`, pair with Tailwind's
  `ring-2 ring-offset-2`).
- Semantic layers in Figma: Semantics-Surface, Semantics-State, Radius, Neutral,
  Theme (5 variable collections). Alias resolution is two hops: Semantics → Neutral
  → Primitives — don't assume single-hop.
- When bulk-editing tokens in Figma: filter strictly by namespace (`background/*`
  vs `text/*` vs `icon/*` vs `border/*` often share primitive IDs).

## Confirmed Figma links and component keys

- Tushe Design System file (component set, tokens):
  `https://www.figma.com/design/lbqA08oyPYIx2fD4TPNTwu/Tushe-Design-System?node-id=4645-9&p=f&t=jPVEdIsfOVsk9EIH-0`
- PreviewCanvas source frame — `components/preview-canvas.tsx` and its
  column-one/two/three children were hand-built from this frame:
  `https://www.figma.com/design/0rwH2an54pVdaOa8lXMf0v/Tushe-v0.01?node-id=987-88319&t=u77Kqfv397w46ITI-4`
- Text Input component key (for `figma.importComponentByKeyAsync` etc.):
  `45076495c471a04e360aff1f442525f14ba885ef`
- Button component key: `7a2161e31255fdd18565883a5bdd02335d4f6e46`
- Link Button component key: `f6368bd1b0a9d64e52e10c4e0231c209781f6447`
- Button instance node ID `239:9256` — use `figma.getNodeByIdAsync` then
  `.createInstance()`; `importComponentByKeyAsync` fails for this one.

## Not yet wired (open work on the input-fields set itself)

- `PhoneInput`, `AmountInput`, `InviteInput` accept `on*PickerOpen` callbacks but
  have no real dropdown/sheet behind them — the preview page just cycles mock
  data on click for visual purposes.
- Flag images in `lib/mock-data.ts` load from `flagcdn.com` (external CDN) — fine
  for dev QA, swap before shipping to production if that's not acceptable.
- Card type's left icon is Phosphor's `CreditCard` as a stand-in — Figma's actual
  asset is a decorative multi-layer graphic, not a simple icon. Revisit if pixel
  parity matters for that one.

## Porting to the main repo (later, not yet scoped)

Once a component set here is validated, it moves into the main Tushe repo
(Nx monorepo, `@finstack/*` scope). The exact destination package/path for the
input-fields set hasn't been decided yet — don't guess one. When that move
happens, treat it as a new task with its own discussion, not an automatic
next step from finishing work in this sandbox.

## Working principles for this project (apply throughout)

- Build ahead, reconcile later: design specs lead engineering, don't wait for
  formal API/PRD confirmation to move forward.
- No placeholder shipping: don't ship a feature that can't be fully resolved
  (e.g. don't fake a working dropdown — leave it as an open callback like above).
- Figma is the single source of truth for tokens. Never hand-edit a token value
  outside Figma; everything downstream regenerates from `tokens.json`.
- Discuss and get explicit go-ahead before starting a build when a technical
  discussion surfaces a new option — don't build unprompted.
- No em dashes in any written output (docs, comments, commit messages, etc.).