import { ID } from "../interfaces/common";

export enum CanvasReducerActionType {
  AddElement,
  RemoveElement,
  DragElement
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

export type CanvasReducerAction =
  | AddElementAction
  | RemoveElementAction
  | DragElementAction;
