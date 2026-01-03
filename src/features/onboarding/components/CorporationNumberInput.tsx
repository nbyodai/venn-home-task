import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useCorporationValidation } from "../hooks/useCorporationValidation";
import { ErrorText, FormInputLabel } from "@/components/ui";
import { getInputClasses } from "@/utils";

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
    <FormInputLabel name="corporationNumber" label="Corporation Number" />
    <input
      name="corporationNumber"
      id="corporationNumber"
      type="text"
      value={corporationNumber}
      onChange={handleChange}
      onBlur={handleCorporationValidation}
      maxLength={9}
      required
      className={getInputClasses(!!error)}
    />
    {error && <ErrorText error={error} />}
  </div>;
}
