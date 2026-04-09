const FALLBACK_TIME_ZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Phoenix',
  'America/Toronto',
  'America/Vancouver',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Madrid',
  'Europe/Rome',
  'Europe/Warsaw',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Asia/Seoul',
  'Asia/Hong_Kong',
  'Australia/Sydney',
  'Australia/Melbourne',
  'Pacific/Auckland',
];

export interface TimeZoneOption {
  label: string;
  value: string;
}

const getSupportedTimeZones = (): string[] => {
  if (typeof Intl !== 'undefined' && 'supportedValuesOf' in Intl) {
    return (Intl.supportedValuesOf('timeZone') as string[]).slice();
  }

  return FALLBACK_TIME_ZONES;
};

export const getTimeZoneOptions = (): TimeZoneOption[] => {
  return getSupportedTimeZones()
    .slice()
    .sort((a, b) => a.localeCompare(b))
    .map((zone) => ({ label: zone, value: zone }));
};

export const getBrowserTimeZone = (): string => {
  if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  }

  return 'UTC';
};
