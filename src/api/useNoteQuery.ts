import { useQuery } from "react-query";

import type { JSONContent } from "@tiptap/react";

import { getItem } from "./indexeddb";
import useSetQueryData from "./useSetQueryData";

export type NoteContent = JSONContent | JSONContent[] | null;

export const keyFrom = (k: string) => `note-${k}`;

const queryFn = (key: string) => getItem<NoteContent>(keyFrom(key));

export const useUpdateNoteQuery = (key: string) =>
  useSetQueryData<ReturnType<typeof queryFn>>(key);

const useNoteQuery = (key: string) =>
  useQuery(["note", key], () => queryFn(key));

export default useNoteQuery;
