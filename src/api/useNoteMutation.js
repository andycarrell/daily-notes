import { useMutation } from "react-query";

import { setItem } from "./indexeddb";
import { useUpdateNoteQuery, keyFrom } from "./useNoteQuery";

const useNoteMutation = (key) => {
  const updateNoteQuery = useUpdateNoteQuery(key);

  return useMutation((note) => setItem(keyFrom(key), note), {
    onSuccess: ({ item: newItem }) => updateNoteQuery(newItem),
  });
};

export default useNoteMutation;
