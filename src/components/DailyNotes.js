import React, { useEffect } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

import useDateReducer from "../utilities/useDateReducer";

import Note from "./Note";
import Button from "./Button";
import { Layout, Card } from "./layout";

const startOfUTCTodayToISOString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const paddedDay =
    ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"][day] || day;

  return `${year}-${month}-${paddedDay}T00:00:00.000Z`;
};

const displayFromISOString = (date) => {
  // Strip the 'zero UTC offset', so notes appear on the same 'day' wherever & whenever they're viewed
  const stripZOffset = date.slice(0, -1);
  return new Date(stripZOffset).toDateString();
};

const DailyNotes = () => {
  const [date, dispatch] = useDateReducer(startOfUTCTodayToISOString);

  useEffect(() => {
    document.title = `${displayFromISOString(date)} - daily-notes`;
  }, [date]);

  return (
    <Layout>
      <div className="flex flex-row w-full justify-between items-center mb-2 sm:mb-5">
        <h1 className="text-xl sm:text-3xl font-serif font-bold text-gray-200 sm:text-gray-300">
          {displayFromISOString(date)}
        </h1>
        <div className="flex flex-row space-x-1">
          <Button
            className="text-gray-400 hover:text-gray-300 focus-visible:ring-1 focus-visible:ring-gray-300"
            onClick={() => dispatch("decrement-date")}
          >
            <ChevronLeftIcon className="h-9 w-9 mr-0.5" />
          </Button>
          <Button
            className="text-gray-400 hover:text-gray-300 focus-visible:ring-1 focus-visible:ring-gray-300"
            onClick={() => dispatch("increment-date")}
          >
            <ChevronRightIcon className="h-9 w-9 ml-0.5" />
          </Button>
        </div>
      </div>
      <Card>
        <Note date={date} />
      </Card>
    </Layout>
  );
};

export default DailyNotes;
