import React from "react";

import useNoteQuery from "../api/useNoteQuery";
import useNoteMutation from "../api/useNoteMutation";

import { useDebounceFunction } from "../utilities/useDebounce";

import SavingIndicator from "./SavingIndicator";
import MarkdownEditor, { ReadOnlyEditor } from "./MarkdownEditor";

const Note = ({ date }) => {
  const { mutate, isLoading: isSaving } = useNoteMutation(date);
  const { isError, isLoading, isFetching, data } = useNoteQuery(date);
  const { item: content } = data ?? {};

  const saveNoteDebounced = useDebounceFunction(mutate, 1000);

  if (isError || isLoading) {
    return <div className="min-h-[16rem]" />;
  }

  if (isFetching) {
    return (
      <div className="min-h-[16rem]">
        <ReadOnlyEditor key={date} content={content ?? ""} />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="min-h-[16rem]">
        <MarkdownEditor
          key={date}
          content={content ?? ""}
          onChange={saveNoteDebounced}
        />
      </div>
      <SavingIndicator isSaving={isSaving}>
        <p className="absolute bottom-1 right-2 text-xs text-gray-500 font-semibold uppercase">
          Saving
        </p>
      </SavingIndicator>
    </div>
  );
};

export default Note;
