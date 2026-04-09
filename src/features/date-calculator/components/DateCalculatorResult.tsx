'use client';

import { format } from 'date-fns';
import { useRef } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';

import styles from './dateCalculator.module.scss';
import type { CalculatorEngineResult } from '../types/dateCalculator.types';

interface DateCalculatorResultProps {
  result: CalculatorEngineResult | null;
}

const formatDateTime = (value: Date): string => format(value, 'yyyy-MM-dd HH:mm');

const CopyableValue = ({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: (value: string) => void;
}) => {
  return (
    <div className={styles.copyRow}>
      <div className={styles.copyValue}>
        <strong>{label}:</strong> {value}
      </div>
      <Button
        type="button"
        size="small"
        text
        icon="pi pi-copy"
        label="Copy"
        onClick={() => onCopy(value)}
      />
    </div>
  );
};

export const DateCalculatorResult = ({ result }: DateCalculatorResultProps) => {
  const toast = useRef<Toast>(null);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.current?.show({
        severity: 'success',
        summary: 'Copied',
        detail: value,
        life: 2800,
      });
    } catch {
      toast.current?.show({
        severity: 'error',
        summary: 'Copy failed',
        detail: 'Please copy manually.',
        life: 3500,
      });
    }
  };

  if (!result) {
    return <Message severity="info" text="Enter valid inputs to view calculation results." />;
  }

  return (
    <>
      <Toast ref={toast} position="top-right" />
      {result.kind === 'difference' ? (
        <DifferenceResultCard result={result} onCopy={handleCopy} />
      ) : (
        <AddSubtractResultCard result={result} onCopy={handleCopy} />
      )}
    </>
  );
};

function DifferenceResultCard({
  result,
  onCopy,
}: {
  result: Extract<CalculatorEngineResult, { kind: 'difference' }>;
  onCopy: (value: string) => void;
}) {
  const startText = formatDateTime(result.normalizedStart);
  const endText = formatDateTime(result.normalizedEnd);
  const rangeText = `${startText} -> ${endText}`;

  return (
    <Card title="Difference Result">
      <div className={styles.resultList}>
        <div><strong>Calendar days:</strong> {result.summary.calendarDays}</div>
        <div><strong>Business days:</strong> {result.summary.businessDays}</div>
        <div><strong>Total weeks:</strong> {result.summary.totalWeeks.toFixed(2)}</div>
        <div><strong>Total hours:</strong> {result.summary.totalHours.toFixed(2)}</div>
        <div><strong>Total minutes:</strong> {result.summary.totalMinutes}</div>
        <CopyableValue label="Start (normalized)" value={startText} onCopy={onCopy} />
        <CopyableValue label="End (normalized)" value={endText} onCopy={onCopy} />
        <CopyableValue label="Range" value={rangeText} onCopy={onCopy} />
        {result.notes.map((note) => (
          <small key={note}>{note}</small>
        ))}
      </div>
    </Card>
  );
}

function AddSubtractResultCard({
  result,
  onCopy,
}: {
  result: Extract<CalculatorEngineResult, { kind: 'add-subtract' }>;
  onCopy: (value: string) => void;
}) {
  const baseText = formatDateTime(result.normalizedBase);
  const resultText = formatDateTime(result.summary.resultDate);
  const rangeText = `${baseText} -> ${resultText}`;

  return (
    <Card title="Add/Subtract Result">
      <div className={styles.resultList}>
        <CopyableValue label="Calculated date" value={resultText} onCopy={onCopy} />
        <CopyableValue label="Base (normalized)" value={baseText} onCopy={onCopy} />
        <CopyableValue label="Range" value={rangeText} onCopy={onCopy} />
        {result.notes.map((note) => (
          <small key={note}>{note}</small>
        ))}
      </div>
    </Card>
  );
}
