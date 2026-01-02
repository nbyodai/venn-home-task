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

  it("maintains multiple errors simultaneously when different fields are blurred", async () => {
    render(<OnboardingForm />);

    // 1. Trigger First Name Error
    const firstNameInput = screen.getByLabelText(/first name/i);
    fireEvent.focus(firstNameInput);
    fireEvent.blur(firstNameInput); // Should trigger "First Name is required"

    expect(screen.getByText("First Name is required")).toBeInTheDocument();

    // 2. Trigger Phone Error
    const phoneInput = screen.getByLabelText(/phone number/i);
    fireEvent.change(phoneInput, { target: { value: "123" } }); // Invalid length
    fireEvent.blur(phoneInput); // Should trigger phone error

    // 3. ASSERT: Both errors should exist
    // THIS WILL FAIL currently because the phone validation wipes the name validation
    expect(screen.getByText("Phone Number should be 10 digits")).toBeInTheDocument();
    expect(screen.getByText("First Name is required")).toBeInTheDocument();
  });

  it("disables the submit button until the form is fully valid", async () => {
    render(<OnboardingForm />);
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    // 1. Check Initial State: Should be disabled (fields are empty)
    expect(submitBtn).toBeDisabled();

    // 2. Fill only First Name: Should still be disabled
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "John" } });
    expect(submitBtn).toBeDisabled();

    // 3. Fill the rest with VALID data
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Doe" } });

    // Note: Use raw digits for Phone/Corp inputs based on your implementation
    const phoneInput = screen.getByLabelText(/phone number/i);
    fireEvent.change(phoneInput, { target: { value: "3062776103" } });

    const corpInput = screen.getByLabelText(/corporation number/i);
    fireEvent.change(corpInput, { target: { value: "123456789" } });

    // 4. Check Final State: Should now be enabled
    // We use waitFor just in case there are any state updates pending
    await waitFor(() => {
      expect(submitBtn).toBeEnabled();
    });
  });
});
