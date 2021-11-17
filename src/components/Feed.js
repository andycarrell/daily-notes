import React, { useEffect } from "react";

import Note from "./Note";
import { Layout } from "./layout";

const Feed = () => {
  useEffect(() => {
    document.title = "Feed - daily-notes";
  }, []);

  return (
    <Layout className="max-w-4xl pt-0 md:pt-12">
      <div className="flex flex-row w-full justify-start items-center px-4 mb-2 sm:mb-5">
        <h1 className="text-xl sm:text-3xl font-serif font-bold text-gray-200 sm:text-gray-300">
          Feed
        </h1>
      </div>
      <Note id="feed" />
    </Layout>
  );
};

export default Feed;
