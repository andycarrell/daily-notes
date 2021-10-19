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
      Heading,
      Typography,
      Code.configure({
        HTMLAttributes: {
          class: "text-pink-300",
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: "flex items-start space-x-4",
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "ml-px",
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: "cursor-pointer font-semibold hover:text-pink-400",
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
