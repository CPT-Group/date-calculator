import type { AddSubtractResult, DifferenceResult, TimeZoneConfig } from '../types/dateCalculator.types';

import { getTimeZoneLabel } from './timezoneAdapter';

export const buildDifferenceNotes = (result: DifferenceResult, timezone: TimeZoneConfig): string[] => {
  const notes: string[] = [`Time zone context: ${getTimeZoneLabel(timezone)}.`];

  if (result.summary.isReversedRange) {
    notes.push('End date is earlier than start date; values are shown as negative.');
  }

  if (Math.abs(result.summary.totalHours) !== Math.abs(result.summary.calendarDays) * 24) {
    notes.push('Elapsed hours differ from calendar days x 24 due to DST or time-of-day boundaries.');
  }

  return notes;
};

export const buildAddSubtractNotes = (
  result: AddSubtractResult,
  timezone: TimeZoneConfig,
  unit: string,
): string[] => {
  const notes: string[] = [`Time zone context: ${getTimeZoneLabel(timezone)}.`];

  if (unit === 'months' || unit === 'years') {
    notes.push('Month/year arithmetic may clamp to month-end for shorter months.');
  }

  if (result.normalizedBase.getDate() !== result.summary.resultDate.getDate()) {
    notes.push('Day-of-month changed across the calculation boundary.');
  }

  return notes;
};
