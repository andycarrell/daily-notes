import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ClipboardListIcon, DocumentTextIcon } from "@heroicons/react/solid";

import Feed from "./components/Feed";
import { Page } from "./components/layout";
import DailyNotes from "./components/DailyNotes";
import { IconGrayButton } from "./components/Button";

const queryClient = new QueryClient();

const App = () => {
  const [variant, setVariant] = useState("notes");

  return (
    <div className="antialiased">
      <QueryClientProvider client={queryClient}>
        <Page>
          <div className="w-full flex flex-row justify-end p-4">
            {variant === "feed" && (
              <IconGrayButton
                aria-label="Show daily notes"
                onClick={() => {
                  setVariant("notes");
                }}
              >
                <ClipboardListIcon className="h-8 w-8" />
              </IconGrayButton>
            )}
            {variant === "notes" && (
              <IconGrayButton
                aria-label="Show feed"
                onClick={() => {
                  setVariant("feed");
                }}
              >
                <DocumentTextIcon className="h-8 w-8" />
              </IconGrayButton>
            )}
          </div>
          {variant === "feed" && <Feed />}
          {variant === "notes" && <DailyNotes />}
        </Page>
      </QueryClientProvider>
    </div>
  );
};

export default App;
