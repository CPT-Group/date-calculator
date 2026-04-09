import { addDays, differenceInCalendarDays, differenceInMinutes } from 'date-fns';

import { countBusinessDays } from './businessDays';

import type { DifferenceComputation } from '../types/dateCalculator.types';
import type { NormalizedDifferenceInput } from './normalizeInput';

export const calculateDifference = (input: NormalizedDifferenceInput): DifferenceComputation => {
  const isReversedRange = input.start.getTime() > input.end.getTime();
  const orderedStart = isReversedRange ? input.end : input.start;
  const orderedEnd = isReversedRange ? input.start : input.end;

  const endForCalendar = input.includeEndDate ? addDays(orderedEnd, 1) : orderedEnd;

  const calendarDaysRaw = differenceInCalendarDays(endForCalendar, orderedStart);
  const totalMinutesRaw = differenceInMinutes(orderedEnd, orderedStart);
  const businessDaysRaw = countBusinessDays(orderedStart, orderedEnd, input.includeEndDate);

  const sign = isReversedRange ? -1 : 1;

  return {
    calendarDays: calendarDaysRaw * sign,
    businessDays: businessDaysRaw * sign,
    totalMinutes: totalMinutesRaw * sign,
    totalHours: (totalMinutesRaw / 60) * sign,
    totalWeeks: (calendarDaysRaw / 7) * sign,
    isReversedRange,
  };
};
