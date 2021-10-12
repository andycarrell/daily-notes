import { useQuery, useQueryClient } from "react-query";

import { getItem } from "./indexeddb";

export const keyFrom = (k) => `note-${k}`;

export const useUpdateNoteQuery = (key) => {
  const queryClient = useQueryClient();

  return (item) => queryClient.setQueryData(["note", key], item);
};

const useNoteQuery = (key) =>
  useQuery(["note", key], () => getItem(keyFrom(key)));

export default useNoteQuery;
