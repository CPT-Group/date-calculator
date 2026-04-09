import { describe, expect, it } from 'vitest';

import { runAddSubtractCalculation, runDifferenceCalculation } from './dateCalculatorEngine';
import { validateDifferenceInput } from '../validation/dateCalculatorValidation';

describe('dateCalculatorEngine', () => {
  it('handles leap-year day differences', () => {
    const result = runDifferenceCalculation({
      start: new Date(2024, 1, 28),
      end: new Date(2024, 1, 29),
      inputMode: 'date-only',
      timezone: { mode: 'local', ianaTimeZone: 'America/New_York' },
      includeEndDate: false,
      businessDaysOnly: false,
    });

    expect(result.summary.calendarDays).toBe(1);
  });

  it('handles february transition for add years from leap date', () => {
    const result = runAddSubtractCalculation({
      base: new Date(2024, 1, 29),
      amount: 1,
      unit: 'years',
      operation: 'add',
      inputMode: 'date-only',
      timezone: { mode: 'local', ianaTimeZone: 'America/New_York' },
    });

    expect(result.summary.resultDate.getFullYear()).toBe(2025);
    expect(result.summary.resultDate.getMonth()).toBe(1);
    expect(result.summary.resultDate.getDate()).toBe(28);
  });

  it('distinguishes leap behavior for year 2000 and 2100', () => {
    const year2000 = runDifferenceCalculation({
      start: new Date(2000, 1, 28),
      end: new Date(2000, 2, 1),
      inputMode: 'date-only',
      timezone: { mode: 'utc', ianaTimeZone: 'America/New_York' },
      includeEndDate: false,
      businessDaysOnly: false,
    });

    const year2100 = runDifferenceCalculation({
      start: new Date(2100, 1, 28),
      end: new Date(2100, 2, 1),
      inputMode: 'date-only',
      timezone: { mode: 'utc', ianaTimeZone: 'America/New_York' },
      includeEndDate: false,
      businessDaysOnly: false,
    });

    expect(year2000.summary.calendarDays).toBe(2);
    expect(year2100.summary.calendarDays).toBe(1);
  });

  it('captures DST spring-forward elapsed-hour difference', () => {
    const result = runDifferenceCalculation({
      start: new Date(2025, 2, 9, 1, 0),
      end: new Date(2025, 2, 9, 3, 0),
      inputMode: 'date-time',
      timezone: { mode: 'iana', ianaTimeZone: 'America/New_York' },
      includeEndDate: false,
      businessDaysOnly: false,
    });

    expect(result.summary.totalHours).toBe(1);
  });

  it('captures DST fall-back elapsed-hour difference', () => {
    const result = runDifferenceCalculation({
      start: new Date(2025, 10, 2, 0, 30),
      end: new Date(2025, 10, 2, 2, 30),
      inputMode: 'date-time',
      timezone: { mode: 'iana', ianaTimeZone: 'America/New_York' },
      includeEndDate: false,
      businessDaysOnly: false,
    });

    expect(result.summary.totalHours).toBe(3);
  });

  it('shows UTC vs IANA differences around DST boundaries', () => {
    const utcResult = runDifferenceCalculation({
      start: new Date(2025, 2, 9, 0, 30),
      end: new Date(2025, 2, 10, 0, 30),
      inputMode: 'date-time',
      timezone: { mode: 'utc', ianaTimeZone: 'America/New_York' },
      includeEndDate: false,
      businessDaysOnly: false,
    });

    const ianaResult = runDifferenceCalculation({
      start: new Date(2025, 2, 9, 0, 30),
      end: new Date(2025, 2, 10, 0, 30),
      inputMode: 'date-time',
      timezone: { mode: 'iana', ianaTimeZone: 'America/New_York' },
      includeEndDate: false,
      businessDaysOnly: false,
    });

    expect(utcResult.summary.totalHours).toBe(24);
    expect(ianaResult.summary.totalHours).toBe(23);
  });

  it('supports reversed ranges and returns negative values', () => {
    const result = runDifferenceCalculation({
      start: new Date(2026, 0, 10),
      end: new Date(2026, 0, 1),
      inputMode: 'date-only',
      timezone: { mode: 'local', ianaTimeZone: 'America/New_York' },
      includeEndDate: false,
      businessDaysOnly: false,
    });

    expect(result.summary.isReversedRange).toBe(true);
    expect(result.summary.calendarDays).toBe(-9);
  });

  it('returns validation errors for missing fields', () => {
    const validation = validateDifferenceInput({
      end: new Date(2025, 0, 1),
    });

    expect(validation.valid).toBe(false);
    expect(validation.issues.some((issue) => issue.field === 'start')).toBe(true);
  });
});
