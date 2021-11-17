import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ClipboardListIcon, DocumentTextIcon } from "@heroicons/react/solid";

import Feed from "./components/Feed";
import Button from "./components/Button";
import { Page } from "./components/layout";
import DailyNotes from "./components/DailyNotes";

const queryClient = new QueryClient();

const App = () => {
  const [variant, setVariant] = useState("notes");

  return (
    <div className="antialiased">
      <QueryClientProvider client={queryClient}>
        <Page>
          <div className="w-full flex flex-row justify-end p-4">
            <Button
              className="text-gray-400 hover:text-gray-300 focus-visible:ring-1 focus-visible:ring-gray-300"
              onClick={() => {
                if (variant === "notes") {
                  setVariant("feed");
                }

                if (variant === "feed") {
                  setVariant("notes");
                }
              }}
            >
              {variant === "feed" && <ClipboardListIcon className="h-8 w-8" />}
              {variant === "notes" && <DocumentTextIcon className="h-8 w-8" />}
            </Button>
          </div>
          {variant === "feed" && <Feed />}
          {variant === "notes" && <DailyNotes />}
        </Page>
      </QueryClientProvider>
    </div>
  );
};

export default App;
