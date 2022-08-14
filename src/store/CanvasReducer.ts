import { Reducer, useCallback, useReducer } from "react";
import { ID } from "../interfaces/common";
import { Exhibition } from "../interfaces/exhibitions";
import {
  CanvasReducerAction,
  CanvasReducerActionType
} from "./CanvasReducerAction";
import {
  CanvasReducerMode,
  CanvasReducerState,
  initialState
} from "./CanvasReducerState";

export const CanvasReducer: Reducer<CanvasReducerState, CanvasReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case CanvasReducerActionType.Loaded: {
      return {
        ...state,
        exhibition: action.data,
        dirty: false,
        mode: CanvasReducerMode.Standby
      };
    }

    case CanvasReducerActionType.StartDragging: {
      return {
        ...state,
        dirty: false,
        mode: CanvasReducerMode.Moving
      };
    }

    case CanvasReducerActionType.ToggleCreating: {
      return {
        ...state,
        dirty: false,
        mode:
          state.mode === CanvasReducerMode.Creating
            ? CanvasReducerMode.Standby
            : CanvasReducerMode.Creating
      };
    }

    case CanvasReducerActionType.DragElement:
      if (!state.exhibition) return state;

      return {
        ...state,
        dirty: true,
        exhibition: {
          ...state.exhibition,
          artworks: state.exhibition?.artworks.map((shape) => {
            if (String(shape.id) !== String(action.id)) return shape;
            return {
              ...shape,
              x: Math.round(action.x),
              y: Math.round(action.y)
            };
          })
        }
      };

    default:
      return state;
  }
};

export const useCanvasReducer = () => {
  const [state, dispatch] = useReducer(CanvasReducer, initialState);

  const reset = useCallback((exhibition: Exhibition) => {
    dispatch({
      type: CanvasReducerActionType.Loaded,
      data: exhibition
    });
  }, []);

  const moveElement = useCallback((id: ID, x: number, y: number) => {
    dispatch({
      type: CanvasReducerActionType.DragElement,
      id,
      x,
      y
    });
  }, []);

  const startDragging = useCallback(() => {
    if (state.dirty || state.mode === CanvasReducerMode.Moving) return;
    dispatch({
      type: CanvasReducerActionType.StartDragging
    });
  }, [state.mode, state.dirty]);

  const toggleCreating = useCallback(() => {
    if (state.dirty) return;
    dispatch({
      type: CanvasReducerActionType.ToggleCreating
    });
  }, [state.dirty]);

  return {
    state,
    moveElement,
    reset,
    startDragging,
    toggleCreating
  };
};

export type CanvasReducerContextValue = ReturnType<typeof useCanvasReducer>;
