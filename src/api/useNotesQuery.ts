import { useQuery } from "react-query";
import type { UseQueryOptions } from "react-query";

import { getItem } from "./indexeddb";
import { keyFrom } from "./useNoteQuery";
import type { NoteContent } from "./useNoteQuery";

const queryFn = (keys: string[]) =>
  Promise.all(
    keys.map(async (key: string) => ({
      [key]: await getItem<NoteContent>(keyFrom(key)),
    }))
  );

export const useNotesQuery = <TData = ReturnType<typeof queryFn>>(
  keys: string[],
  options: UseQueryOptions<ReturnType<typeof queryFn>, unknown, TData> = {}
) =>
  useQuery<ReturnType<typeof queryFn>, unknown, TData>(
    ["notes", keys],
    () => queryFn(keys),
    options
  );
