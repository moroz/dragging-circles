import { ID } from "../interfaces/common";
import { CanvasReducerState } from "./CanvasReducerState";
import { createContext, useContext } from "react";
import { Exhibition } from "../interfaces/exhibitions";

interface CanvasReducerContextValue {
  state: CanvasReducerState;
  moveElement: (id: ID, x: number, y: number) => void;
  reset: (shapes: Exhibition) => void;
}

const CanvasReducerContext = createContext<CanvasReducerContextValue | null>(
  null
);

export default CanvasReducerContext;

export const useCanvasReducerContext = () => useContext(CanvasReducerContext)!;
