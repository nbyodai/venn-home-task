interface PhoneInputInterface {
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
}: PhoneInputInterface) {
  return <div>
    <input
      id="phoneNumber"
      type="tel"
      value={formattedPhoneNumber}
      onBlur={handlePhoneValidation}
      onChange={handlePhoneNumber}
      required/>
    <label htmlFor="phoneNumber">Phone Number</label>
    {error && <p className="text-red-400">{error}</p>}
  </div>;
}
