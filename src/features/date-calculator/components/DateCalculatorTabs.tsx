'use client';

import { SelectButton } from 'primereact/selectbutton';

import styles from './dateCalculator.module.scss';
import type { CalculationType, DateInputMode } from '../types/dateCalculator.types';

const CALCULATION_TYPE_OPTIONS: Array<{ label: string; value: CalculationType }> = [
  { label: 'Days Between', value: 'difference' },
  { label: 'Add/Subtract', value: 'add-subtract' },
];

const INPUT_MODE_OPTIONS: Array<{ label: string; value: DateInputMode }> = [
  { label: 'Date Only', value: 'date-only' },
  { label: 'Date Time', value: 'date-time' },
];

interface DateCalculatorTabsProps {
  calculationType: CalculationType;
  inputMode: DateInputMode;
  onCalculationTypeChange: (value: CalculationType) => void;
  onInputModeChange: (value: DateInputMode) => void;
}

export const DateCalculatorTabs = ({
  calculationType,
  inputMode,
  onCalculationTypeChange,
  onInputModeChange,
}: DateCalculatorTabsProps) => {
  return (
    <div className={styles.selectorRow}>
      <div className={styles.selectorGroup}>
        <label className={styles.selectorLabel} htmlFor="calculation-type-toggle">
          Calculation
        </label>
        <SelectButton
          id="calculation-type-toggle"
          value={calculationType}
          options={CALCULATION_TYPE_OPTIONS}
          optionLabel="label"
          optionValue="value"
          onChange={(event) => onCalculationTypeChange(event.value)}
        />
      </div>

      <div className={styles.selectorGroup}>
        <label className={styles.selectorLabel} htmlFor="input-mode-toggle">
          Input Mode
        </label>
        <SelectButton
          id="input-mode-toggle"
          value={inputMode}
          options={INPUT_MODE_OPTIONS}
          optionLabel="label"
          optionValue="value"
          onChange={(event) => onInputModeChange(event.value)}
        />
      </div>
    </div>
  );
};
