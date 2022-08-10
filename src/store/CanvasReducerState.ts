import { Exhibition } from "../interfaces/exhibitions";

export interface CanvasReducerState {
  exhibition: Exhibition | null;
}

export const initialState: CanvasReducerState = {
  exhibition: null
};
