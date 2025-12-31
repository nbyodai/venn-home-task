import { useState } from "react";

function App() {
  const [firstName, setFirstName] = useState<string>("");
  // const [lastName, setLastName] = useState<string>("");

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

    setErrors(newErrors);
  }

  return (
    <form>
      <h1 className="text-3xl font-bold">Onboarding Form</h1>
      <div>
        <div>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onBlur={handleValidation}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label htmlFor="firstName">First Name</label>
          {errors.firstName && <p className="text-red-400">{errors.firstName}</p>}
        </div>


        <div>
          <input type="text" name="lastName" id="lastName" />
          <label htmlFor="lastName">Last Name</label>
          <p>Last Name is required</p>
        </div>
      </div>

    </form>
  )
}

export default App
