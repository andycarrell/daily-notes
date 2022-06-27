import { useQuery } from "react-query";

import { getItem } from "./indexeddb";
import useSetQueryData from "./useSetQueryData";

export type FeedItem = string[];

export const key = "feed-ids";

const queryFn = (key: string) => getItem<FeedItem>(key);

export const useUpdateFeedQuery = () =>
  useSetQueryData<ReturnType<typeof queryFn>>(key);

const useFeedQuery = () => useQuery(key, () => queryFn(key));

export default useFeedQuery;
