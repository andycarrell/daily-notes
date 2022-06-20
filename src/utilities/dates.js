const START_OF_DAY_ISO = "T00:00:00.000Z";

export const rawToISOString = (date) => `${date}${START_OF_DAY_ISO}`;
export const rawFromISOString = (date) => {
  const [raw] = date.split(START_OF_DAY_ISO);
  return raw;
};

export const startOfUTCTodayToISOString = () => {
  const pad = (p) =>
    ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"][p] ?? p;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return `${year}-${pad(month)}-${pad(day)}${START_OF_DAY_ISO}`;
};

export const displayFromISOString = (date) => {
  // Strip the 'zero UTC offset', so notes appear on the same 'day' wherever & whenever they're viewed
  const stripZOffset = date.slice(0, -1);
  return new Date(stripZOffset).toDateString();
};
