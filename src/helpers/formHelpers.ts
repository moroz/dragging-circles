import { UseFormSetError } from "react-hook-form";
import { ErrorObject } from "../interfaces/common";

export const setFormErrors = (
  setError: UseFormSetError<any>,
  errorResponse?: ErrorObject | null
) => {
  if (!errorResponse) return;
  Object.entries(errorResponse).forEach(([key, errors]) => {
    if (typeof errors === "string") {
      setError(key, { type: "manual", message: errors });
      return;
    }
    if (Array.isArray(errors)) {
      errors.forEach((error) => {
        setError(key, { type: "manual", message: error });
      });
    }
  });
};
