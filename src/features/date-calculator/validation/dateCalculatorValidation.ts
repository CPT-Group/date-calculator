import type {
  AddSubtractInput,
  DifferenceInput,
  ValidationIssue,
  ValidationResult,
} from '../types/dateCalculator.types';

const hasInvalidDate = (value: Date): boolean => Number.isNaN(value.getTime());

export const validateDifferenceInput = (input: Partial<DifferenceInput>): ValidationResult => {
  const issues: ValidationIssue[] = [];

  if (!input.start) {
    issues.push({ field: 'start', message: 'Start date is required.' });
  }

  if (!input.end) {
    issues.push({ field: 'end', message: 'End date is required.' });
  }

  if (input.start && hasInvalidDate(input.start)) {
    issues.push({ field: 'start', message: 'Start date is invalid.' });
  }

  if (input.end && hasInvalidDate(input.end)) {
    issues.push({ field: 'end', message: 'End date is invalid.' });
  }

  return {
    valid: issues.length === 0,
    issues,
  };
};

export const validateAddSubtractInput = (input: Partial<AddSubtractInput>): ValidationResult => {
  const issues: ValidationIssue[] = [];

  if (!input.base) {
    issues.push({ field: 'base', message: 'Base date is required.' });
  }

  if (input.base && hasInvalidDate(input.base)) {
    issues.push({ field: 'base', message: 'Base date is invalid.' });
  }

  if (input.amount === undefined || input.amount === null) {
    issues.push({ field: 'amount', message: 'Amount is required.' });
  } else if (!Number.isFinite(input.amount)) {
    issues.push({ field: 'amount', message: 'Amount must be a valid number.' });
  } else if (input.amount < 0) {
    issues.push({ field: 'amount', message: 'Amount must be zero or greater.' });
  }

  if (!input.unit) {
    issues.push({ field: 'unit', message: 'Unit is required.' });
  }

  if (!input.operation) {
    issues.push({ field: 'operation', message: 'Operation is required.' });
  }

  return {
    valid: issues.length === 0,
    issues,
  };
};
