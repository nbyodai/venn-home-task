import App from "./App";
import { render, screen, fireEvent } from "@testing-library/react";

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
  it("renders error when firstName is not provided", () => {
    render(<App />);
    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.blur(firstNameInput);
    expect(screen.getByText("First Name is required")).toBeInTheDocument();
  });

  it("renders error when firstName is not minimum 2 characters", () => {
    render(<App />);
    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "A" } });
    fireEvent.blur(firstNameInput);
    expect(screen.getByText("First Name is should be at least 2 characters")).toBeInTheDocument();
  });
});
