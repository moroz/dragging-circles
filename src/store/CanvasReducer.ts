import { Reducer, useCallback, useReducer } from "react";
import { Artwork } from "../interfaces/artwork";
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
    case CanvasReducerActionType.Loaded: {
      return {
        ...state,
        shapes: action.data
      };
    }

    case CanvasReducerActionType.DragElement:
      return {
        ...state,
        shapes: state.shapes.map((shape) => {
          if (String(shape.id) !== String(action.id)) return shape;
          return {
            ...shape,
            x: Math.round(action.x),
            y: Math.round(action.y)
          };
        })
      };

    default:
      return state;
  }
};

export const useCanvasReducer = () => {
  const [state, dispatch] = useReducer(CanvasReducer, initialState);

  const reset = useCallback(
    (shapes: Artwork[]) => {
      dispatch({
        type: CanvasReducerActionType.Loaded,
        data: shapes
      });
    },
    [dispatch]
  );

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
    moveElement,
    reset
  };
};
