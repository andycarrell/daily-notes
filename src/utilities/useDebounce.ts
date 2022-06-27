import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";

export const useDebounceFunction = <A = unknown, R = void>(
  fn: (...args: A[]) => R,
  delay: number
) => {
  const id = useRef(null);
  const cb = useRef(fn);

  useLayoutEffect(() => {
    cb.current = fn;
  }, [fn]);

  return useCallback<(...args: A[]) => void>(
    (...args) => {
      clearTimeout(id.current);
      id.current = setTimeout(() => cb.current(...args), delay);
    },
    [delay]
  );
};

const useDebounce = <Value>(value: Value, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
