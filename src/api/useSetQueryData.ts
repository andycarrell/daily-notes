import { useCallback } from "react";
import { useQueryClient } from "react-query";

type Unwrap<T> = T extends Promise<infer U> ? U : T;

const useSetQueryData = <Data>(key: string) => {
  const queryClient = useQueryClient();

  return useCallback(
    (data: Unwrap<Data>) => {
      queryClient.setQueryData(key, data);
    },
    [key, queryClient]
  );
};

export default useSetQueryData;
