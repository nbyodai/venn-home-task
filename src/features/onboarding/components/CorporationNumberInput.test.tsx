import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CorporationNumberInput } from "./CorporationNumberInput";

describe("CorporationNumberInput Unit Tests", () => {

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("calls handleCorporationValidation on blur", () => {
    const handleCorporationValidation = vi.fn();
    render(
      <CorporationNumberInput
        handleCorporationNumber={vi.fn()}
        handleCorporationValidation={handleCorporationValidation}
        setIsValidCorporationNumber={vi.fn()}
      />
    );
    const input = screen.getByLabelText("Corporation Number");

    fireEvent.blur(input);

    expect(handleCorporationValidation).toHaveBeenCalledTimes(1);
  });

  it("renders error message when error prop is provided", () => {
    render(
      <CorporationNumberInput
        error="Invalid corporation number"
        handleCorporationNumber={vi.fn()}
        handleCorporationValidation={vi.fn()}
        setIsValidCorporationNumber={vi.fn()}
      />
    );
    expect(screen.getByText("Invalid corporation number")).toBeInTheDocument();
  });

  it("aborts the previous request when input changes before response resolves", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    render(
      <CorporationNumberInput
        handleCorporationNumber={vi.fn()}
        handleCorporationValidation={vi.fn()}
        setIsValidCorporationNumber={vi.fn()}
      />
    );

    const input = screen.getByLabelText("Corporation Number");

    // First Input -> Trigger Debounce
    fireEvent.change(input, { target: { value: "123456789" } });
    act(() => { vi.advanceTimersByTime(500); });

    // Check 1st call signal
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const firstSignal = fetchSpy.mock.calls[0][1]?.signal;
    expect(firstSignal?.aborted).toBe(false);

    // Second Input (Interrupting) -> Trigger Debounce
    fireEvent.change(input, { target: { value: "123456788" } });
    act(() => { vi.advanceTimersByTime(500); });

    // Assert Abort
    expect(firstSignal?.aborted).toBe(true);
  });
});
