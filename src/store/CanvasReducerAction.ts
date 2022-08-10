import { ID } from "../interfaces/common";
import { CanvasShape } from "./CanvasReducerState";

export enum CanvasReducerActionType {
  AddElement,
  RemoveElement,
  DragElement,
  Loaded
}

export interface AddElementAction {
  type: CanvasReducerActionType.AddElement;
  x: number;
  y: number;
}

export interface RemoveElementAction {
  type: CanvasReducerActionType.RemoveElement;
  id: ID;
}

export interface DragElementAction {
  type: CanvasReducerActionType.DragElement;
  id: ID;
  x: number;
  y: number;
}

export interface LoadedAction {
  type: CanvasReducerActionType.Loaded;
  data: CanvasShape[];
}

export type CanvasReducerAction =
  | AddElementAction
  | RemoveElementAction
  | DragElementAction
  | LoadedAction;
