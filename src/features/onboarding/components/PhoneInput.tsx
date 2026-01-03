import { ErrorText, FormInputLabel } from "@/components/ui";
import { getInputClasses } from "@/utils";

interface PhoneInputProps {
  formattedPhoneNumber: string;
  handlePhoneValidation: () => void;
  handlePhoneNumber: (e: React.FormEvent<HTMLInputElement>) => void;
  error?: string;
}

export function PhoneInput({
  formattedPhoneNumber,
  handlePhoneValidation,
  handlePhoneNumber,
  error
}: PhoneInputProps) {
  return <div className="flex flex-col gap-1.5">
    <FormInputLabel name="phoneNumber" label="Phone Number" />
    <input
      id="phoneNumber"
      type="tel"
      value={formattedPhoneNumber}
      onBlur={handlePhoneValidation}
      onChange={handlePhoneNumber}
      required
      className={getInputClasses(!!error)}
    />
    {error && <ErrorText error={error} />}
  </div>;
}
