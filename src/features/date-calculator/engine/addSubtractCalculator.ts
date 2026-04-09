import { addDays, addMonths, addWeeks, addYears } from 'date-fns';

import type { AddSubtractComputation, AddSubtractUnit } from '../types/dateCalculator.types';
import type { NormalizedAddSubtractInput } from './normalizeInput';

const applyUnit = (base: Date, amount: number, unit: AddSubtractUnit): Date => {
  if (unit === 'days') {
    return addDays(base, amount);
  }

  if (unit === 'weeks') {
    return addWeeks(base, amount);
  }

  if (unit === 'months') {
    return addMonths(base, amount);
  }

  return addYears(base, amount);
};

export const calculateAddSubtract = (
  input: NormalizedAddSubtractInput,
  unit: AddSubtractUnit,
): AddSubtractComputation => {
  return {
    resultDate: applyUnit(input.base, input.signedAmount, unit),
  };
};
