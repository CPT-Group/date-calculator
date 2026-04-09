'use client';

import { Card } from 'primereact/card';

import { ThemeSwitcherModal } from '@/components';

import { useDateCalculatorState } from '../hooks/useDateCalculatorState';
import { DateCalculatorForm } from './DateCalculatorForm';
import { DateCalculatorResult } from './DateCalculatorResult';
import { DateCalculatorTabs } from './DateCalculatorTabs';
import styles from './dateCalculator.module.scss';

export const DateCalculatorPage = () => {
  const calculatorState = useDateCalculatorState();

  return (
    <div className={styles.calculatorContainer}>
      <Card
        header={
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderTitleBlock}>
              <h2 className={styles.cardTitle}>Date Calculator</h2>
              <p className={styles.cardSubtitle}>Professional date math for schedules and planning</p>
            </div>
            <ThemeSwitcherModal />
          </div>
        }
      >
        <div className={styles.pageGrid}>
          <DateCalculatorTabs
            calculationType={calculatorState.form.calculationType}
            inputMode={calculatorState.form.inputMode}
            onCalculationTypeChange={calculatorState.setCalculationType}
            onInputModeChange={calculatorState.setInputMode}
          />

          <DateCalculatorForm
            form={calculatorState.form}
            validationIssues={calculatorState.validationIssues}
            setTimezoneMode={calculatorState.setTimezoneMode}
            setIanaTimeZone={calculatorState.setIanaTimeZone}
            setIncludeEndDate={calculatorState.setIncludeEndDate}
            setBusinessDaysOnly={calculatorState.setBusinessDaysOnly}
            setStartDate={calculatorState.setStartDate}
            setEndDate={calculatorState.setEndDate}
            setBaseDate={calculatorState.setBaseDate}
            setAmount={calculatorState.setAmount}
            setOperation={calculatorState.setOperation}
            setUnit={calculatorState.setUnit}
          />
        </div>
      </Card>

      <div className={styles.resultPanel}>
        <DateCalculatorResult result={calculatorState.result} />
      </div>
    </div>
  );
};
