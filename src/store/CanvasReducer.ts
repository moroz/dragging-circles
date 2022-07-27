import { Reducer, useCallback, useReducer } from "react";
import { ID } from "../interfaces/common";
import {
  CanvasReducerAction,
  CanvasReducerActionType
} from "./CanvasReducerAction";
import { CanvasReducerState, initialState } from "./CanvasReducerState";

export const CanvasReducer: Reducer<CanvasReducerState, CanvasReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case CanvasReducerActionType.DragElement:
      return {
        ...state,
        shapes: state.shapes.map((shape) => {
          if (String(shape.id) !== String(action.id)) return shape;
          return {
            ...shape,
            x: action.x,
            y: action.y
          };
        })
      };

    default:
      return state;
  }
};

export const useCanvasReducer = () => {
  const [state, dispatch] = useReducer(CanvasReducer, initialState);

  const moveElement = useCallback(
    (id: ID, x: number, y: number) => {
      dispatch({
        type: CanvasReducerActionType.DragElement,
        id,
        x,
        y
      });
    },
    [dispatch]
  );

  return {
    state,
    moveElement
  };
};
