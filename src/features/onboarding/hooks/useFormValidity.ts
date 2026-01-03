import { useMemo } from "react";

export function useFormValidity(
  errors: Record<string, string | undefined>,
  requiredValues: Record<string, string>
) {
  const isFormInvalid = useMemo(() => {
    // 1. Check for Active Errors
    // If any key in the error object has a string value, the form is invalid.
    const hasErrors = Object.values(errors).some((error) => error !== undefined);

    // 2. Check for Empty Required Fields
    // If any value in the requiredValues object is falsy (empty string), the form is invalid.
    const hasEmptyFields = Object.values(requiredValues).some((value) => !value);

    return hasErrors || hasEmptyFields;
  }, [errors, requiredValues]);

  return isFormInvalid;
}
