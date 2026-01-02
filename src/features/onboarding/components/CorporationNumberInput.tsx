import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useCorporationValidation } from "../hooks/useCorporationValidation";

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

  useCorporationValidation({
    corporationNumber: debouncedCorporationNumber,
    onValid: (number: string) => {
      setIsValidCorporationNumber(true);
      handleCorporationNumber(number);
    },
    onInvalid: () => {
      setIsValidCorporationNumber(false);
    },
  })

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
