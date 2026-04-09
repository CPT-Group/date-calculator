import { normalizeToConfiguredTimeZone } from './timezoneAdapter';

import type { AddSubtractInput, DifferenceInput } from '../types/dateCalculator.types';

export interface NormalizedDifferenceInput {
  start: Date;
  end: Date;
  includeEndDate: boolean;
  businessDaysOnly: boolean;
}

export interface NormalizedAddSubtractInput {
  base: Date;
  signedAmount: number;
}

export const normalizeDifferenceInput = (input: DifferenceInput): NormalizedDifferenceInput => {
  return {
    start: normalizeToConfiguredTimeZone(input.start, input.timezone, input.inputMode),
    end: normalizeToConfiguredTimeZone(input.end, input.timezone, input.inputMode),
    includeEndDate: input.includeEndDate,
    businessDaysOnly: input.businessDaysOnly,
  };
};

export const normalizeAddSubtractInput = (input: AddSubtractInput): NormalizedAddSubtractInput => {
  const normalizedBase = normalizeToConfiguredTimeZone(input.base, input.timezone, input.inputMode);
  const signedAmount = input.operation === 'add' ? input.amount : -input.amount;

  return {
    base: normalizedBase,
    signedAmount,
  };
};
