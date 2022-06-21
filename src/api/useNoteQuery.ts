import { useQuery, useQueryClient } from "react-query";
import type { UseQueryOptions } from "react-query";

import type { JSONContent } from "@tiptap/react";

import { getItem } from "./indexeddb";

export type NoteContent = JSONContent | JSONContent[] | null;

export const keyFrom = (k: string) => `note-${k}`;

const notesQueryFn = (keys: string[]) =>
  Promise.all(
    keys.map(async (key: string) => ({
      [key]: await getItem<NoteContent>(keyFrom(key)),
    }))
  );

const noteQueryFn = (key: string) => getItem<NoteContent>(keyFrom(key));

export const useUpdateNoteQuery = (key: string) => {
  const queryClient = useQueryClient();

  return (item: NoteContent) =>
    queryClient.setQueryData(["note", key], { item });
};

export const useNotesQuery = <TData = ReturnType<typeof notesQueryFn>>(
  keys: string[],
  options: UseQueryOptions<ReturnType<typeof notesQueryFn>, unknown, TData> = {}
) =>
  useQuery<ReturnType<typeof notesQueryFn>, unknown, TData>(
    ["notes", keys],
    () => notesQueryFn(keys),
    options
  );

const useNoteQuery = (key: string) =>
  useQuery(["note", key], () => noteQueryFn(key));

export default useNoteQuery;
