import { useMutation } from "react-query";
import type { JSONContent } from "@tiptap/react";

import { setItem } from "./indexeddb";
import { useUpdateNoteQuery, keyFrom } from "./useNoteQuery";

const mutationFn = (key: string, note: JSONContent) =>
  setItem(keyFrom(key), note);

export const useNoteMutation = (key: string) =>
  useMutation((note: JSONContent) => mutationFn(key, note), {
    onSuccess: useUpdateNoteQuery(key),
  });
