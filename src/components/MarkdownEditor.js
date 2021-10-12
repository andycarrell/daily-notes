import React from "react";
import StarterKit from "@tiptap/starter-kit";
import Code from "@tiptap/extension-code";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Typography from "@tiptap/extension-typography";
import { useEditor, EditorContent } from "@tiptap/react";

const useMarkdownEditor = ({ editorClass = "", ...rest }) =>
  useEditor({
    ...rest,
    editorProps: {
      attributes: {
        class:
          `prose prose-pink min-h-[16rem] focus:outline-none p-4 ${editorClass}`.trim(),
      },
    },
    extensions: [
      StarterKit,
      TaskItem,
      TaskList,
      Typography,
      Code,
      Link.configure({
        HTMLAttributes: {
          class: "cursor-pointer font-semibold hover:opacity-80",
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "font-serif font-semibold",
        },
      }),
    ],
  });

export const ReadOnlyEditor = ({ content = "" }) => {
  const editor = useMarkdownEditor({
    content,
    editable: false,
    editorClass: "text-gray-300",
  });

  return <EditorContent editor={editor} />;
};

const MarkdownEditor = ({ content = "", onChange = () => {} }) => {
  const editor = useMarkdownEditor({
    content,
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    editorClass:
      "text-gray-100 focus:ring-2 focus:ring-gray-600 focus:bg-gray-700 rounded-md",
  });

  return <EditorContent editor={editor} />;
};

export default MarkdownEditor;
