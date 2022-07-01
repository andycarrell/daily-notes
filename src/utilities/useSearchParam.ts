import { useMemo } from "react";

export const useSearchParam = (param: string) =>
  useMemo(() => {
    const get = () => {
      const url = new URL(window.location.href);
      const value = url.searchParams.get(param);
      return value;
    };

    const set = (value: string) => {
      const url = new URL(window.location.href);
      url.searchParams.set(param, value);
      window.history.pushState("", "", url.href);
    };

    const _delete = () => {
      const url = new URL(window.location.href);
      url.searchParams.delete(param);
      window.history.pushState("", "", url.href);
    };

    return [get, set, _delete] as const;
  }, [param]);
