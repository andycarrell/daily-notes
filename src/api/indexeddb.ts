import localforage from "localforage";

localforage.config({
  driver: localforage.INDEXEDDB,
  name: "daily-notes-app",
  version: 1.0,
});

export const getItem = async <Item>(key: string) => {
  const item = await localforage.getItem<Item | null>(key);
  return { item };
};

export const setItem = async <Item>(key: string, item: Item) => {
  await localforage.setItem(key, item);
  return getItem<Item | null>(key);
};
