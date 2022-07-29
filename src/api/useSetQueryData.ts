import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";

type Unwrap<T> = T extends Promise<infer U> ? U : T;

export const useSetQueryData = <Data>(key: QueryKey) => {
  const queryClient = useQueryClient();

  return useCallback(
    (data: Unwrap<Data>) => {
      queryClient.setQueryData(key, data);
    },
    [key, queryClient]
  );
};
