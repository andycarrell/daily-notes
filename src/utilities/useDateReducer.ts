import { useReducer } from "react";

type State = string;
type Actions = "increment-date" | "decrement-date" | unknown;

const changeDateByDays = (delta: number, date: string) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + delta);
  return copy.toISOString();
};

const reducer = (state: State, action: Actions) => {
  if (action === "increment-date") {
    return changeDateByDays(1, state);
  }

  if (action === "decrement-date") {
    return changeDateByDays(-1, state);
  }

  throw new Error(`Unknown action ${action} for useDateReducer`);
};

export const useDateReducer = (initializer: () => State) =>
  useReducer(reducer, undefined, initializer);
