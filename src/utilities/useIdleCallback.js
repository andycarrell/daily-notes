import { useRef, useCallback, useLayoutEffect } from "react";

const idle = (fn, { timeout }) => {
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

const useIdleCallback = (fn, { timeout }) => {
  const cancel = useRef(null);
  const callback = useRef(fn);

  useLayoutEffect(() => {
    callback.current = fn;
  }, [fn]);

  return useCallback(
    (...args) => {
      cancel.current?.();
      cancel.current = idle(() => callback.current(...args), { timeout });
    },
    [timeout]
  );
};

export default useIdleCallback;
