import { useCallback, useState } from "react";
import { type MortgageFormData } from "../components/MgCalculator/MortgageCalculator";

type FormFields = "amount" | "term" | "interestRate";

type ValidationRule =
  | { type: "IsRequired"; message: string }
  | { type: "IsNumber"; message: string }
  | { type: "Min"; value: number; message: string }
  | { type: "Max"; value: number; message: string };

const validationRules: Record<FormFields, ValidationRule[]> = {
  amount: [{ type: "IsRequired", message: "The field is required" }],
  term: [
    { type: "IsRequired", message: "The field is required" },
    { type: "IsNumber", message: "Mortgage term must be a number" },
    { type: "Min", value: 1, message: "Mortgage term must be at least 1 year" },
    { type: "Max", value: 50, message: "Mortgage term cannot exceed 50 years" },
  ],
  interestRate: [{ type: "IsRequired", message: "The field is required" }],
};

type ValidationErrors = Record<string, string[]>;

export function useValidation() {
  const [errors, setErrors] = useState<ValidationErrors>({}); // state

  const validateField = useCallback(
    <K extends keyof MortgageFormData>(
      field: K,
      value: MortgageFormData[K]
    ): string[] => {
      const rules =
        validationRules[field as keyof typeof validationRules] || [];

      const fieldsErrors: string[] = [];

      for (const rule of rules) {
        switch (rule.type) {
          case "IsRequired":
            if (
              value === undefined ||
              value === null ||
              (typeof value === "number" && value === 0)
            ) {
              fieldsErrors.push(rule.message);
            }
            break;
          case "IsNumber":
            if (isNaN(Number(value))) {
              fieldsErrors.push(rule.message);
            }
            break;
          case "Min":
            if (Number(value) < rule.value) {
              fieldsErrors.push(rule.message);
            }
            break;
          case "Max":
            if (Number(value) > rule.value) {
              fieldsErrors.push(rule.message);
            }
            break;
        }
      }

      return fieldsErrors;
    },
    []
  );

  const validateForm = useCallback(
    (data: MortgageFormData) => {
      const formErrors: Partial<Record<keyof MortgageFormData, string[]>> = {};

      (Object.keys(data) as (keyof MortgageFormData)[]).forEach((field) => {
        const fieldErrors = validateField(field, data[field]);

        if (fieldErrors.length > 0) {
          formErrors[field] = fieldErrors;
        }
      });

      setErrors(formErrors);

      return Object.keys(formErrors).length === 0;
    },
    [validateField]
  );

  return {
    errors,
    validateForm,
  };
}
