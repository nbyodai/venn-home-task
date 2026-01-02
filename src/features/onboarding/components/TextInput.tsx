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
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-bold text-gray-800 ml-1">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        onBlur={handleValidation}
        required={required}
        className={`w-full border rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors ${
          error ? "border-red-500 bg-red-50" : "border-gray-200 bg-white"
        }`}
      />
      {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
    </div>
  );
}

export default TextInput;
