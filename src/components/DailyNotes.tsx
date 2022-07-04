import { Suspense, useEffect } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

import { useDateReducer } from "../utilities/useDateReducer";
import { useSearchParam } from "../utilities/useSearchParam";
import {
  rawToISOString,
  rawFromISOString,
  displayFromISOString,
  startOfUTCTodayToISOString,
} from "../utilities/dates";

import { Note } from "./Note";
import { Layout, Card } from "./layout";
import { IconGrayButton } from "./Button";

export const DailyNotes = () => {
  const [getSearchParam, updateSearchParam, deleteSearchParam] =
    useSearchParam("d");

  const [date, dispatch] = useDateReducer(() => {
    const raw = getSearchParam();
    if (raw) {
      return rawToISOString(raw);
    }
    return startOfUTCTodayToISOString();
  });

  useEffect(() => {
    document.title = `${displayFromISOString(date)} - daily-notes`;
  }, [date]);

  useEffect(() => {
    updateSearchParam(rawFromISOString(date));
  }, [date, updateSearchParam]);

  // Remove search param on unmount
  useEffect(() => deleteSearchParam, [deleteSearchParam]);

  return (
    <Layout className="max-w-2xl">
      <div className="flex flex-row w-full justify-between items-center mb-2 sm:mb-5">
        <h1 className="text-xl sm:text-3xl font-serif font-bold text-gray-200 sm:text-gray-300">
          {displayFromISOString(date)}
        </h1>
        <div className="flex flex-row space-x-1">
          <IconGrayButton
            aria-label="Decrement date"
            onClick={() => dispatch("decrement-date")}
          >
            <ChevronLeftIcon className="h-9 w-9 mr-0.5" />
          </IconGrayButton>
          <IconGrayButton
            aria-label="Increment date"
            onClick={() => dispatch("increment-date")}
          >
            <ChevronRightIcon className="h-9 w-9 ml-0.5" />
          </IconGrayButton>
        </div>
      </div>
      <Card>
        <div className="min-h-[16rem] w-full">
          <Suspense fallback={null}>
            <Note id={date} />
          </Suspense>
        </div>
      </Card>
    </Layout>
  );
};
