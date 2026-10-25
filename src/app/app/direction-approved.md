# Lucen app foundation

## Phase 1: approved Figma Home

Home now follows Figma file `mF8BBIbh7fXM94ANOVyyTl`, node `35:104`:
Sora, white/black neutrals, orange/blue/gray summaries, and floating navigation.
`home.css` and `home-components.tsx` contain the app-scoped shared design system.
Device status and gesture bars are omitted; safe-area insets come from the device.

Home, Expenses, Recurring, and Account are implemented. The existing voice dialog remains available below
the Home content. Add expense is a front-end-only preview.
`sample-data.ts` is unchanged: lunch remains 23 Oct (Figma says 24 Oct), and the
Figma-only music transaction of ₹399 has not been added. White text on the
approved gradients has insufficient contrast; the brand colors are preserved
pending a separate accessibility decision. The install icon is still the earlier
olive icon, pending an approved replacement.

## Phase 2, Step 1: Expenses

`/app/expenses/` follows approved Figma node `35:105`, reusing the Home header,
navigation, expense rows, colors, spacing, and typography. Home remains selected
in the navigation, and Home's See all link opens this route.

The existing two transaction records, dates, categories, and amounts are unchanged.
The missing Figma music record is not invented. The category totals (₹25,530,
₹10,638, ₹6,382) are explicitly sourced from Figma and labelled as illustrative
monthly aggregates, separate from those two records. They total the existing
₹42,550 monthly expenses; bar proportions are calculated from those amounts.

## Recurring

`/app/recurring/` follows approved Figma node `35:106`. The header bell, Home
summary, and Recurring tab open this route. It reuses the summary, row, spacing,
and color components; the active orange history icon is exported from Figma.
The existing obligations total ₹14,500 with unchanged amounts and due dates.
Housing/Utilities labels come from Figma; relative day counts are calculated
against the fixed 24 October 2026 sample snapshot, which is labelled on screen.
Voice remains a preview; Add does not save transactions. The approved blue
summary's previously reported white-text contrast concern is unchanged.

## Account

`/app/account/` follows approved Figma node `35:107`. Its shared navigation tab
opens the route and uses the verified orange active Account icon. The sample Om
profile is explicitly labelled, and all financial values come from unchanged
`sample-data.ts`: balance ₹82,450, income ₹95,000, expenses ₹42,550, upcoming
obligations ₹14,500, and projected balance ₹59,950. The existing expandable
forecast calculation remains accessible below the approved screen content.
No authentication, account connection, or recording flow is added.

## Add Expense and linked voice preview

`/app/add/` follows approved Figma node `35:108`; `/app/add/voice/` follows
node `47:572`. The shared + button opens Add from all four existing app screens.
The full orange gradient and keypad reuse the app's design tokens and Sora.
The initial ₹250 is Figma's example, not a financial record. Numeric input replaces
that example, supports up to nine integer digits and two decimals, and supports
backspace/Delete. Plus/Minus select the local draft type. Draft state is held only
in a React context while navigating the Add/voice area; no storage or API is used.
Back opens Home, voice opens the static illustrative preview, and Continue opens
Expenses without saving, matching the prototype connection. Zero amounts receive
front-end validation. The existing Home voice dialog remains unchanged.
Approved orange/white text contrast limitations remain unresolved.

## Original foundation context

The user selected Quiet Luxury earlier in this conversation and explicitly reaffirmed:
“Follow the established Quiet Luxury direction: warm ivory, oatmeal, charcoal,
muted olive, editorial headings, and readable financial figures.”

This implements that approved direction rather than opening a new design exploration.
The existing Next.js application is the implementation environment; no separate
prototype framework is introduced. Sample figures and the dialog interaction reuse
the `/dashboard` reference patterns without changing its files.

The app has its own layout, scoped `la-*` styles, and manifest metadata link.
Georgia supplies editorial headings without a new remote font dependency.
This step does not implement persistence, microphone access, AI, service workers,
offline caching, or a complete installation flow.
