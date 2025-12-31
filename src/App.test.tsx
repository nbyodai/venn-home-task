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

  it("renders error when firstName contains invalid characters", () => {
    render(<App />);
    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "John123" } });
    fireEvent.blur(firstNameInput);
    expect(screen.getByText("First Name should contain only letters and dashes")).toBeInTheDocument();
  });

  it("renders no error when firstName has a dash", () => {
    render(<App />);
    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "Mary-Jane" } });
    fireEvent.blur(firstNameInput);
    expect(screen.queryByText("First Name should contain only letters and dashes")).not.toBeInTheDocument();
  });


    it("renders error when lastName is not provided", () => {
    render(<App />);
    const lastNameInput = screen.getByLabelText("Last Name");
    fireEvent.blur(lastNameInput);
    expect(screen.getByText("Last Name is required")).toBeInTheDocument();
  });

  it("renders error when lastName is not minimum 2 characters", () => {
    render(<App />);
    const lastNameInput = screen.getByLabelText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: "A" } });
    fireEvent.blur(lastNameInput);
    expect(screen.getByText("Last Name is should be at least 2 characters")).toBeInTheDocument();
  });

  it("renders error when lastName contains invalid characters", () => {
    render(<App />);
    const lastNameInput = screen.getByLabelText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: "John123" } });
    fireEvent.blur(lastNameInput);
    expect(screen.getByText("Last Name should contain only letters and dashes")).toBeInTheDocument();
  });

  it("renders no error when lastName has a dash", () => {
    render(<App />);
    const lastNameInput = screen.getByLabelText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: "Mary-Jane" } });
    fireEvent.blur(lastNameInput);
    expect(screen.queryByText("Last Name should contain only letters and dashes")).not.toBeInTheDocument();
  });
});
