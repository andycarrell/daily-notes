import React from "react";

import MarkdownEditor from "./MarkdownEditor";

const cache = {};

const Note = ({ date }) => {
  const content = cache[date] ?? "";

  return (
    <MarkdownEditor
      key={date}
      content={content}
      onChange={(c) => {
        cache[date] = c;
      }}
    />
  );
};

export default Note;
