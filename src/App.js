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
            <Card>
              <div className="flex flex-row w-full justify-between items-center mb-3 sm:mb-6">
                <h1 className="text-xl sm:text-3xl font-serif font-bold text-gray-200">
                  {displayFromISOString(date)}
                </h1>
                <div className="flex flex-row space-x-1">
                  <Button
                    className="text-gray-300 hover:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-300 pr-0.5"
                    onClick={() => dispatch("decrement-date")}
                  >
                    <ChevronLeftIcon className="h-9 w-9" />
                  </Button>
                  <Button
                    className="text-gray-300 hover:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-300 pl-0.5"
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
      </QueryClientProvider>
    </div>
  );
};

export default App;
