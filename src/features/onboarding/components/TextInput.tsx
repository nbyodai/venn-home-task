import { ErrorText, FormInputLabel } from "@/components/ui";
import { getInputClasses } from "@/utils";
import type { ChangeEvent } from "react";

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleValidation?: () => void;
  maxLength?: number;
  required?: boolean;
  error?: string;
}

export function TextInput({
  label,
  name,
  value,
  onChange,
  error,
  handleValidation,
  maxLength = 50,
  required = false,
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <FormInputLabel name={name} label={label} />
      <input
        type="text"
        name={name}
        id={name}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        onBlur={handleValidation}
        required={required}
        className={getInputClasses(!!error)}
      />
      {error && <ErrorText error={error} />}
    </div>
  );
}
