import React from "react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Typography from "@tiptap/extension-typography";
import { useEditor, EditorContent } from "@tiptap/react";

const useMarkdownEditor = ({ editorClass = "", ...rest }) =>
  useEditor({
    ...rest,
    editorProps: {
      attributes: {
        class:
          `markdown-editor prose prose-pink text-gray-100 caret-pink-600 min-h-[16rem] focus:outline-none p-4 ${editorClass}`.trim(),
      },
    },
    extensions: [
      StarterKit,
      Typography,
      Bold.configure({
        HTMLAttributes: {
          class: "bold",
        },
      }),
      Code.configure({
        HTMLAttributes: {
          class: "code",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "list-item",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "bullet-list",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "ordered-list ml-[2px]",
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "heading",
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "task-list ml-px",
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: "task-item",
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
  });

  return <EditorContent editor={editor} />;
};

const MarkdownEditor = ({ content = "", onChange = () => {} }) => {
  const editor = useMarkdownEditor({
    content,
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    editorClass:
      "focus:ring-2 focus:ring-gray-600 focus:bg-gray-700 rounded-md",
  });

  return <EditorContent editor={editor} />;
};

export default MarkdownEditor;
