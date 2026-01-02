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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // update local state for debouncing/display
    setCorporationNumber(inputValue);
    // pass raw value to parent handler
    handleCorporationNumber(inputValue);
  };

  return <div className="flex flex-col gap-1.5">
    <label htmlFor="corporationNumber" className="text-sm font-bold text-gray-800 ml-1">Corporation Number</label>
    <input
      name="corporationNumber"
      id="corporationNumber"
      type="text"
      value={corporationNumber}
      onChange={handleChange}
      onBlur={handleCorporationValidation}
      maxLength={9}
      required
      className={`w-full border rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors ${
        error ? "border-red-500 bg-red-50" : "border-gray-200 bg-white"
      }`}
    />
    {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
  </div>;
}
