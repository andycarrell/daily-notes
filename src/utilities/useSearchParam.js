import { useCallback } from "react";

const useSearchParam = (param) => {
  const get = useCallback(() => {
    const url = new URL(window.location);
    const value = url.searchParams.get(param);
    return value;
  }, [param]);

  const set = useCallback(
    (value) => {
      const url = new URL(window.location);
      url.searchParams.set(param, value);
      window.history.pushState("", "", url.href);
    },
    [param]
  );

  const _delete = useCallback(() => {
    const url = new URL(window.location);
    url.searchParams.delete(param);
    window.history.pushState("", "", url.href);
  }, [param]);

  return [get, set, _delete];
};

export default useSearchParam;
