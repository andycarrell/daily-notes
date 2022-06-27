import { useQuery, useQueryClient } from "react-query";

import type { JSONContent } from "@tiptap/react";

import { getItem } from "./indexeddb";

export type NoteContent = JSONContent | JSONContent[] | null;

export const keyFrom = (k: string) => `note-${k}`;

const queryFn = (key: string) => getItem<NoteContent>(keyFrom(key));

export const useUpdateNoteQuery = (key: string) => {
  const queryClient = useQueryClient();

  return (data: Awaited<ReturnType<typeof queryFn>>) => {
    queryClient.setQueryData(key, data);
  };
};

const useNoteQuery = (key: string) =>
  useQuery(["note", key], () => queryFn(key));

export default useNoteQuery;
