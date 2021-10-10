import React, { useEffect } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

import Note from "./components/Note";
import Button from "./components/Button";
import { Page, Layout, Card } from "./components/layout";

import useDateReducer from "./utilities/useDateReducer";

const App = () => {
  const [date, dispatch] = useDateReducer();

  useEffect(() => {
    document.title = `${date.toDateString()} - daily-notes`;
  }, [date]);

  return (
    <div className="antialiased">
      <Page>
        <Layout>
          <Card>
            <div className="flex flex-row w-full justify-between items-center mb-3 sm:mb-6">
              <h1 className="text-xl sm:text-3xl font-serif text-gray-200 font-bold">
                {date.toDateString()}
              </h1>
              <div className="flex flex-row space-x-1">
                <Button
                  className="text-gray-300 hover:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-300"
                  onClick={() => dispatch("decrement-date")}
                >
                  <ChevronLeftIcon className="h-9 w-9" />
                </Button>
                <Button
                  className="text-gray-300 hover:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-300"
                  onClick={() => dispatch("increment-date")}
                >
                  <ChevronRightIcon className="h-9 w-9" />
                </Button>
              </div>
            </div>
            <Note date={date} />
          </Card>
        </Layout>
      </Page>
    </div>
  );
};

export default App;
