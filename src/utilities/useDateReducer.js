import { useReducer } from "react";

const changeDateByDays = (delta, date) => {
  const copy = new Date(date);
  copy.setDate(date.getDate() + delta);
  return copy;
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

const useDateReducer = () => useReducer(reducer, undefined, () => new Date());

export default useDateReducer;
