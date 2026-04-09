import { addDays, isWeekend } from 'date-fns';

export const countBusinessDays = (start: Date, end: Date, includeEndDate: boolean): number => {
  if (start.getTime() === end.getTime()) {
    return includeEndDate && !isWeekend(start) ? 1 : 0;
  }

  const isReversed = start.getTime() > end.getTime();
  const minDate = isReversed ? end : start;
  const maxDate = isReversed ? start : end;
  const boundaryDate = includeEndDate ? addDays(maxDate, 1) : maxDate;

  let cursor = minDate;
  let count = 0;

  while (cursor.getTime() < boundaryDate.getTime()) {
    if (!isWeekend(cursor)) {
      count += 1;
    }

    cursor = addDays(cursor, 1);
  }

  return isReversed ? -count : count;
};
