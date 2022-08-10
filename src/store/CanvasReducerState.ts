import { ID } from "../interfaces/common";

export interface CanvasShape {
  id: ID;
  x: number;
  y: number;
}

export interface CanvasReducerState {
  shapes: CanvasShape[];
}

export const initialState: CanvasReducerState = {
  shapes: []
};
