import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface CorporationNumberInputProps {
  handleCorporationValidation: () => void;
  handleCorporationNumber: (value: string) => void;
  setIsValidCorporationNumber: (isValid: boolean) => void;
  error?: string;
}

export function CorporationNumberInput({
  error,
  handleCorporationNumber,
  handleCorporationValidation,
  setIsValidCorporationNumber
}: CorporationNumberInputProps) {
  const [corporationNumber, setCorporationNumber] = useState<string>("");
  const debouncedCorporationNumber = useDebounce(corporationNumber, 500);

  useEffect(() => {
    // Reset validity if user clears input or too short
    if(debouncedCorporationNumber.length !== 9) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    async function validateCorporationNumber() {
      try {
        const response = await fetch(`https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/${debouncedCorporationNumber}`, { signal });
        if (!response.ok) {
          throw new Error("Validation failed");
        }

        const data = await response.json();

        if (data.valid) {
          handleCorporationNumber(debouncedCorporationNumber);
          setIsValidCorporationNumber(true);
        } else {
          setIsValidCorporationNumber(false);
        }
      } catch (error: unknown) {
        // Ignore AbortErrors (user changed input), log others
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        if (error instanceof Error) {
          console.error(error);
          setIsValidCorporationNumber(false);
        }
      }
    }

    validateCorporationNumber();
    return () => { controller.abort(); }
  }, [debouncedCorporationNumber, handleCorporationNumber, setIsValidCorporationNumber]);

  return <div>
    <input
      name="corporationNumber"
      id="corporationNumber"
      type="text"
      value={corporationNumber}
      onChange={(e) => setCorporationNumber(e.target.value)}
      onBlur={handleCorporationValidation}
      maxLength={9}
      required/>
    <label htmlFor="corporationNumber">Corporation Number</label>
    {error && <p className="text-red-400">{error}</p>}
  </div>;
}
