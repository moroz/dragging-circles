import { Reducer, useReducer } from "react";
import { CanvasReducerState, initialState } from "./CanvasReducerState";

export const CanvasReducer: Reducer<CanvasReducerState, any> = (
  state,
  action
) => {
  switch (action) {
    default:
      return state;
  }
};

export const useCanvasReducer = () => {
  const [state, dispatch] = useReducer(CanvasReducer, initialState);

  return {
    state
  };
};
