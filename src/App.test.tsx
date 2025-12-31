import App from "./App";
import { render, screen } from "@testing-library/react";

describe("App", () => {
  it("renders the demo Vite text", () => {
    render(<App />);
    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });
});
