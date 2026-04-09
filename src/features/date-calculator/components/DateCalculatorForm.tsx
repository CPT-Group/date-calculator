'use client';

import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Message } from 'primereact/message';

import { getTimeZoneOptions } from '../constants/timeZones';
import styles from './dateCalculator.module.scss';
import type { DateCalculatorFormState, ValidationIssue } from '../types/dateCalculator.types';

const IANA_TIMEZONE_OPTIONS = getTimeZoneOptions();
const LOCAL_TIME_VALUE = '__local__';
const UTC_VALUE = 'UTC';
const TIME_ZONE_GROUPS = [
  {
    label: 'Standard',
    items: [
      { label: 'Local Time', value: LOCAL_TIME_VALUE },
      { label: 'UTC', value: UTC_VALUE },
    ],
  },
  {
    label: 'IANA Time Zones',
    items: IANA_TIMEZONE_OPTIONS,
  },
];

const OPERATION_OPTIONS = [
  { label: 'Add', value: 'add' },
  { label: 'Subtract', value: 'subtract' },
];

const UNIT_OPTIONS = [
  { label: 'Days', value: 'days' },
  { label: 'Weeks', value: 'weeks' },
  { label: 'Months', value: 'months' },
  { label: 'Years', value: 'years' },
];

interface DateCalculatorFormProps {
  form: DateCalculatorFormState;
  allowTimeZoneSelect?: boolean;
  validationIssues: ValidationIssue[];
  setTimezoneMode: (value: DateCalculatorFormState['timezoneMode']) => void;
  setIanaTimeZone: (value: string) => void;
  setIncludeEndDate: (value: boolean) => void;
  setBusinessDaysOnly: (value: boolean) => void;
  setStartDate: (value: Date | null) => void;
  setEndDate: (value: Date | null) => void;
  setBaseDate: (value: Date | null) => void;
  setAmount: (value: number) => void;
  setOperation: (value: DateCalculatorFormState['operation']) => void;
  setUnit: (value: DateCalculatorFormState['unit']) => void;
}

export const DateCalculatorForm = ({
  form,
  allowTimeZoneSelect = true,
  validationIssues,
  setTimezoneMode,
  setIanaTimeZone,
  setIncludeEndDate,
  setBusinessDaysOnly,
  setStartDate,
  setEndDate,
  setBaseDate,
  setAmount,
  setOperation,
  setUnit,
}: DateCalculatorFormProps) => {
  const showTime = form.inputMode === 'date-time';
  const hasDifferenceInput = Boolean(form.startDate || form.endDate);
  const hasAddSubtractInput = Boolean(form.baseDate);
  const shouldShowValidation =
    validationIssues.length > 0 &&
    ((form.calculationType === 'difference' && hasDifferenceInput) ||
      (form.calculationType === 'add-subtract' && hasAddSubtractInput));

  const validationMessage = validationIssues.map((issue) => issue.message).join(' ');
  const selectedTimeZoneValue =
    form.timezoneMode === 'local' ? LOCAL_TIME_VALUE : form.timezoneMode === 'utc' ? UTC_VALUE : form.ianaTimeZone;

  const handleTimeZoneSelection = (value: string) => {
    if (value === LOCAL_TIME_VALUE) {
      setTimezoneMode('local');
      return;
    }

    if (value === UTC_VALUE) {
      setTimezoneMode('utc');
      setIanaTimeZone('UTC');
      return;
    }

    setTimezoneMode('iana');
    setIanaTimeZone(value);
  };

  return (
    <div className={styles.stack}>
      <div className={styles.formGrid}>
        {allowTimeZoneSelect && (
          <div className={styles.stack}>
            <label htmlFor="timezone-selection">Time Zone</label>
            <Dropdown
              inputId="timezone-selection"
              value={selectedTimeZoneValue}
              options={TIME_ZONE_GROUPS}
              optionGroupLabel="label"
              optionGroupChildren="items"
              optionLabel="label"
              optionValue="value"
              filter
              onChange={(event) => handleTimeZoneSelection(event.value)}
            />
          </div>
        )}

        {form.calculationType === 'difference' ? (
          <>
            <div className={styles.stack}>
              <label htmlFor="start-date">Start</label>
              <Calendar
                inputId="start-date"
                value={form.startDate}
                showTime={showTime}
                hourFormat="24"
                dateFormat="mm/dd/yy"
                onChange={(event) => setStartDate((event.value as Date | null) ?? null)}
              />
            </div>

            <div className={styles.stack}>
              <label htmlFor="end-date">End</label>
              <Calendar
                inputId="end-date"
                value={form.endDate}
                showTime={showTime}
                hourFormat="24"
                dateFormat="mm/dd/yy"
                onChange={(event) => setEndDate((event.value as Date | null) ?? null)}
              />
            </div>
          </>
        ) : (
          <>
            <div className={styles.stack}>
              <label htmlFor="base-date">Base Date</label>
              <Calendar
                inputId="base-date"
                value={form.baseDate}
                showTime={showTime}
                hourFormat="24"
                dateFormat="mm/dd/yy"
                onChange={(event) => setBaseDate((event.value as Date | null) ?? null)}
              />
            </div>
            <div className={styles.stack}>
              <label htmlFor="amount">Amount</label>
              <InputNumber
                inputId="amount"
                value={form.amount}
                min={0}
                showButtons
                onValueChange={(event) => setAmount(event.value ?? 0)}
              />
            </div>
            <div className={styles.stack}>
              <label htmlFor="operation">Operation</label>
              <Dropdown
                inputId="operation"
                value={form.operation}
                options={OPERATION_OPTIONS}
                optionLabel="label"
                optionValue="value"
                onChange={(event) => setOperation(event.value)}
              />
            </div>
            <div className={styles.stack}>
              <label htmlFor="unit">Unit</label>
              <Dropdown
                inputId="unit"
                value={form.unit}
                options={UNIT_OPTIONS}
                optionLabel="label"
                optionValue="value"
                onChange={(event) => setUnit(event.value)}
              />
            </div>
          </>
        )}

        {form.calculationType === 'difference' && (
          <div className={`${styles.inlineOptions} ${styles.fullWidth}`}>
            <div className="flex align-items-center gap-2">
              <Checkbox
                inputId="include-end-date"
                checked={form.includeEndDate}
                onChange={(event) => setIncludeEndDate(Boolean(event.checked))}
              />
              <label htmlFor="include-end-date">Include end date</label>
            </div>
            <div className="flex align-items-center gap-2">
              <Checkbox
                inputId="business-days-only"
                checked={form.businessDaysOnly}
                onChange={(event) => setBusinessDaysOnly(Boolean(event.checked))}
              />
              <label htmlFor="business-days-only">Business days only</label>
            </div>
          </div>
        )}
      </div>

      {shouldShowValidation && (
        <Message
          severity="warn"
          className={styles.validationMessage}
          text={validationMessage}
        />
      )}
    </div>
  );
};
