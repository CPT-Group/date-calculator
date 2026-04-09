import { calculateAddSubtract } from './addSubtractCalculator';
import { calculateDifference } from './differenceCalculator';
import { normalizeAddSubtractInput, normalizeDifferenceInput } from './normalizeInput';
import { buildAddSubtractNotes, buildDifferenceNotes } from './resultFormatter';

import type {
  AddSubtractInput,
  AddSubtractResult,
  CalculatorEngineResult,
  DifferenceInput,
  DifferenceResult,
} from '../types/dateCalculator.types';

export const runDifferenceCalculation = (input: DifferenceInput): DifferenceResult => {
  const normalizedInput = normalizeDifferenceInput(input);
  const summary = calculateDifference(normalizedInput);

  const baseResult: DifferenceResult = {
    kind: 'difference',
    summary,
    notes: [],
    normalizedStart: normalizedInput.start,
    normalizedEnd: normalizedInput.end,
  };

  return {
    ...baseResult,
    notes: buildDifferenceNotes(baseResult, input.timezone),
  };
};

export const runAddSubtractCalculation = (input: AddSubtractInput): AddSubtractResult => {
  const normalizedInput = normalizeAddSubtractInput(input);
  const summary = calculateAddSubtract(normalizedInput, input.unit);

  const baseResult: AddSubtractResult = {
    kind: 'add-subtract',
    summary,
    notes: [],
    normalizedBase: normalizedInput.base,
  };

  return {
    ...baseResult,
    notes: buildAddSubtractNotes(baseResult, input.timezone, input.unit),
  };
};

export const runDateCalculatorEngine = (
  input: DifferenceInput | AddSubtractInput,
): CalculatorEngineResult => {
  if ('start' in input) {
    return runDifferenceCalculation(input);
  }

  return runAddSubtractCalculation(input);
};
