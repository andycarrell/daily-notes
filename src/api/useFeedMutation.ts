import { useMutation } from "@tanstack/react-query";

import { setItem } from "./indexeddb";
import { useUpdateFeedQuery, key } from "./useFeedQuery";

const mutationFn = (items: string[]) => setItem(key, items);

export const useFeedMutation = () =>
  useMutation(mutationFn, {
    onSuccess: useUpdateFeedQuery(),
  });
