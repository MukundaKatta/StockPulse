import { useState, useCallback } from 'react';

type FormErrors<T> = Partial<Record<keyof T, string>>;

interface UseFormStateReturn<T extends Record<string, unknown>> {
  values: T;
  errors: FormErrors<T>;
  setValue: <K extends keyof T>(key: K, value: T[K]) => void;
  setError: <K extends keyof T>(key: K, error: string | undefined) => void;
  reset: () => void;
  isValid: boolean;
}

export function useFormState<T extends Record<string, unknown>>(initialValues: T): UseFormStateReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const setValue = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const setError = useCallback(<K extends keyof T>(key: K, error: string | undefined) => {
    setErrors((prev) => {
      if (error === undefined) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: error };
    });
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0;

  return { values, errors, setValue, setError, reset, isValid };
}
