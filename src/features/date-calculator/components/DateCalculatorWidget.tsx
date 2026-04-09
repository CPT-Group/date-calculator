'use client';

import { Card } from 'primereact/card';

import { useDateCalculatorState } from '../hooks/useDateCalculatorState';
import type { DateCalculatorFormState } from '../types/dateCalculator.types';
import { DateCalculatorForm } from './DateCalculatorForm';
import { DateCalculatorResult } from './DateCalculatorResult';
import { DateCalculatorTabs } from './DateCalculatorTabs';
import styles from './dateCalculator.module.scss';

interface DateCalculatorWidgetProps {
  showTitle?: boolean;
  allowTimeZoneSelect?: boolean;
  defaultTimeZone?: string;
}

export const DateCalculatorWidget = ({
  showTitle = true,
  allowTimeZoneSelect = true,
  defaultTimeZone = 'America/New_York',
}: DateCalculatorWidgetProps) => {
  const initialState: Partial<DateCalculatorFormState> = {
    timezoneMode: allowTimeZoneSelect ? 'local' : 'iana',
    ianaTimeZone: defaultTimeZone,
  };

  const calculatorState = useDateCalculatorState(initialState);

  return (
    <div className={styles.widgetShell}>
      <Card title={showTitle ? 'Widget Mode' : undefined}>
        <div className="flex flex-column gap-3">
          <DateCalculatorTabs
            calculationType={calculatorState.form.calculationType}
            inputMode={calculatorState.form.inputMode}
            onCalculationTypeChange={calculatorState.setCalculationType}
            onInputModeChange={calculatorState.setInputMode}
          />

          <DateCalculatorForm
            form={calculatorState.form}
            allowTimeZoneSelect={allowTimeZoneSelect}
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

          <DateCalculatorResult result={calculatorState.result} />
        </div>
      </Card>
    </div>
  );
};
