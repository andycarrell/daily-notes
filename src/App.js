import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

import Note from "./components/Note";
import Button from "./components/Button";
import { Page, Layout, Card } from "./components/layout";

import useDateReducer from "./utilities/useDateReducer";

const startOfUTCTodayToISOString = () => {
  const today = new Date();
  const startOfUTCToday = new Date(today.setUTCHours(0, 0, 0, 0));
  return startOfUTCToday.toISOString();
};

const displayFromISOString = (date) => new Date(date).toDateString();

const queryClient = new QueryClient();

const App = () => {
  const [date, dispatch] = useDateReducer(startOfUTCTodayToISOString);

  useEffect(() => {
    document.title = `${displayFromISOString(date)} - daily-notes`;
  }, [date]);

  return (
    <div className="antialiased">
      <QueryClientProvider client={queryClient}>
        <Page>
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
        </Page>
      </QueryClientProvider>
    </div>
  );
};

export default App;
