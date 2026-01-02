import { useState } from "react";
import { isNotValidAreaCode, formatPhoneNumber } from "../../utils";
import { CorporationNumberInput } from "./components/CorporationNumberInput";
import { PhoneInput } from "./components/PhoneInput";
import TextInput from "./components/TextInput";
import { ENDPOINTS } from "../../api/endpoints";

export function OnboardingForm() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>("");
  const [corporationNumber, setCorporationNumber] = useState<string>("");

  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string, phoneNumber?: string, corporationNumber?: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  function handleValidation() {
    const newErrors: { firstName?: string; lastName?: string } = {};
    if (!firstName) {
      newErrors.firstName = "First Name is required";
    } else if (firstName.length < 2) {
      newErrors.firstName = "First Name is should be at least 2 characters";
    }
    else if (!/^[A-Za-z-]+$/.test(firstName)) {
      newErrors.firstName = "First Name should contain only letters and dashes";
    }

    if (!lastName) {
      newErrors.lastName = "Last Name is required";
    } else if (lastName.length < 2) {
      newErrors.lastName = "Last Name is should be at least 2 characters";
    }
    else if (!/^[A-Za-z-]+$/.test(lastName)) {
      newErrors.lastName = "Last Name should contain only letters and dashes";
    }


    setErrors(newErrors);
  }

  function handlePhoneValidation() {
    const newErrors: { phoneNumber?: string } = {};
    if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone Number should be 10 digits";
    } else if (isNotValidAreaCode(parseInt(phoneNumber.slice(0, 3), 10))) {
      newErrors.phoneNumber = "Phone Number has invalid area code";
    }
    setErrors(newErrors);
  }

  function handleCorporationValidation() {
    const newErrors: { corporationNumber?: string } = {};
    if (!/^\d{9}$/.test(corporationNumber)) {
      newErrors.corporationNumber = "Corporation Number should be 9 digits";
    }
    setErrors(newErrors);
  }

  const handlePhoneNumber = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    const rawDigits = inputValue.replace(/\D/g, "");
    if (rawDigits.length > 10) return;
    setPhoneNumber(rawDigits);
    const formattedPhoneNumber = formatPhoneNumber(rawDigits);
    setFormattedPhoneNumber(formattedPhoneNumber);
  };

  const handleCorporationNumber = (value: string) => {
    setCorporationNumber(value);
  };

  const handleSubmit = async(e: React.FormEvent) => {
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
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold">Onboarding Form</h1>
      <div>
        <div>
          <TextInput
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            handleValidation={handleValidation}
            required
            error={errors.firstName}
          />
        </div>

        <div>
          <TextInput
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            handleValidation={handleValidation}
            required
            error={errors.lastName}
          />
        </div>
      </div>

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
        setIsValidCorporationNumber={() => {}}
      />

      <div>
        <button type="submit">
          {status === "submitting" ? "Submitting..." : "Submit"}
        </button>
      </div>
      {status === "success" && (
        <p className="text-green-600 font-bold mt-2">{serverMessage}</p>
      )}

      {status === "error" && (
        <p className="text-red-600 font-bold mt-2">{serverMessage}</p>
      )}

    </form>
  )
}
