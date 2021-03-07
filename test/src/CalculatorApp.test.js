import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import { CalculatorApp } from '../../src/CalculatorApp';

const setup = async (overrideProps = {}) => {
  const props = {
    ...overrideProps
  };
  await act(async () => {
    render(<CalculatorApp {...props} />);
  });
};

describe('CalculatorApp', () => {
  it('renders without crash', async () => {
    await setup();

    expect(
      screen.getByRole('heading', { name: 'Mortgage Payments Calculator' })
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Principal Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Mortgage Term')).toBeInTheDocument();
    expect(screen.getByLabelText('Rate')).toBeInTheDocument();
    expect(screen.getByLabelText('Monthly savings')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Calculate Monthly Payments' })).toBeInTheDocument();

    expect(screen.getByLabelText('Principal Amount')).toHaveAttribute('value', '$100,000');
    expect(screen.getByLabelText('Rate')).toHaveAttribute('value', '2.75%');
    expect(screen.getByLabelText('Monthly savings')).toHaveAttribute('value', '$0');
  });

  it('calculates monthly payment based on default input values', async () => {
    await setup();

    const button = screen.getByRole('button', { name: 'Calculate Monthly Payments' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('$954.11')).toBeInTheDocument();
    });
  });

  it('calculates monthly payment for updated principal', async () => {
    await setup();

    const principalInput = screen.getByLabelText('Principal Amount');
    fireEvent.change(principalInput, { target: { value: '$200000' } });

    const button = screen.getByRole('button', { name: 'Calculate Monthly Payments' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('$1,908.22')).toBeInTheDocument();
    });
  });
});
