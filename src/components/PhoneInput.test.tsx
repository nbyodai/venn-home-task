import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
