import { useState } from "react";
import TextInput from "./components/TextInput";
import { formatPhoneNumber, isNotValidAreaCode } from "./utils";

function App() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>("");

  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string, phoneNumber?: string }>({});

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

  const handlePhoneNumber = (e: React.FormEvent<HTMLInputElement>) => {
    setPhoneNumber((e.target as HTMLInputElement).value);

    // format phone number
    const formattedPhoneNumber = formatPhoneNumber((e.target as HTMLInputElement).value);
    //  set the formatted phone number to the input value
    setFormattedPhoneNumber(formattedPhoneNumber);
  };

  return (
    <form>
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


      <div>
        <input
          id="phoneNumber"
          type="tel"
          value={formattedPhoneNumber}
          onBlur={handlePhoneValidation}
          onChange={handlePhoneNumber}
          required
          minLength={10}
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        {errors.phoneNumber && <p className="text-red-400">{errors.phoneNumber}</p>}
      </div>

    </form>
  )
}

export default App
