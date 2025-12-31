import { useState } from "react";
import TextInput from "./components/TextInput";

function App() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string }>({});

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

    </form>
  )
}

export default App
