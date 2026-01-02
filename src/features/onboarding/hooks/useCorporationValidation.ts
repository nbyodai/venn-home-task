import { useEffect } from "react";
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
          onValid(corporationNumber);
        } else {
          onInvalid();
        }
      } catch (error: unknown) {
        // Ignore AbortError (user typed again)
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        // Treat network errors as invalid (or add onError callback if preferred)
        if (error instanceof Error) {
          console.error(error);
          onInvalid();
        }
      }
    }

    validate();

    // 3. Cleanup
    return () => {
      controller.abort();
    };
  }, [corporationNumber, onValid, onInvalid]);
}
