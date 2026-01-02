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
    <label htmlFor="phoneNumber" className="text-sm font-bold text-gray-800 ml-1">
        Phone Number
    </label>
    <input
      id="phoneNumber"
      type="tel"
      value={formattedPhoneNumber}
      onBlur={handlePhoneValidation}
      onChange={handlePhoneNumber}
      required
      className={`w-full border rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors ${
        error ? "border-red-500 bg-red-50" : "border-gray-200 bg-white"
      }`}
    />
    {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
  </div>;
}
