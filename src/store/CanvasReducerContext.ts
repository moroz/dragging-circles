import { Artwork } from "../interfaces/artwork";
import { ID } from "../interfaces/common";
import { CanvasReducerState } from "./CanvasReducerState";
import { createContext, useContext } from "react";

interface CanvasReducerContextValue {
  state: CanvasReducerState;
  moveElement: (id: ID, x: number, y: number) => void;
  reset: (shapes: Artwork[]) => void;
}

const CanvasReducerContext = createContext<CanvasReducerContextValue | null>(
  null
);

export default CanvasReducerContext;

export const useCanvasReducerContext = () => useContext(CanvasReducerContext)!;
