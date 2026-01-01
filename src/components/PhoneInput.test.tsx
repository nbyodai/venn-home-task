import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PhoneInput } from './PhoneInput';

describe('PhoneInput', () => {
  it('should render input with label', () => {
    const mockHandlers = {
      handlePhoneValidation: vi.fn(),
      handlePhoneNumber: vi.fn(),
    };
    render(
      <PhoneInput
        formattedPhoneNumber=""
        {...mockHandlers}
      />
    );

    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
  });

  it('should display formatted phone number', () => {
    const mockHandlers = {
      handlePhoneValidation: vi.fn(),
      handlePhoneNumber: vi.fn(),
    };

    render(
      <PhoneInput
        formattedPhoneNumber="+1 (123) 456-7890"
        {...mockHandlers}
      />
    );

    expect(screen.getByDisplayValue('+1 (123) 456-7890')).toBeInTheDocument();
  });

  it('should call handlePhoneNumber on change', async () => {
    const handlePhoneNumber = vi.fn();
    const mockHandlers = {
      handlePhoneValidation: vi.fn(),
      handlePhoneNumber,
    };

    render(
      <PhoneInput
        formattedPhoneNumber=""
        {...mockHandlers}
      />
    );

    const input = screen.getByRole('textbox');
    await fireEvent.change(input, { target: { value: '1234567890' } });

    expect(handlePhoneNumber).toHaveBeenCalled();
  });

  it('should call handlePhoneValidation on blur', async () => {
    const handlePhoneValidation = vi.fn();
    const mockHandlers = {
      handlePhoneValidation,
      handlePhoneNumber: vi.fn(),
    };

    render(
      <PhoneInput
        formattedPhoneNumber="1234567890"
        {...mockHandlers}
      />
    );

    const input = screen.getByRole('textbox');
    await fireEvent.click(input);
    await fireEvent.blur(input);

    expect(handlePhoneValidation).toHaveBeenCalled();
  });
});
