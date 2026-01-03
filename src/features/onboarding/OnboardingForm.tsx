import { useCallback, useState } from "react";
import { isNotValidAreaCode, formatPhoneNumber } from "../../utils";
import { CorporationNumberInput } from "./components/CorporationNumberInput";
import { PhoneInput } from "./components/PhoneInput";
import { TextInput } from "./components/TextInput";
import { ENDPOINTS } from "../../api/endpoints";
import { useFormValidity } from "./hooks/useFormValidity";

type OnboardingFormErrorsType = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  corporationNumber?: string;
};

export function OnboardingForm() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>("");
  const [corporationNumber, setCorporationNumber] = useState<string>("");

  const [errors, setErrors] = useState<OnboardingFormErrorsType>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  const isFormInvalid = useFormValidity(errors, {
    firstName,
    lastName,
    phoneNumber,
    corporationNumber
  });

  const validateName = (field: "firstName" | "lastName") => {
    // 1. Determine which value to check and what label to use in messages
    const value = field === "firstName" ? firstName : lastName;
    const label = field === "firstName" ? "First Name" : "Last Name";

    setErrors((prev) => {
      let error: string | undefined = undefined;

      // 2. Generic Logic (Works for both)
      if (!value) {
        error = `${label} is required`;
      } else if (value.length < 2) {
        error = `${label} should be at least 2 characters`;
      } else if (!/^[A-Za-z-]+$/.test(value)) {
        error = `${label} should contain only letters and dashes`;
      }
      // 3. Update ONLY the specific key (firstName OR lastName)
      // We use [field] computed property syntax to target the right one
      return {
        ...prev,
        [field]: error
      };
    });
  };

  function handlePhoneValidation() {
    let phoneError: string | undefined = undefined;
    if (!/^\d{10}$/.test(phoneNumber)) {
      phoneError = "Phone Number should be 10 digits";
    } else if (isNotValidAreaCode(parseInt(phoneNumber.slice(0, 3), 10))) {
      phoneError = "Phone Number has invalid area code";
    }
    setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: phoneError }));
  }

  function handleCorporationValidation() {
    let corpError: string | undefined = undefined;
    if (!/^\d{9}$/.test(corporationNumber)) {
      corpError = "Corporation Number should be 9 digits";
    }
    setErrors((prevErrors) => ({ ...prevErrors, corporationNumber: corpError }));
  }

  const handleAsyncCorporationNumberValidation = useCallback((isValid: boolean) => {
    setErrors((prev) => {
      // Priority Check: Don't overwrite format errors (like "9 digits")
      if (prev.corporationNumber && prev.corporationNumber.includes("digits")) {
        return prev;
      }

      return {
        ...prev,
        corporationNumber: isValid ? undefined : "Invalid Corporation Number"
      };
    });
  }, []);

  const handlePhoneNumber = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    let rawDigits = inputValue.replace(/\D/g, "");
    if (rawDigits.startsWith("1")) {
      rawDigits = rawDigits.substring(1);
    }
    if (rawDigits.length > 10) return;
    setPhoneNumber(rawDigits);
    setFormattedPhoneNumber(formatPhoneNumber(rawDigits));
  };

  function handleCorporationNumber(value: string) {
    setCorporationNumber(value);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setServerMessage("");

    const payload = {
      firstName,
      lastName,
      corporationNumber,
      phone: `+1${phoneNumber}`,
    };

    try {
      const response = await fetch(ENDPOINTS.PROFILE_DETAILS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      setStatus("success");
      setServerMessage("Form submitted successfully!");
    } catch (error) {
      setStatus("error");
      if(error instanceof Error) {
        setServerMessage(error.message);
      } else {
        setServerMessage("Network error. Please try again later.");
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-100"
    >
      <h1 className="text-3xl font-medium text-center mb-8 text-gray-900">
        Onboarding Form
      </h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <TextInput
          label="First Name"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          handleValidation={() => validateName("firstName")}
          required
          error={errors.firstName}
        />

        <TextInput
          label="Last Name"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          handleValidation={() => validateName("lastName")}
          required
          error={errors.lastName}
        />
      </div>
      <div className="space-y-4">
        <PhoneInput
          formattedPhoneNumber={formattedPhoneNumber}
          handlePhoneValidation={handlePhoneValidation}
          handlePhoneNumber={handlePhoneNumber}
          error={errors.phoneNumber}
        />

        <CorporationNumberInput
          handleCorporationNumber={handleCorporationNumber}
          handleCorporationValidation={handleCorporationValidation}
          error={errors.corporationNumber}
          setIsValidCorporationNumber={handleAsyncCorporationNumberValidation}
        />
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={status === "submitting" || isFormInvalid}
          className="w-full bg-black text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? (
            "Submitting..."
          ) : (
            <>
              Submit
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </>
          )}
        </button>
      </div>
      {status === "success" && (
        <p className="text-green-600 text-center font-medium mt-4">{serverMessage}</p>
      )}

      {status === "error" && (
        <p className="text-red-500 text-center font-medium mt-4">{serverMessage}</p>
      )}

    </form>
  )
}
