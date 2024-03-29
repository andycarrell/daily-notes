import { useState } from "react";
import {
  ClipboardCopyIcon,
  DocumentDownloadIcon,
  DocumentIcon,
  RefreshIcon,
} from "@heroicons/react/solid";

import { useNotesQuery } from "../api/useNotesQuery";

import {
  rawFromISOString,
  startOfUTCTodayToISOString,
} from "../utilities/dates";

import { IconGrayButton, IconGrayLink } from "./Button";

const getStartOfTodayRaw = () => rawFromISOString(startOfUTCTodayToISOString());
const stringifyAndEncode = (data: unknown) => {
  const encoded = encodeURIComponent(JSON.stringify(data));
  return `data:text/json;charset=utf-8,${encoded}`;
};

export const DownloadNotes = ({ ids }: { ids: string[] }) => {
  const [state, setState] = useState<"idle" | "load">("idle");
  const { data, isFetching } = useNotesQuery(ids, {
    suspense: false,
    enabled: state === "load",
    select: stringifyAndEncode,
    refetchInterval: 3 * 60 * 1000,
  });

  if (data) {
    return (
      <IconGrayLink
        href={data}
        aria-label="Download notes"
        download={`daily-notes-${getStartOfTodayRaw()}.json`}
      >
        <DocumentDownloadIcon />
      </IconGrayLink>
    );
  }

  if (isFetching) {
    return (
      <div className="relative cursor-wait text-gray-500" aria-busy="true">
        <DocumentIcon className="h-8 w-8" role="presentation" />
        <div className="absolute bottom-1.5 inset-x-2 animate-spin-slow">
          <RefreshIcon
            className="h-4 w-4 text-gray-400 scale-x-[-1]"
            role="presentation"
          />
        </div>
      </div>
    );
  }

  return (
    <IconGrayButton
      aria-label="Generate download for notes"
      onClick={() => {
        setState("load");
      }}
    >
      <ClipboardCopyIcon className="translate-x-[0.1rem]" />
    </IconGrayButton>
  );
};
