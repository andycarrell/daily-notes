import { useQuery, useQueryClient } from "react-query";

import { getItem } from "./indexeddb";

export const keyFrom = (k) => `note-${k}`;

export const useUpdateNoteQuery = (key) => {
  const queryClient = useQueryClient();

  return (item) => queryClient.setQueryData(["note", key], item);
};

export const useNotesQuery = (keys, options = {}) =>
  useQuery(
    ["notes", keys],
    () => Promise.all(keys.map((key) => getItem(keyFrom(key)))),
    options
  );

const useNoteQuery = (key) =>
  useQuery(["note", key], () => getItem(keyFrom(key)));

export default useNoteQuery;
