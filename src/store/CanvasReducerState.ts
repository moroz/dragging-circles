import { Exhibition } from "../interfaces/exhibitions";

export enum CanvasReducerMode {
  Loading = "LOADING",
  Standby = "STANDBY",
  Moving = "MOVING",
  Creating = "CREATING"
}

export interface CanvasReducerState {
  exhibition: Exhibition | null;
  dirty: boolean;
  mode: CanvasReducerMode;
}

export const initialState: CanvasReducerState = {
  exhibition: null,
  dirty: false,
  mode: CanvasReducerMode.Loading
};
