import { Artwork } from "../interfaces/artwork";

export interface CanvasReducerState {
  shapes: Artwork[];
}

export const initialState: CanvasReducerState = {
  shapes: []
};
