import React, { useEffect } from "react";
import { customAlphabet } from "nanoid";

import { ViewGridAddIcon } from "@heroicons/react/solid";

import useFeedQuery from "../api/useFeedQuery";
import useFeedMutation from "../api/useFeedMutation";

import Note from "./Note";
import { Layout } from "./layout";
import { IconGrayButton } from "./Button";

// TODO - move this into a utility file
const getSearchParam = () => {
  const url = new URL(window.location);
  const value = url.searchParams.get("f");
  return value;
};

const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);

const ScrollElementIntoView = ({ id }) => {
  useEffect(() => {
    const node = document.getElementById(id);

    if (node) {
      const id = setTimeout(
        () =>
          node.scrollIntoView({
            block: "start",
            inline: "nearest",
            behavior: "smooth",
          }),
        300
      );

      return () => clearTimeout(id);
    }
  }, [id]);

  return null;
};

const Feed = () => {
  const { isError, isLoading, data } = useFeedQuery();
  const { mutate } = useFeedMutation();
  const ids = data?.item ?? [];

  useEffect(() => {
    document.title = "Feed - daily-notes";
  }, []);

  if (isError) {
    return null;
  }

  return (
    <Layout className="max-w-4xl pt-0 md:pt-12">
      <div className="flex flex-row w-full justify-between items-center px-4 mb-2 sm:mb-5 space-x-4">
        <h1 className="text-xl sm:text-3xl font-serif font-bold text-gray-200 sm:text-gray-300">
          Feed
        </h1>
        <IconGrayButton
          aria-label="Add new note"
          onClick={() => mutate([nanoid(), ...ids])}
        >
          <ViewGridAddIcon className="h-7 w-7 sm:h-8 sm:w-8" />
        </IconGrayButton>
      </div>
      {isLoading ? null : (
        <div className="w-full divide-y divide-gray-600">
          {ids.map((id) => (
            <div id={id} key={id} className="flex flex-col-reverse pt-6">
              <h2 className="self-end text-sm text-gray-500 font-semibold my-2 mr-1">
                {id}
              </h2>
              <Note id={`feed-${id}`} />
            </div>
          ))}
          {/** Temporarily here until content can be migrated */}
          <Note id="feed" className="py-6" />
          <ScrollElementIntoView id={getSearchParam()} />
        </div>
      )}
    </Layout>
  );
};

export default Feed;
