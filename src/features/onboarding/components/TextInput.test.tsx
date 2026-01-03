import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("renders a text input", () => {
    render(
      <TextInput
        label="First Name"
        name="firstName"
        value={""}
        onChange={() => {}}
      />
    );
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
  });

  it("renders the correct label", () => {
    render(
      <TextInput
        label="First Name"
        name="firstName"
        value={""}
        onChange={() => {}}
      />
    );
    const labelElement = screen.getByText("First Name");
    expect(labelElement).toBeInTheDocument();
  });

  // Validation tests: use a small wrapper that wires TextInput to local state and validation logic
  function TestWrapper({ label = "First Name" }: { label?: string }) {
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | undefined>(undefined);

    function handleValidation() {
      let newError: string | undefined;
      if (!value) {
        newError = `${label} is required`;
      } else if (value.length < 2) {
        newError = `${label} is should be at least 2 characters`;
      } else if (!/^[A-Za-z-]+$/.test(value)) {
        newError = `${label} should contain only letters and dashes`;
      }
      setError(newError);
    }

    return (
      <TextInput
        label={label}
        name={label.replace(/\s+/g, "")}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        handleValidation={handleValidation}
        error={error}
        required
      />
    );
  }

  it("shows required error on blur when empty", () => {
    render(<TestWrapper label="First Name" />);
    const input = screen.getByLabelText("First Name");
    fireEvent.blur(input);
    expect(screen.getByText("First Name is required")).toBeInTheDocument();
  });

  it("shows min length error when value too short", () => {
    render(<TestWrapper label="First Name" />);
    const input = screen.getByLabelText("First Name");
    fireEvent.change(input, { target: { value: "A" } });
    fireEvent.blur(input);
    expect(screen.getByText("First Name is should be at least 2 characters")).toBeInTheDocument();
  });

  it("shows invalid characters error", () => {
    render(<TestWrapper label="First Name" />);
    const input = screen.getByLabelText("First Name");
    fireEvent.change(input, { target: { value: "John123" } });
    fireEvent.blur(input);
    expect(screen.getByText("First Name should contain only letters and dashes")).toBeInTheDocument();
  });

  it("accepts a dash in the value", () => {
    render(<TestWrapper label="First Name" />);
    const input = screen.getByLabelText("First Name");
    fireEvent.change(input, { target: { value: "Mary-Jane" } });
    fireEvent.blur(input);
    expect(screen.queryByText("First Name should contain only letters and dashes")).not.toBeInTheDocument();
  });
});
