import { Exhibition } from "../interfaces/exhibitions";

export interface CanvasReducerState {
  exhibition: Exhibition | null;
  dirty: boolean;
}

export const initialState: CanvasReducerState = {
  exhibition: null,
  dirty: false
};
