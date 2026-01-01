// https://www.delftstack.com/howto/react/react-format-phone-number/#create-the-custom-logic-to-format-the-phone-number
export function formatPhoneNumber(input: string) {
  //  if the input is null, return a null value
  if (!input) return input;
  // remove all characters from the input except number input.
  const numberInput = input.replace(/[^\d]/g, "");
  //  take the length of the value of the input
  const numberInputLength = numberInput.length;
  // if the number length is 1, 2, or 3, then return it as it is.
  if (numberInputLength < 4) {
    return numberInput;
  } else if (numberInputLength < 7) {
    // if the number input length is 4, 5, or 6, format it accordingly.
    return `+1 (${numberInput.slice(0, 3)}) ${numberInput.slice(3)}`;
  } else {
    //  if the number input length is 7, 8, 9, 10, or more, format it like the below.
    return `+1 (${numberInput.slice(0, 3)}) ${numberInput.slice(3,6)}-${numberInput.slice(6, 10)}`;
  }
}

// https://www.allareacodes.com/canadian_area_codes.htm
export const isNotValidAreaCode = (code: number) =>
  ![204,226,236,249,250,289,306,343,387,416,418,431,437,438,450,506,519,548,581,604,613,647,705,709,778,780,782,807,819,867,905,902].includes(code)
