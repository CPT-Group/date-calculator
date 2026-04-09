# 1. Project Intent / Mission
This tells the agent what “good” looks like in one shot.
# Date Calculator - Build Directive

## Mission
Build a reusable React date calculator with a page-first experience and a secondary widget mode.  
This should be production-ready, modular, and easy to expand.

The primary implementation target is a full page route.
The widget mode is a smaller wrapper around the same calculation engine.

## Primary Goal
Deliver a clean, maintainable, route-first date calculator using as many PrimeReact components as reasonably possible.

## Secondary Goal
Ensure the same calculator logic can be reused in compact widget contexts without duplicating business logic.

# 2. Non-Negotiables
This is probably the most important section for subagents.
## Non-Negotiables
- Use PrimeReact components wherever practical.
- Do not spend time on theming, color systems, spacing polish, or sizing decisions unless required for functionality.
- Prefer composition and reuse over duplicated logic.
- Keep business logic separate from presentation.
- Route/page mode is the primary experience.
- Widget mode must reuse the same core calculator engine.
- Handle timezone, UTC, DST, and leap-year concerns correctly.
- Prefer TypeScript-safe solutions.
- Avoid unnecessary abstraction.
- Keep the implementation KISS and easy to reason about.

# 3. Build Priorities

Agents do much better when you explicitly rank priorities.

## Build Priorities
1. Functional correctness
2. Reusable calculation engine
3. Clean route-first UX structure
4. PrimeReact-first implementation
5. Widget compatibility
6. Validation and edge-case handling
7. Tests for calendar/timezone correctness
8. Nice-to-have UX refinements

# 4. PrimeReact Guidance
https://primereact.org/
Since you specifically want heavy PrimeReact use, say it directly so the agent does not drift into raw HTML.
## PrimeReact Implementation Guidance
Use PrimeReact as the default UI layer wherever possible.

Prefer PrimeReact for:
- page structure containers
- cards / panels
- tabs or segmented navigation
- buttons
- inputs
- dropdowns
- toggles / checkboxes
- messages / validation states
- dividers
- field grouping
- loading states

Fallback to native HTML only when:
- PrimeReact has no practical equivalent
- accessibility or browser support would be worse
- the custom behavior is too specialized

# 5. Functional Scope

This gives agents a clean definition of v1.

## Functional Scope (V1)
The calculator must support:
- date difference between two dates
- add/subtract from a base date
- date-only mode
- date-time mode
- UTC option
- selected timezone option
- inclusive/exclusive counting option
- business-days option
- result summaries for days/weeks/hours where applicable
- clear validation messaging

The calculator should be designed so future support can be added for:
- presets
- holidays
- saved calculations
- shareable URLs
- localization

# 6. Architecture Rules
```
## Architecture Rules
- Create one core calculation engine separate from UI.
- Keep parsing, normalization, and date math outside visual components.
- Page mode and widget mode must share the same engine.
- Separate calculation modes clearly:
  - difference mode
  - add/subtract mode
- Separate date-only logic from date-time logic.
- Keep timezone handling centralized.
- Keep result formatting separate from calculation logic.
```

# 7. Expected Deliverables

Agents love explicit outputs.
```
## Expected Deliverables
Produce:
- reusable calculator component
- route/page wrapper
- widget wrapper
- supporting hooks/utilities if needed
- typed interfaces
- validation handling
- timezone-safe date utilities
- test coverage for critical edge cases
- concise implementation notes
```

# 8. Required Edge Cases / Test Matrix

This should absolutely live near the top because it prevents shallow implementations.

```
## Required Edge Cases
The implementation must account for and/or test:
- leap years
- Feb 28 -> Feb 29 transitions
- Feb 29 -> non-leap-year behavior
- year 2000 vs 2100 leap-year differences
- DST spring-forward transitions
- DST fall-back transitions
- UTC vs local timezone differences
- selected IANA timezone differences
- invalid or incomplete user input
- start date after end date
```

# 9. Definition of Done

This stops agents from “done-ish” output.
```
## Definition of Done
This work is complete when:
- the page mode works cleanly as a standalone route
- widget mode reuses the same logic successfully
- PrimeReact is used wherever practical
- timezone and UTC handling are implemented intentionally
- leap-year and DST edge cases are covered
- inputs and results are clearly validated and labeled
- the code is modular and easy to extend
- no duplicate calculation logic exists across modes
```

# 10. Optional “Agent Execution Notes”

Since you said another agent will break this into subtasks/subagents, I would absolutely include this.
```
## Agent Execution Notes
When decomposing this work:
- create subtasks by architecture layer, not random file grouping
- prioritize engine correctness before UI refinement
- do not over-focus on styling
- do not invent extra features outside V1 without clear value
- prefer incremental, testable implementation steps
- preserve a clean separation between logic, state, and presentation
```


So all in all to reiterate: 
# Date Calculator - Build Directive

## Mission
Build a reusable React date calculator with a page-first experience and a secondary widget mode.
The primary implementation target is a full route/page experience. Widget mode is a smaller wrapper around the same core logic.

## Non-Negotiables
- Use PrimeReact components wherever practical.
- Do not spend time on theme, color, spacing, or sizing decisions unless required for functionality.
- Keep business logic separate from presentation.
- Build one shared calculation engine for both page and widget modes.
- Treat date-only and date-time as separate calculation paths.
- Handle UTC, timezone, DST, and leap-year concerns intentionally.
- Keep the implementation simple, modular, and strongly typed.

## Build Priorities
1. Functional correctness
2. Reusable calculation engine
3. Route-first UX structure
4. PrimeReact-first implementation
5. Widget compatibility
6. Validation and edge-case handling
7. Tests for calendar/timezone correctness

## Functional Scope (V1)
- Days between two dates
- Add/subtract from a base date
- Date-only mode
- Date-time mode
- UTC option
- Selected timezone option
- Inclusive/exclusive counting
- Business-days option
- Clear result summaries
- Validation states

## Architecture Rules
- One core calculation engine
- One page shell
- One widget shell
- Shared logic, no duplicated calculation code
- Centralized timezone handling
- Separate formatting from math

## Required Edge Cases
- Leap years
- Feb 28 / Feb 29 handling
- 2000 vs 2100 behavior
- DST spring forward
- DST fall back
- UTC vs local differences
- IANA timezone differences
- Invalid inputs
- Reversed date ranges

## Definition of Done
- Works as standalone route
- Works as widget
- Uses PrimeReact heavily where practical
- Edge cases are handled intentionally
- Validation is clear
- Code is modular and extendable

A couple of similar React projects do exist on GitHub. One is a very simple react-date-calculator repo, basically a minimal React date calculator. Another, Smart-Date-Calculator, is closer to what you want: React-based, responsive, accessibility-minded, and built around future/past date calculations. That tells me your idea is common enough to validate, but there is still room to build a better, more production-ready version focused on route-first UX and timezone correctness.

For the implementation stack, I would not build this on raw Date math alone unless the feature is extremely basic. JavaScript Date stores an instant as milliseconds since the Unix epoch in UTC, but many getters/rendering methods work in the host’s local time zone, which is where “why did this shift by one day?” bugs usually come from. date-fns now has first-class timezone support, and @date-fns/tz provides TZDate / TZDateMini specifically so calculations can happen in a chosen IANA timezone instead of the browser timezone.

Timezone support matters a lot here because DST and regional rules can change the result of “add 1 day” or “difference between two datetimes.” The Temporal docs call out that time zone definitions map UTC ranges to offsets, and those offsets can change due to DST or political changes. Also, React DatePicker now supports a timeZone prop specifically for displaying/handling dates in a chosen timezone regardless of the user’s machine timezone, which is a good sign that this is a real-world requirement and not overengineering.

Leap-year support is another thing you absolutely want to treat as first-class. Temporal exposes inLeapYear, and its docs explicitly note that leap-year behavior is calendar-dependent. Even if you do not use Temporal directly in the browser, your calculator should still test cases like Feb 28/29, 2000 vs 2100, and cross-year differences.

My recommendation is this:

Build one core calculator engine.
Wrap it in a route/page shell and a widget shell.
Treat date-only and date-time as two separate calculation modes.
Let users explicitly choose:
Local browser time
UTC
Specific IANA timezone like America/New_York

A clean component shape would look like this:
```
type DateCalculatorMode = 'page' | 'widget';
type CalculationType = 'difference' | 'add-subtract';

interface DateCalculatorProps {
  mode?: DateCalculatorMode;
  defaultTimeZone?: string;
  allowTimeZoneSelect?: boolean;
  showTitle?: boolean;
}
```

For the UX, I’d make the page route the premium experience(remebr to use prime react as much as possible with priume react Ripple for things like buttons and abckground etc):

large title
segmented control for “Between Dates” vs “Add/Subtract”
optional time input
timezone selector
result summary card
edge-case notes like leap year / DST / inclusive vs exclusive count

Then the widget mode is the trimmed version:

same engine
fewer paddings
maybe no title
optional hidden timezone selector
compact result card

A good page layout would be:

Header: “Date Calculator”
Tabs:
Days Between
Add/Subtract Time
Inputs:
Start date
End date or amount/unit
Optional time
Timezone
Options:
Include end date
Business days only
Use UTC
Output:
Total days
Weeks + days
Exact hours/minutes if time is enabled
Notes for DST/leap-year crossings

Here is a solid starter component pattern for React with date-fns and @date-fns/tz:
```
import React, { useMemo, useState } from 'react';
import { differenceInCalendarDays, differenceInHours, addDays, addMonths, addYears } from 'date-fns';
import { TZDate } from '@date-fns/tz';

type Mode = 'page' | 'widget';
type CalcType = 'difference' | 'add-subtract';
type Unit = 'days' | 'months' | 'years';

interface DateCalculatorProps {
  mode?: Mode;
  defaultTimeZone?: string;
  allowTimeZoneSelect?: boolean;
  showTitle?: boolean;
}

const DEFAULT_TZ = 'UTC';

function toTZDate(dateString: string, timeString: string, timeZone: string): Date | null {
  if (!dateString) return null;

  const safeTime = timeString || '00:00';
  const isoLike = `${dateString}T${safeTime}:00`;

  const native = new Date(isoLike);
  if (Number.isNaN(native.getTime())) return null;

  const year = native.getFullYear();
  const month = native.getMonth();
  const day = native.getDate();
  const hours = native.getHours();
  const minutes = native.getMinutes();

  return new TZDate(year, month, day, hours, minutes, 0, timeZone);
}

export const DateCalculator: React.FC<DateCalculatorProps> = ({
  mode = 'page',
  defaultTimeZone = DEFAULT_TZ,
  allowTimeZoneSelect = true,
  showTitle = true,
}) => {
  const [calcType, setCalcType] = useState<CalcType>('difference');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('00:00');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('00:00');
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState<Unit>('days');
  const [timeZone, setTimeZone] = useState(defaultTimeZone);

  const result = useMemo(() => {
    const start = toTZDate(startDate, startTime, timeZone);
    if (!start) return null;

    if (calcType === 'difference') {
      const end = toTZDate(endDate, endTime, timeZone);
      if (!end) return null;

      return {
        type: 'difference' as const,
        calendarDays: differenceInCalendarDays(end, start),
        hours: differenceInHours(end, start),
      };
    }

    let calculated: Date = start;

    if (unit === 'days') calculated = addDays(start, amount);
    if (unit === 'months') calculated = addMonths(start, amount);
    if (unit === 'years') calculated = addYears(start, amount);

    return {
      type: 'add-subtract' as const,
      calculated,
    };
  }, [calcType, startDate, startTime, endDate, endTime, amount, unit, timeZone]);

  return (
    <section className={`date-calculator date-calculator--${mode}`}>
      {showTitle && <h1>{mode === 'page' ? 'Date Calculator' : 'Calculator'}</h1>}

      <div>
        <button type="button" onClick={() => setCalcType('difference')}>
          Days Between
        </button>
        <button type="button" onClick={() => setCalcType('add-subtract')}>
          Add / Subtract
        </button>
      </div>

      {allowTimeZoneSelect && (
        <div>
          <label htmlFor="timezone">Time zone</label>
          <input
            id="timezone"
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            placeholder="UTC or America/New_York"
          />
        </div>
      )}

      <div>
        <label htmlFor="start-date">Start date</label>
        <input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

        <label htmlFor="start-time">Start time</label>
        <input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </div>

      {calcType === 'difference' ? (
        <div>
          <label htmlFor="end-date">End date</label>
          <input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

          <label htmlFor="end-time">End time</label>
          <input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
      ) : (
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <label htmlFor="unit">Unit</label>
          <select id="unit" value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
            <option value="days">Days</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
      )}

      <div>
        <h2>Result</h2>

        {!result && <p>Enter valid values to calculate.</p>}

        {result?.type === 'difference' && (
          <>
            <p>Calendar days: {result.calendarDays}</p>
            <p>Hours difference: {result.hours}</p>
          </>
        )}

        {result?.type === 'add-subtract' && (
          <p>{result.calculated.toString()}</p>
        )}
      </div>
    </section>
  );
};
```

What I would improve before shipping:

Replace free-text timezone input with a dropdown.
Separate “date-only” and “date-time” logic more explicitly.
Add validation for invalid ranges.
Add clear labels like “calendar days” vs “exact elapsed hours.”
Add tests for:
Feb 28 → Feb 29
Feb 29 → next year
2000 and 2100
DST spring forward
DST fall back
UTC vs local vs selected timezone

Best practical stack for this:

date-fns
@date-fns/tz
optional timezone picker library like react-timezone-select if you want nice UX fast

My honest take: for a React app today, the sweet spot is date-fns + @date-fns/tz + a clean page/widget wrapper design. Temporal is conceptually better for this kind of domain, but MDN still marks it as limited availability, so I would not make native Temporal your main browser dependency unless you are comfortable with a polyfill strategy.

A strong feature set for v1 would be:

Days between two dates
Add/subtract days, months, years
Optional time-of-day inputs
UTC / local / chosen timezone
Business days toggle
Inclusive/exclusive toggle
Leap-year + DST-safe calculations
Page mode + widget mode from one component API