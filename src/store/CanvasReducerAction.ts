import { ID } from "../interfaces/common";
import { Exhibition } from "../interfaces/exhibitions";

export enum CanvasReducerActionType {
  AddElement,
  RemoveElement,
  DragElement,
  Loaded,
  StartDragging,
  ToggleCreating
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
  data: Exhibition;
}

export interface SimpleAction {
  type:
    | CanvasReducerActionType.ToggleCreating
    | CanvasReducerActionType.StartDragging;
}

export type CanvasReducerAction =
  | AddElementAction
  | RemoveElementAction
  | DragElementAction
  | LoadedAction
  | SimpleAction;
