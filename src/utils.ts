// https://www.delftstack.com/howto/react/react-format-phone-number/#create-the-custom-logic-to-format-the-phone-number
export function formatPhoneNumber(input: string) {
  // Return empty if null/undefined/empty string
  if (!input) return "";
  // Strip all non-digits
  const numberInput = input.replace(/[^\d]/g, "");
  const numberInputLength = numberInput.length;
  // 1. Digits 0-3: Return "+1 (XXX"
  // This ensures the formatting is stable from the very first character
  if (numberInputLength < 4) {
    return `+1 (${numberInput}`;
  }
  // 2. Digits 4-6: Return "+1 (XXX) XXX"
  else if (numberInputLength < 7) {
    return `+1 (${numberInput.slice(0, 3)}) ${numberInput.slice(3)}`;
  }
  // 3. Digits 7+: Return "+1 (XXX) XXX-XXXX"
  else {
    return `+1 (${numberInput.slice(0, 3)}) ${numberInput.slice(3, 6)}-${numberInput.slice(6, 10)}`;
  }
}

// https://www.allareacodes.com/canadian_area_codes.htm
export const isNotValidAreaCode = (code: number) =>
  ![204,226,236,249,250,289,306,343,387,416,418,431,437,438,450,506,519,548,581,604,613,647,705,709,778,780,782,807,819,867,905,902].includes(code)

export function getInputClasses(hasError: boolean): string {
  const baseClasses = "w-full border rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors";

  const stateClasses = hasError
    ? "border-red-500 bg-red-50"
    : "border-gray-200 bg-white";

  return `${baseClasses} ${stateClasses}`;
}
