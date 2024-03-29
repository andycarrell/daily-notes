import { useNoteQuery } from "../api/useNoteQuery";
import { useNoteMutation } from "../api/useNoteMutation";

import { useIdleCallback } from "../utilities/useIdleCallback";
import { useDebounceFunction } from "../utilities/useDebounce";

import { SavingIndicator } from "./SavingIndicator";
import { MarkdownEditor } from "./MarkdownEditor";
import type { Props as MarkdownEditorProps } from "./MarkdownEditor";

interface Props {
  id: string;
  autofocus?: MarkdownEditorProps["autofocus"];
}

export const Note = ({ id, autofocus }: Props) => {
  const { mutate, isLoading: isSaving } = useNoteMutation(id);
  const { isError, isLoading, isFetching, data } = useNoteQuery(id);
  const { item: content } = data ?? {};

  // debounce for typing, idle callback so this isn't blocking
  const saveNote = useDebounceFunction(
    useIdleCallback(mutate, { timeout: 2000 }),
    300
  );

  if (isError || isLoading) {
    return null;
  }

  return (
    <div className="relative w-full">
      <MarkdownEditor
        key={id}
        content={content ?? ""}
        autofocus={autofocus}
        isEditable={!isFetching}
        onChange={saveNote}
      />
      <SavingIndicator isSaving={isSaving}>
        <p className="absolute top-1 right-1.5 text-xs text-gray-500 font-semibold uppercase">
          Saving
        </p>
      </SavingIndicator>
    </div>
  );
};
