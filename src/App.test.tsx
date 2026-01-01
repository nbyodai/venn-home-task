import App from "./App";
import { fireEvent, render, screen } from "@testing-library/react";

describe("App", () => {
  it("renders the form title", () => {
    render(<App />);
    expect(screen.getByText("Onboarding Form")).toBeInTheDocument();
  });
  it("renders the firstName label", () => {
    render(<App />);
    expect(screen.getByText("First Name")).toBeInTheDocument();
  });
  it("renders the lastName label", () => {
    render(<App />);
    expect(screen.getByText("Last Name")).toBeInTheDocument();
  });

  describe('PhoneNumber Input', () => {
    it("renders the phone number label", () => {
      render(<App />);
      expect(screen.getByText("Phone Number")).toBeInTheDocument();
    });

    it("renders the phone number input error if numbers are less than 10 digits", () => {
      render(<App />);
      const inputElement = screen.getByLabelText("Phone Number");
      fireEvent.change(inputElement, { target: { value: '123456789' } });
      fireEvent.blur(inputElement);
      expect(screen.getByText("Phone Number should be 10 digits")).toBeInTheDocument();
    });

    it("renders the phone number input error if non digit characters are entered", () => {
      render(<App />);
      const inputElement = screen.getByLabelText("Phone Number");
      fireEvent.change(inputElement, { target: { value: '12345abcde' } });
      fireEvent.blur(inputElement);
      expect(screen.getByText("Phone Number should be 10 digits")).toBeInTheDocument();
    });

    it("renders the phone number input error if area code is invalid", () => {
      render(<App />);
      const inputElement = screen.getByLabelText("Phone Number");
      fireEvent.change(inputElement, { target: { value: '1234567890' } });
      fireEvent.blur(inputElement);
      expect(screen.getByText("Phone Number has invalid area code")).toBeInTheDocument();
    });

    it("renders the phone number input", () => {
      render(<App />);
      const inputElement = screen.getByLabelText("Phone Number");
      expect(inputElement).toBeInTheDocument();
      fireEvent.change(inputElement, { target: { value: '2044567890' } });
      expect((inputElement as HTMLInputElement).value).toBe('+1 (204) 456-7890');
    });
   })
});
