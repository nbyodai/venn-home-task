import App from "./App";
import { render, screen } from "@testing-library/react";

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
});
