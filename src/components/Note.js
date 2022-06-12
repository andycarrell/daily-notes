import React from "react";

import useNoteQuery from "../api/useNoteQuery";
import useNoteMutation from "../api/useNoteMutation";

import { useDebounceFunction } from "../utilities/useDebounce";

import SavingIndicator from "./SavingIndicator";
import MarkdownEditor from "./MarkdownEditor";

const Note = ({ id }) => {
  const { mutate, isLoading: isSaving } = useNoteMutation(id);
  const { isError, isLoading, isFetching, data } = useNoteQuery(id);
  const { item: content } = data ?? {};

  const saveNoteDebounced = useDebounceFunction(mutate, 1000);

  if (isError || isLoading) {
    return null;
  }

  return (
    <div className="relative w-full">
      <MarkdownEditor
        key={id}
        content={content ?? ""}
        isDisabled={isFetching}
        onChange={saveNoteDebounced}
      />
      <SavingIndicator isSaving={isSaving}>
        <p className="absolute top-1 right-1 text-xs text-gray-500 font-semibold uppercase">
          Saving
        </p>
      </SavingIndicator>
    </div>
  );
};

export default Note;
