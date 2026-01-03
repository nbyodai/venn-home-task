import { useEffect, useRef } from "react";
import { ENDPOINTS } from "../../../api/endpoints";

interface UseCorporationValidationParams {
  corporationNumber: string;
  onValid: (number: string) => void;
  onInvalid: () => void;
}

export function useCorporationValidation({
  corporationNumber,
  onValid,
  onInvalid,
}: UseCorporationValidationParams) {

  const onValidRef = useRef(onValid);
  const onInvalidRef = useRef(onInvalid);

  useEffect(() => {
    onValidRef.current = onValid;
    onInvalidRef.current = onInvalid;
  }, [onValid, onInvalid]);

  useEffect(() => {
    // 1. Guard clause: Don't validate if length is wrong
    if (corporationNumber.length !== 9) {
      return;
    }

    // 2. Setup AbortController
    const controller = new AbortController();
    const signal = controller.signal;

    async function validate() {
      try {
        const response = await fetch(
          ENDPOINTS.CORPORATION_VALIDATION(corporationNumber),
          { signal }
        );

        if (!response.ok) {
          throw new Error("Validation failed");
        }

        const data = await response.json();

        if (data.valid) {
          onValidRef.current(corporationNumber);
        } else {
          onInvalidRef.current();
        }
      } catch (error: unknown) {
        // Ignore AbortError (user typed again)
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        // Treat network errors as invalid (or add onError callback if preferred)
        if (error instanceof Error) {
          console.error(error);
          onInvalidRef.current();
        }
      }
    }

    validate();

    // 3. Cleanup
    return () => {
      controller.abort();
    };
  }, [corporationNumber]);
}
