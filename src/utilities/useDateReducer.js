import { useReducer } from "react";

const changeDateByDays = (delta, date) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + delta);
  return copy.toISOString();
};

const reducer = (state, action) => {
  if (action === "increment-date") {
    return changeDateByDays(1, state);
  }

  if (action === "decrement-date") {
    return changeDateByDays(-1, state);
  }

  throw new Error(`Unknown action ${action} for useDateReducer`);
};

const useDateReducer = (initializer) =>
  useReducer(reducer, undefined, initializer);

export default useDateReducer;
