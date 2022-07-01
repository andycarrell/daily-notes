import { useRef, useCallback, useLayoutEffect } from "react";

type Fn = Parameters<typeof requestIdleCallback>[0];
type Options = Parameters<typeof requestIdleCallback>[1];

const idle = (fn: Fn, { timeout }: Options) => {
  if ("requestIdleCallback" in window) {
    const id = requestIdleCallback(fn, { timeout });
    return () => {
      cancelIdleCallback(id);
    };
  }

  const id = setTimeout(fn, timeout);
  return () => {
    clearTimeout(id);
  };
};

const useIdleCallback = <P = unknown, R = void>(
  fn: (...p: P[]) => R,
  { timeout }: Options
) => {
  const cancel = useRef(null);
  const callback = useRef(fn);

  useLayoutEffect(() => {
    callback.current = fn;
  }, [fn]);

  return useCallback<(...p: P[]) => void>(
    (...args) => {
      cancel.current?.();
      cancel.current = idle(() => callback.current(...args), { timeout });
    },
    [timeout]
  );
};

export default useIdleCallback;
