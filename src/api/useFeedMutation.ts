import { useMutation } from "react-query";

import { setItem } from "./indexeddb";
import { useUpdateFeedQuery, key } from "./useFeedQuery";

const mutationFn = (items: string[]) => setItem(key, items);

const useFeedMutation = () => {
  const updateFeedQuery = useUpdateFeedQuery();

  return useMutation(mutationFn, {
    onSuccess({ item: newItems }) {
      updateFeedQuery(newItems);
    },
  });
};

export default useFeedMutation;
