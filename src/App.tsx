import { Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ClipboardListIcon, DocumentTextIcon } from "@heroicons/react/solid";

import Feed from "./components/Feed";
import { Page } from "./components/layout";
import DailyNotes from "./components/DailyNotes";
import { IconGrayButton } from "./components/Button";
import DownloadNotes from "./components/DownloadNotes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const App = () => {
  const [variant, setVariant] = useState("notes");

  return (
    <div className="antialiased">
      <QueryClientProvider client={queryClient}>
        <Page>
          <Suspense fallback={null}>
            <div className="bg-gray-800 lg:bg-transparent w-full sm:sticky inset-0 z-10 flex flex-row justify-end p-4 space-x-2">
              {variant === "feed" ? <DownloadNotes /> : null}
              <div role="tablist">
                {variant === "feed" ? (
                  <IconGrayButton
                    role="tab"
                    aria-selected="true"
                    aria-controls="daily-notes"
                    aria-label="Show daily notes"
                    onClick={() => {
                      setVariant("notes");
                    }}
                  >
                    <ClipboardListIcon />
                  </IconGrayButton>
                ) : null}
                {variant === "notes" ? (
                  <IconGrayButton
                    role="tab"
                    aria-selected="true"
                    aria-controls="feed"
                    aria-label="Show feed"
                    onClick={() => {
                      setVariant("feed");
                    }}
                  >
                    <DocumentTextIcon />
                  </IconGrayButton>
                ) : null}
              </div>
            </div>
            {variant === "feed" ? (
              <div role="tabpanel" id="feed">
                <Feed />
              </div>
            ) : null}
            {variant === "notes" ? (
              <div role="tabpanel" id="daily-notes">
                <DailyNotes />
              </div>
            ) : null}
          </Suspense>
        </Page>
      </QueryClientProvider>
    </div>
  );
};

export default App;
