import React, { useState } from "react";

const Page = ({ children }) => (
  <div className="bg-gray-800 min-h-screen">{children}</div>
);

const Layout = ({ children }) => (
  <div className="h-full flex flex-col items-center px-4 sm:px-0 pt-[25vh]">
    {children}
  </div>
);

const App = () => {
  const [date] = useState(() => new Date());

  return (
    <Page>
      <Layout>
        <div className="max-w-xl w-full border-2 border-gray-600 bg-gray-700 bg-opacity-40 shadow-md rounded-lg p-5">
          <h1 className="text-3xl font-serif text-gray-300 font-bold mb-6">
            {date.toDateString()}
          </h1>
        </div>
      </Layout>
    </Page>
  );
};

export default App;
