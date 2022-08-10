import { useRef, useCallback } from "react";
import { Artwork } from "../interfaces/artwork";
import { ID } from "../interfaces/common";
import { useCanvasReducerContext } from "../store/CanvasReducerContext";

export interface DraggingState {
  id: ID;
  offsetX: number;
  offsetY: number;
}

export default function useDraggableCanvas() {
  const { state, moveElement } = useCanvasReducerContext();

  const svgRef = useRef<SVGSVGElement>(null);
  const draggedElement = useRef<DraggingState>();

  const getMousePosition = useCallback(
    (e: React.MouseEvent) => {
      const ctm = svgRef.current!.getScreenCTM()!;
      return {
        x: (e.clientX - ctm.e) / ctm.a,
        y: (e.clientY - ctm.f) / ctm.d
      };
    },
    [svgRef]
  );

  const onDragStart = useCallback(
    (shape: Artwork) => (e: React.MouseEvent) => {
      const coords = getMousePosition(e);
      draggedElement.current = {
        id: shape.id,
        offsetX: coords.x - shape.x,
        offsetY: coords.y - shape.y
      };
    },
    [state]
  );

  const onDragEnd = useCallback(() => {
    draggedElement.current = undefined;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggedElement.current) return;

    const shape = draggedElement.current;
    const coords = getMousePosition(e);
    moveElement(shape.id, coords.x - shape.offsetX, coords.y - shape.offsetY);
  }, []);

  const onMouseLeave = useCallback(() => {
    draggedElement.current = undefined;
  }, [draggedElement]);

  return {
    onDragEnd,
    onDragStart,
    onMouseLeave,
    onMouseMove,
    svgRef
  };
}
