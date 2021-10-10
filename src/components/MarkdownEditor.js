import React, { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Code from "@tiptap/extension-code";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Typography from "@tiptap/extension-typography";
import { useEditor, EditorContent } from "@tiptap/react";

const MarkdownEditor = ({ content = "", onChange = () => {} }) => {
  const editor = useEditor({
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-pink text-gray-100 min-h-[16rem] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:bg-gray-700 rounded-md p-4",
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

  useEffect(() => {
    if (editor) {
      onChange(editor.getJSON());
    }
  });

  return <EditorContent editor={editor} />;
};

export default MarkdownEditor;
