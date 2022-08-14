import { createContext, useContext } from "react";
import { CanvasReducerContextValue } from "./CanvasReducer";

const CanvasReducerContext = createContext<CanvasReducerContextValue | null>(
  null
);

export default CanvasReducerContext;

export const useCanvasReducerContext = () => useContext(CanvasReducerContext)!;
