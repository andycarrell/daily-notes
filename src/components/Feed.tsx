import { Suspense, useEffect } from "react";
import { customAlphabet } from "nanoid";

import { ViewGridAddIcon } from "@heroicons/react/solid";

import { useFeedQuery } from "../api/useFeedQuery";
import { useFeedMutation } from "../api/useFeedMutation";

import { useSearchParam } from "../utilities/useSearchParam";
import { useScrollIntoViewport } from "../utilities/useScrollIntoViewport";

import { Note } from "./Note";
import { Layout } from "./layout";
import { IconGrayButton } from "./Button";
import { DownloadNotes } from "./DownloadNotes";
import { RenderIntoPortal } from "./RenderIntoPortal";
import { DeferUntilViewport } from "./DeferUntilViewport";

const feedKeyFrom = (key: string) => `feed-${key}`;
const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);

const FeedItem = ({ id }: { id: string }) => (
  <div className="flex flex-col-reverse pt-6">
    <h2 className="self-end text-sm text-gray-500 font-semibold my-2 mr-1">
      {id}
    </h2>
    <Note id={feedKeyFrom(id)} />
  </div>
);

export const Feed = () => {
  const { isError, data } = useFeedQuery();
  const { mutate } = useFeedMutation();
  const ids = data?.item ?? [];

  const [getSearchParam, , deleteSearchParam] = useSearchParam("f");
  useScrollIntoViewport({ id: `scroll-to-${getSearchParam()}` });
  // Remove search param on unmount
  useEffect(() => deleteSearchParam, [deleteSearchParam]);

  useEffect(() => {
    document.title = "Feed - daily-notes";
  }, []);

  if (isError) {
    return null;
  }

  return (
    <Layout className="max-w-4xl pt-0 md:pt-12">
      <RenderIntoPortal id="header-portal">
        <DownloadNotes ids={ids.map(feedKeyFrom)} />
      </RenderIntoPortal>
      <div className="flex flex-row w-full justify-between items-center px-4 mb-2 sm:mb-5 space-x-4">
        <h1 className="text-xl sm:text-3xl font-serif font-bold text-gray-200 sm:text-gray-300">
          Feed
        </h1>
        <IconGrayButton
          aria-label="Add new note"
          onClick={() => mutate([nanoid(), ...ids])}
          autoFocus
        >
          <ViewGridAddIcon className="h-7 w-7 sm:h-8 sm:w-8" />
        </IconGrayButton>
      </div>
      <div className="w-full divide-y divide-gray-600">
        {ids.map((id, index) => (
          <div key={id} className="relative min-h-[16rem]">
            {/** Render the first 3 items - assume these are 'above the fold' */}
            {index < 3 ? (
              <FeedItem id={id} />
            ) : (
              <DeferUntilViewport>
                <Suspense fallback={null}>
                  <FeedItem id={id} />
                </Suspense>
              </DeferUntilViewport>
            )}
            <div
              className="absolute -top-24"
              id={`scroll-to-${id}`}
              aria-hidden
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};
