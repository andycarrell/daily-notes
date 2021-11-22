import React, { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
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
      Underline,
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
      Blockquote.configure({
        HTMLAttributes: {
          class: "blockquote",
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
          class: "task-list -ml-px",
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
  const [hasFocus, setHasFocus] = useState(false);

  const editor = useMarkdownEditor({
    content,
    onBlur: () => setHasFocus(false),
    onFocus: () => setHasFocus(true),
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    editorClass:
      "focus:ring-2 focus:ring-gray-600 focus:bg-gray-700 rounded-md",
  });

  return (
    <div spellcheck={`${hasFocus}`}>
      <EditorContent editor={editor} />
    </div>
  );
};

export default MarkdownEditor;
