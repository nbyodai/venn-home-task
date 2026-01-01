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

  describe('Corporation Number Integration', () => {
    /**
     *
     * Type a corporation number. Length should be 9 chars, should be validated asynchronously by making GET request to a given endpoint. URL https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/:number .
     * For correct corporation number response will be for example: { "corporationNumber": "123456789", "valid": true }
     * For bad corporation number there will be: { "valid": false, "message": "Invalid corporation number" }
     * List of valid corporation numbers (do not hardcode it, only for testing purpose): [ "826417395", "158739264", "123456789", "591863427", "312574689", "287965143", "265398741", "762354918", "468721395", "624719583", ]
     */

    it("renders the corporation number label", () => {
      render(<App />);
      expect(screen.getByText("Corporation Number")).toBeInTheDocument();
    });

    it("renders error for less than 9 digits", () => {
      render(<App />);
      const inputElement = screen.getByLabelText("Corporation Number");
      expect(inputElement).toBeInTheDocument();
      fireEvent.change(inputElement, { target: { value: '12345678' } });
      fireEvent.blur(inputElement);
      expect(screen.getByText("Corporation Number should be 9 digits")).toBeInTheDocument();
    });

    it ("renders error for non digit characters", () => {
      render(<App />);
      const inputElement = screen.getByLabelText("Corporation Number");
      expect(inputElement).toBeInTheDocument();
      fireEvent.change(inputElement, { target: { value: '12345abcd' } });
      fireEvent.blur(inputElement);
      expect(screen.getByText("Corporation Number should be 9 digits")).toBeInTheDocument();
    });
  });
});
