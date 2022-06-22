import { JSONContent } from "@tiptap/react";
import { useMutation } from "react-query";

import { setItem } from "./indexeddb";
import { useUpdateNoteQuery, keyFrom } from "./useNoteQuery";

const mutationFn = (key: string, note: JSONContent) =>
  setItem(keyFrom(key), note);

const useNoteMutation = (key: string) => {
  const updateNoteQuery = useUpdateNoteQuery(key);

  return useMutation((note: JSONContent) => mutationFn(key, note), {
    onSuccess({ item: newItem }) {
      updateNoteQuery(newItem);
    },
  });
};

export default useNoteMutation;
