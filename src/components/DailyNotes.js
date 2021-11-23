import React, { useEffect } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

import useDateReducer from "../utilities/useDateReducer";

import Note from "./Note";
import { Layout, Card } from "./layout";
import { IconGrayButton } from "./Button";

const PARAM = "d";
const START_OF_DAY_ISO = "T00:00:00.000Z";

const getSearchParam = () => {
  const url = new URL(window.location);
  const value = url.searchParams.get(PARAM);
  return value;
};

const updateSearchParam = (value) => {
  const url = new URL(window.location);
  url.searchParams.set(PARAM, value);
  window.history.pushState("", "", url.href);
};

const deleteSearchParam = () => {
  const url = new URL(window.location);
  url.searchParams.delete(PARAM);
  window.history.pushState("", "", url.href);
};

const startOfUTCTodayToISOString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const paddedDay =
    ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"][day] || day;

  return `${year}-${month}-${paddedDay}${START_OF_DAY_ISO}`;
};

const displayFromISOString = (date) => {
  // Strip the 'zero UTC offset', so notes appear on the same 'day' wherever & whenever they're viewed
  const stripZOffset = date.slice(0, -1);
  return new Date(stripZOffset).toDateString();
};

const getInitialDate = () => {
  const raw = getSearchParam();
  if (raw) {
    return `${raw}${START_OF_DAY_ISO}`;
  }
  return startOfUTCTodayToISOString();
};

const DailyNotes = () => {
  const [date, dispatch] = useDateReducer(getInitialDate);

  useEffect(() => {
    document.title = `${displayFromISOString(date)} - daily-notes`;
  }, [date]);

  useEffect(() => {
    const [rawDate] = date.split(START_OF_DAY_ISO);
    updateSearchParam(rawDate);
  }, [date]);

  // Remove search param on unmount
  useEffect(() => deleteSearchParam, []);

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
          <Note id={date} />
        </div>
      </Card>
    </Layout>
  );
};

export default DailyNotes;
