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
  shapes: [
    { id: 1, x: 50, y: 50 },
    { id: 2, x: 130, y: 80 }
  ]
};
