import { useQuery, useQueryClient } from "react-query";

import { getItem } from "./indexeddb";

export type FeedItem = string[];

export const key = "feed-ids";

const queryFn = (key: string) => getItem<FeedItem>(key);

export const useUpdateFeedQuery = () => {
  const queryClient = useQueryClient();

  return (data: Awaited<ReturnType<typeof queryFn>>) => {
    queryClient.setQueryData(key, data);
  };
};

const useFeedQuery = () => useQuery(key, () => queryFn(key));

export default useFeedQuery;
