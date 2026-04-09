import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { DateCalculatorPage } from './DateCalculatorPage';
import { Providers } from '@/providers';

const renderWithProviders = () => {
  return render(
    <Providers>
      <DateCalculatorPage />
    </Providers>,
  );
};

describe('DateCalculatorPage', () => {
  it('renders route-first title and timezone selector', () => {
    renderWithProviders();

    expect(screen.getByText('Date Calculator')).toBeInTheDocument();
    expect(screen.getByLabelText('Time Zone')).toBeInTheDocument();
    expect(screen.getByText('Enter valid inputs to view calculation results.')).toBeInTheDocument();
  });

  it('switches into add/subtract mode with shared form controls', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    await user.click(screen.getByRole('button', { name: 'Add/Subtract' }));

    expect(screen.getByLabelText('Base Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
  });
});
