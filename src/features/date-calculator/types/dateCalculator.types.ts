export type CalculatorViewMode = 'page' | 'widget';
export type CalculationType = 'difference' | 'add-subtract';
export type DateInputMode = 'date-only' | 'date-time';
export type TimeZoneMode = 'local' | 'utc' | 'iana';
export type AddSubtractOperation = 'add' | 'subtract';
export type AddSubtractUnit = 'days' | 'weeks' | 'months' | 'years';

export interface TimeZoneConfig {
  mode: TimeZoneMode;
  ianaTimeZone: string;
}

export interface DifferenceInput {
  start: Date;
  end: Date;
  inputMode: DateInputMode;
  timezone: TimeZoneConfig;
  includeEndDate: boolean;
  businessDaysOnly: boolean;
}

export interface AddSubtractInput {
  base: Date;
  amount: number;
  unit: AddSubtractUnit;
  operation: AddSubtractOperation;
  inputMode: DateInputMode;
  timezone: TimeZoneConfig;
}

export interface DifferenceComputation {
  calendarDays: number;
  businessDays: number;
  totalMinutes: number;
  totalHours: number;
  totalWeeks: number;
  isReversedRange: boolean;
}

export interface AddSubtractComputation {
  resultDate: Date;
}

export interface DifferenceResult {
  kind: 'difference';
  summary: DifferenceComputation;
  notes: string[];
  normalizedStart: Date;
  normalizedEnd: Date;
}

export interface AddSubtractResult {
  kind: 'add-subtract';
  summary: AddSubtractComputation;
  notes: string[];
  normalizedBase: Date;
}

export type CalculatorEngineResult = DifferenceResult | AddSubtractResult;

export interface ValidationIssue {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export interface DateCalculatorFormState {
  calculationType: CalculationType;
  inputMode: DateInputMode;
  timezoneMode: TimeZoneMode;
  ianaTimeZone: string;
  includeEndDate: boolean;
  businessDaysOnly: boolean;
  startDate: Date | null;
  endDate: Date | null;
  baseDate: Date | null;
  amount: number;
  operation: AddSubtractOperation;
  unit: AddSubtractUnit;
}
