import { TZDate } from '@date-fns/tz';

import type { DateInputMode, TimeZoneConfig } from '../types/dateCalculator.types';

const DATE_ONLY_TIME = {
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0,
};

const extractDateParts = (value: Date) => {
  return {
    year: value.getFullYear(),
    month: value.getMonth(),
    day: value.getDate(),
    hour: value.getHours(),
    minute: value.getMinutes(),
    second: value.getSeconds(),
    millisecond: value.getMilliseconds(),
  };
};

export const normalizeToConfiguredTimeZone = (
  value: Date,
  timezone: TimeZoneConfig,
  inputMode: DateInputMode,
): Date => {
  const dateParts = extractDateParts(value);
  const timeParts =
    inputMode === 'date-only'
      ? DATE_ONLY_TIME
      : {
          hour: dateParts.hour,
          minute: dateParts.minute,
          second: dateParts.second,
          millisecond: dateParts.millisecond,
        };

  if (timezone.mode === 'local') {
    return new Date(
      dateParts.year,
      dateParts.month,
      dateParts.day,
      timeParts.hour,
      timeParts.minute,
      timeParts.second,
      timeParts.millisecond,
    );
  }

  if (timezone.mode === 'utc') {
    return TZDate.tz(
      'UTC',
      dateParts.year,
      dateParts.month,
      dateParts.day,
      timeParts.hour,
      timeParts.minute,
      timeParts.second,
      timeParts.millisecond,
    );
  }

  return TZDate.tz(
    timezone.ianaTimeZone,
    dateParts.year,
    dateParts.month,
    dateParts.day,
    timeParts.hour,
    timeParts.minute,
    timeParts.second,
    timeParts.millisecond,
  );
};

export const getTimeZoneLabel = (timezone: TimeZoneConfig): string => {
  if (timezone.mode === 'local') {
    return 'Local Time';
  }

  if (timezone.mode === 'utc') {
    return 'UTC';
  }

  return timezone.ianaTimeZone;
};
