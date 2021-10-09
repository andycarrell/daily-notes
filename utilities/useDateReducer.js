import { useReducer } from "react";

const reducer = (state, action) => {
  if (action === "increment-date") {
    const copy = new Date(state);
    copy.setDate(state.getDate() + 1);
    return copy;
  }

  if (action === "decrement-date") {
    const copy = new Date(state);
    copy.setDate(state.getDate() - 1);
    return copy;
  }

  throw new Error(`Unknown action ${action} for useDateReducer`);
};

const useDateReducer = () => useReducer(reducer, undefined, () => new Date());

export default useDateReducer;
