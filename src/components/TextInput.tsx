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
function TextInput({
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
    <div>
        <input
            type="text"
            name={name}
            id={name}
            maxLength={maxLength}
            required={required}
            value={value}
            onBlur={handleValidation}
            onChange={onChange}
        />
        <label htmlFor={name}>{label}</label>
        {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}

export default TextInput;
