import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CorporationNumberInput } from "./CorporationNumberInput";

describe("CorporationNumberInput Integration", () => {
  it("validates corporation number after debounce (Happy Path)", async () => {
    const handleCorporationNumber = vi.fn();
    const setIsValid = vi.fn();

    render(
      <CorporationNumberInput
        handleCorporationNumber={handleCorporationNumber}
        handleCorporationValidation={vi.fn()}
        setIsValidCorporationNumber={setIsValid}
      />
    );

    const input = screen.getByLabelText("Corporation Number");

    // User types valid number
    fireEvent.change(input, { target: { value: "123456789" } });

    // Wait for 500ms debounce + Network Request
    await waitFor(() => {
      expect(handleCorporationNumber).toHaveBeenCalledWith("123456789");
    }, { timeout: 2000 });

    expect(setIsValid).toHaveBeenCalledWith(true);
  });

  it("sets isValid to false when API returns invalid (Unhappy Path)", async () => {
    const setIsValid = vi.fn();

    render(
      <CorporationNumberInput
        handleCorporationNumber={vi.fn()}
        handleCorporationValidation={vi.fn()}
        setIsValidCorporationNumber={setIsValid}
      />
    );

    const input = screen.getByLabelText("Corporation Number");

    // User types invalid number
    fireEvent.change(input, { target: { value: "999999999" } });

    await waitFor(() => {
      expect(setIsValid).toHaveBeenCalledWith(false);
    }, { timeout: 2000 });
  });
});
