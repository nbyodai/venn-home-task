import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, it, expect } from "vitest";

describe("App Integration", () => {
  it("renders the onboarding form container", () => {
    render(<App />);
    expect(screen.getByText("Onboarding Form")).toBeInTheDocument();
  });

  it("renders all required input fields", () => {
    render(<App />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/corporation number/i)).toBeInTheDocument();
  });
});
