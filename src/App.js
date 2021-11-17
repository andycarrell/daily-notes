import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Page } from "./components/layout";
import DailyNotes from "./components/DailyNotes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="antialiased">
      <QueryClientProvider client={queryClient}>
        <Page>
          <DailyNotes />
        </Page>
      </QueryClientProvider>
    </div>
  );
};

export default App;
