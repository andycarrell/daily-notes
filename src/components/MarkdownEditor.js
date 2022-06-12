import React, { useState } from "react";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Link from "@tiptap/extension-link";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import Document from "@tiptap/extension-document";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import Paragraph from "@tiptap/extension-paragraph";
import CodeBlock from "@tiptap/extension-code-block";
import HardBreak from "@tiptap/extension-hard-break";
import Blockquote from "@tiptap/extension-blockquote";
import Typography from "@tiptap/extension-typography";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { useEditor, EditorContent } from "@tiptap/react";

const useMarkdownEditor = ({ editorClass = "", ...rest }) =>
  useEditor({
    ...rest,
    editorProps: {
      attributes: {
        class:
          `markdown-editor prose prose-pink selection:bg-pink-300 selection:text-pink-900 text-gray-100 caret-pink-600 min-h-[16rem] max-w-full focus:outline-none p-4 ${editorClass}`.trim(),
      },
    },
    extensions: [
      Text,
      Document,
      Paragraph,
      Typography,
      Italic,
      Strike,
      History,
      CodeBlock,
      HardBreak,
      Underline,
      HorizontalRule,
      Bold.configure({
        HTMLAttributes: {
          class: "bold font-bold text-gray-100",
        },
      }),
      Code.configure({
        HTMLAttributes: {
          class: "code text-pink-300 before:content-[''] after:content-['']",
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class:
            "blockquote text-pink-200 [&_p]:before:content-[''] [&_p]:after:content-['']",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "list-item [&_>_*:first-child]:mt-3 [&_>_*:last-child]:mb-3",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "bullet-list pl-[18px] [&_li]:pl-2",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "ordered-list pl-5 [&_li]:marker:text-gray-100",
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "heading text-gray-100",
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "task-list pl-0",
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: `
            task-item flex items-start p-0 my-4
            [&_>_*:first-child]:mt-0 [&_>_*:last-child]:mb-0
            [&_div]:flex-auto [&_>_div_>_p]:m-0
            [&_label]:flex [&_label]:pt-1.5 [&_label]:select-none [&_label]:mr-2.5
          `,
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
    editorClass:
      "[&_.heading]:text-white/70 [&_.bold]:text-white/70 [&_p]:text-white/70",
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
