import localforage from "localforage";

localforage.config({
  driver: localforage.INDEXEDDB,
  name: "daily-notes-app",
  version: 1.0,
});

export const getItem = async (key) => {
  const item = await localforage.getItem(key);
  return { item };
};

export const setItem = async (key, item) => {
  await localforage.setItem(key, item);
  return getItem(key);
};
