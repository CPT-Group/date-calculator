'use client';

import { useMemo, useState } from 'react';

import { runAddSubtractCalculation, runDifferenceCalculation } from '../engine/dateCalculatorEngine';
import type {
  AddSubtractInput,
  AddSubtractOperation,
  AddSubtractUnit,
  CalculatorEngineResult,
  CalculationType,
  DateCalculatorFormState,
  DateInputMode,
  TimeZoneMode,
  ValidationIssue,
} from '../types/dateCalculator.types';
import { validateAddSubtractInput, validateDifferenceInput } from '../validation/dateCalculatorValidation';

const DEFAULT_IANA_ZONE = 'America/New_York';

export const DEFAULT_FORM_STATE: DateCalculatorFormState = {
  calculationType: 'difference',
  inputMode: 'date-only',
  timezoneMode: 'local',
  ianaTimeZone: DEFAULT_IANA_ZONE,
  includeEndDate: false,
  businessDaysOnly: false,
  startDate: null,
  endDate: null,
  baseDate: null,
  amount: 1,
  operation: 'add',
  unit: 'days',
};

const clampDateByInputMode = (date: Date, inputMode: DateInputMode): Date => {
  if (inputMode === 'date-time') {
    return date;
  }

  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
};

interface DateCalculatorState {
  form: DateCalculatorFormState;
  setCalculationType: (value: CalculationType) => void;
  setInputMode: (value: DateInputMode) => void;
  setTimezoneMode: (value: TimeZoneMode) => void;
  setIanaTimeZone: (value: string) => void;
  setIncludeEndDate: (value: boolean) => void;
  setBusinessDaysOnly: (value: boolean) => void;
  setStartDate: (value: Date | null) => void;
  setEndDate: (value: Date | null) => void;
  setBaseDate: (value: Date | null) => void;
  setAmount: (value: number) => void;
  setOperation: (value: AddSubtractOperation) => void;
  setUnit: (value: AddSubtractUnit) => void;
  validationIssues: ValidationIssue[];
  result: CalculatorEngineResult | null;
}

export const useDateCalculatorState = (initialState?: Partial<DateCalculatorFormState>): DateCalculatorState => {
  const [form, setForm] = useState<DateCalculatorFormState>({
    ...DEFAULT_FORM_STATE,
    ...initialState,
  });

  const validationIssues = useMemo<ValidationIssue[]>(() => {
    if (form.calculationType === 'difference') {
      const validation = validateDifferenceInput({
        start: form.startDate ?? undefined,
        end: form.endDate ?? undefined,
        inputMode: form.inputMode,
        timezone: {
          mode: form.timezoneMode,
          ianaTimeZone: form.ianaTimeZone,
        },
        includeEndDate: form.includeEndDate,
        businessDaysOnly: form.businessDaysOnly,
      });
      return validation.issues;
    }

    const validation = validateAddSubtractInput({
      base: form.baseDate ?? undefined,
      amount: form.amount,
      operation: form.operation,
      unit: form.unit,
      inputMode: form.inputMode,
      timezone: {
        mode: form.timezoneMode,
        ianaTimeZone: form.ianaTimeZone,
      },
    });

    return validation.issues;
  }, [form]);

  const result = useMemo<CalculatorEngineResult | null>(() => {
    if (validationIssues.length > 0) {
      return null;
    }

    if (form.calculationType === 'difference' && form.startDate && form.endDate) {
      return runDifferenceCalculation({
        start: clampDateByInputMode(form.startDate, form.inputMode),
        end: clampDateByInputMode(form.endDate, form.inputMode),
        inputMode: form.inputMode,
        timezone: {
          mode: form.timezoneMode,
          ianaTimeZone: form.ianaTimeZone,
        },
        includeEndDate: form.includeEndDate,
        businessDaysOnly: form.businessDaysOnly,
      });
    }

    if (form.calculationType === 'add-subtract' && form.baseDate) {
      const input: AddSubtractInput = {
        base: clampDateByInputMode(form.baseDate, form.inputMode),
        amount: form.amount,
        operation: form.operation,
        unit: form.unit,
        inputMode: form.inputMode,
        timezone: {
          mode: form.timezoneMode,
          ianaTimeZone: form.ianaTimeZone,
        },
      };

      return runAddSubtractCalculation(input);
    }

    return null;
  }, [form, validationIssues]);

  return {
    form,
    setCalculationType: (value) => setForm((current) => ({ ...current, calculationType: value })),
    setInputMode: (value) => setForm((current) => ({ ...current, inputMode: value })),
    setTimezoneMode: (value) => setForm((current) => ({ ...current, timezoneMode: value })),
    setIanaTimeZone: (value) => setForm((current) => ({ ...current, ianaTimeZone: value })),
    setIncludeEndDate: (value) => setForm((current) => ({ ...current, includeEndDate: value })),
    setBusinessDaysOnly: (value) => setForm((current) => ({ ...current, businessDaysOnly: value })),
    setStartDate: (value) => setForm((current) => ({ ...current, startDate: value })),
    setEndDate: (value) => setForm((current) => ({ ...current, endDate: value })),
    setBaseDate: (value) => setForm((current) => ({ ...current, baseDate: value })),
    setAmount: (value) => setForm((current) => ({ ...current, amount: value })),
    setOperation: (value) => setForm((current) => ({ ...current, operation: value })),
    setUnit: (value) => setForm((current) => ({ ...current, unit: value })),
    validationIssues,
    result,
  };
};
