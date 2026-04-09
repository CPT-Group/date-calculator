# Changelog

## 0.1.14 - 2026-04-09

- Restored **PrimeReact Lara Dark Blue** theme import — it provides all structural styling (padding, font-size, border-radius, transitions) that components rely on.
- Our `data-theme` tokens + `primereact-overrides.scss` still remap all colors; added `--surface-overlay` and `--highlight-*` variables to each theme so Lara's portaled panels and selection highlights always track the active theme.
- Added uniform icon–text spacing to inline messages (`gap: 0.5rem`, `margin-right: 0.5rem` on `.p-inline-message-icon`).

## 0.1.13 - 2026-04-09

- Removed global PrimeReact Lara Dark Blue theme import from `layout.tsx` (reverted in 0.1.14).
- Expanded **dropdown / multiselect overlay** overrides (panel, header, filter row, items, highlight, hover, focus, group labels, empty state) so portaled panels match the active theme.

## 0.1.12 - 2026-04-09

- Copy actions on result rows now open a PrimeReact **Toast** with summary “Copied” and the copied string in the detail (errors still toast with “Copy failed”).
- Added toast styling hooks in `primereact-overrides` so notifications follow theme tokens.

## 0.1.11 - 2026-04-09

- Theme system: added `--field-*` and inline-message tokens per theme, `color-scheme` on `html`, and expanded `primereact-overrides` so inputs, dropdowns, calendars, checkboxes, select buttons, overlays, and PrimeIcons track the active theme (fixes dark controls on light themes and low-contrast info messages).
- Theme switcher: dialog closes automatically after a theme is chosen; strengthened styles for the dialog close control so the SVG uses `currentColor` and matches `--text-color` (fixes invisible X on light dialogs).

## 0.1.10 - 2026-04-09

- Declared `@date-fns/tz` in `dependencies` so production installs (including Netlify) resolve `TZDate` imports; the package was used in code but missing from `package.json`, which broke `next build` on clean CI.
- Jira **NOVA-1393**: refreshed description, Acceptance Criteria, and Refinement Notes from `code-plan.md` (baseline scope, architecture, priorities, and edge-case matrix).

## 0.1.9 - 2026-04-08

- Added CPT brand icon assets (`favicon.svg`, `CPTGroupLogo.svg`) sourced from existing CPT app branding.
- Updated app metadata for `CPT Date Calculator` including title template, publisher/author fields, Open Graph basics, and icon declarations.
- Added `metadataBase` support with `NEXT_PUBLIC_SITE_URL` fallback to the Netlify site URL for cleaner hosted metadata behavior.

## 0.1.8 - 2026-04-08

- Added copy-to-clipboard controls for key result sections.
- Difference mode now supports copying **Start**, **End**, and combined **Range** values.
- Add/Subtract mode now supports copying **Base**, **Calculated date**, and combined **Range** values.

## 0.1.7 - 2026-04-08

- Moved the theme switcher into the calculator card header, aligned opposite the Date Calculator heading.
- Reworked timezone UX to a single PrimeReact grouped dropdown (Local Time, UTC, and searchable IANA zones) for a cleaner flow.
- Removed the extra collaboration timezone section to keep the form focused and reduce user setup overhead.

## 0.1.6 - 2026-04-08

- Added collaboration timezone support with separate **Your time zone** and **Target time zone** selectors.
- Expanded timezone options to a large searchable IANA list (with runtime-supported zones and fallback list).
- Added side-by-side converted timestamp output for start/end (difference mode) and base/result (add/subtract mode) to support cross-timezone coordination.

## 0.1.5 - 2026-04-08

- Refined the Date Calculator page UI to a cleaner, more professional layout with clearer visual hierarchy.
- Updated mode selectors to an inline, labeled arrangement with responsive behavior for smaller screens.
- Consolidated validation into a single bottom-form guidance message to avoid stacked repetitive error blocks.
- Improved results presentation with cleaner labels and spacing for easier scanning.

## 0.1.4 - 2026-04-08

- Updated the home route to show only the primary Date Calculator page mode.
- Removed the widget preview section from the main route so current iteration is focused on page-mode UX.

## 0.1.3 - 2026-04-08

- Implemented Date Calculator V1 with a route-first page and a shared widget mode wrapper.
- Added a typed, reusable calculation engine with separated normalization, timezone, difference, add/subtract, and formatting layers.
- Added centralized validation logic for required fields and invalid inputs.
- Added PrimeReact-first calculator UI with mode tabs, timezone options, include-end-date/business-day toggles, and structured result summaries.
- Added timezone-safe support via `@date-fns/tz` for UTC and selected IANA zone behavior.
- Added Vitest + Testing Library test setup and critical edge-case tests covering leap year, DST transitions, UTC/IANA differences, and reversed/invalid ranges.

## 0.1.2 - 2026-04-08

- Relaxed global CSS reset to preserve PrimeReact default control padding and sizing.
- Updated the theme switcher `SelectButton` to explicit `optionLabel` and `optionValue` config.
- Removed custom `SelectButton` width override so the control follows PrimeReact default spacing behavior.

## 0.1.1 - 2026-04-08

- Scaffolded a new Next.js + TypeScript app in-place for this repository.
- Added PrimeReact-based theming foundation with providers, SCSS theme files, and dark-synth default.
- Added a minimal home page shell with a centered Hello World and a modal-based theme switcher.
- Removed default starter/Vercel scaffold content from the app shell and docs.
