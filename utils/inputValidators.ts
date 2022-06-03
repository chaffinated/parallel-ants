import {
  useRef,
  useMemo,
  useState,
  useEffect,
  ChangeEvent,
  FocusEvent,
  Dispatch,
} from 'react';


type Validator = (v: any) => string | undefined

interface DefaultProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => any,
  onFocus: (e: FocusEvent<HTMLInputElement>) => any,
  onBlur: (e: FocusEvent<HTMLInputElement>) => any,
}

export interface UseValidator<T> {
  value: T;
  setValue: Dispatch<any>;
  errors: string[];
  visit: () => any;
  visited: boolean;
  touch: () => any;
  touched: boolean;
  reset: () => any;
  dirty: boolean;
  defaultProps: DefaultProps;
}

export const useStateWithValidators = (initialValue: any, validators: Validator[]): UseValidator<typeof initialValue> => {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState([] as string[]);
  const [touched, setTouched] = useState(false);
  const [visited, setVisited] = useState(false);
  const [dirty, setDirty] = useState(false);
  const firstRun = useRef(true);

  const visit = () => setVisited(true);
  const touch = () => setTouched(true);
  const reset = () => {
    setValue(initialValue);
    setErrors([]);
    setTouched(false);
    setVisited(false);
    setDirty(false);
  };

  // Set errors only after first run
  useEffect(() => {
    if (!firstRun.current && !dirty) {
      setDirty(true);
    }
    const errs = validators
      .map((v) => v(value))
      .filter((m) => m != null) as string[];
    setErrors(errs);
  }, [value, touched, visited]);

  // Reset field when initialValue prop changes, only after first run
  useEffect(() => {
    if (firstRun.current) {
      return;
    }
    reset();
  }, [initialValue]);

  // First run should be set to complete
  useEffect(() => {
    firstRun.current = false;
  }, []);

  const defaultProps = {
    value,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setValue(e.target.value),
    onFocus: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => setTouched(true),
    onBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => setVisited(true),
  };

  return {
    setValue,
    value,
    visit,
    visited,
    touch,
    touched,
    errors,
    reset,
    dirty,
    defaultProps,
  };
};


export interface FormFields {
  [key: string]: UseValidator<any>;
}

export const useFormValues = (form: FormFields) => {
  const values = Object.entries(form).reduce((memo, [key, field]) => {
    return { ...memo, [key]: field.value };
  }, {});

  return useMemo(() => values, [JSON.stringify(values)]);
};
