import { useQuery, useQueryClient } from "react-query";

import { getItem } from "./indexeddb";

export const key = "feed-ids";

export const useUpdateFeedQuery = () => {
  const queryClient = useQueryClient();

  return (item) => queryClient.setQueryData(key, item);
};

const useFeedQuery = () => useQuery(key, () => getItem(key));

export default useFeedQuery;
