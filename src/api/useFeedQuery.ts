import { useQuery } from "@tanstack/react-query";

import { getItem } from "./indexeddb";
import { useSetQueryData } from "./useSetQueryData";

export type FeedItem = string[];

export const key = "feed-ids";

const queryKey = (key: string) => [key] as const;
const queryFn = (key: string) => getItem<FeedItem>(key);

export const useUpdateFeedQuery = () =>
  useSetQueryData<ReturnType<typeof queryFn>>(queryKey(key));

export const useFeedQuery = () => useQuery(queryKey(key), () => queryFn(key));
