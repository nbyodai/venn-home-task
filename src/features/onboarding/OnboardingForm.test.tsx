import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { OnboardingForm } from "./OnboardingForm";
import { server } from "../../mocks/node";
import { http } from "msw/core/http";
import { HttpResponse } from "msw";
import { ENDPOINTS } from "../../api/endpoints";

describe("OnboardingForm Submission", () => {
  it("submits the form successfully (200 OK)", async () => {
    // Render the OnboardingForm component
    render(<OnboardingForm />);

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "Hellen" } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Of-Troy" } });
    const phoneInput = screen.getByLabelText(/phone number/i);
    fireEvent.change(phoneInput, { target: { value: "3062776103" } });
    const corpInput = screen.getByLabelText(/corporation number/i);
    fireEvent.change(corpInput, { target: { value: "826417395" } });

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.getByText("Form submitted successfully!")).toBeInTheDocument();
    });
  });

  it("handles server error (400 Bad Request)", async () => {
    // Override handler to return 400 error
    server.use(
      http.post(ENDPOINTS.PROFILE_DETAILS, () => {
        return HttpResponse.json(
          { message: "some error occurred" },
          { status: 400 }
        );
      })
    );

    render(<OnboardingForm />);

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "Hellen" } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Of-Troy" } });
    const phoneInput = screen.getByLabelText(/phone number/i);
    fireEvent.change(phoneInput, { target: { value: "3062776103" } });
    const corpInput = screen.getByLabelText(/corporation number/i);
    fireEvent.change(corpInput, { target: { value: "123456789" } });


    const submitBtn = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitBtn);

    // Assert Error Message
    await waitFor(() => {
      expect(screen.getByText("some error occurred")).toBeInTheDocument();
    });
  });
});
