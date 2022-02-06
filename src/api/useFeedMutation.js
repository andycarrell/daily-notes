import { useMutation } from "react-query";

import { setItem } from "./indexeddb";
import { useUpdateFeedQuery, key } from "./useFeedQuery";

const useFeedMutation = () => {
  const updateFeedQuery = useUpdateFeedQuery();

  return useMutation((items) => setItem(key, items), {
    onSuccess: (newItems) => updateFeedQuery(newItems),
  });
};

export default useFeedMutation;
