import { useRef, useCallback, useState } from "react";
import {
  useCreateArtworkMutation,
  useSaveArtworkLayoutMutation
} from "../gql/mutations/ExhibitionMutations";
import { Artwork } from "../interfaces/artwork";
import { ID } from "../interfaces/common";
import { useCanvasReducerContext } from "../store/CanvasReducerContext";
import { CanvasReducerMode } from "../store/CanvasReducerState";

export interface DraggingState {
  id: ID;
  offsetX: number;
  offsetY: number;
}

export default function useDraggableCanvas() {
  const { state, moveElement } = useCanvasReducerContext();
  const [saveMutation] = useSaveArtworkLayoutMutation();
  const [createArtwork] = useCreateArtworkMutation();

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
      if (state.mode !== CanvasReducerMode.Moving) return;
      const coords = getMousePosition(e);
      draggedElement.current = {
        id: shape.id,
        offsetX: coords.x - shape.x,
        offsetY: coords.y - shape.y
      };
    },
    [state.mode]
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

  const onClick = useCallback(
    async (e: React.MouseEvent) => {
      if (state.mode !== CanvasReducerMode.Creating) return;

      const { x, y } = getMousePosition(e);
      createArtwork({
        variables: {
          params: {
            exhibitionId: state.exhibition!.id,
            x: Math.round(x),
            y: Math.round(y)
          }
        }
      });
    },
    [state.mode]
  );

  const saveLayout = async () => {
    if (!state.exhibition?.artworks) return;
    saveMutation({
      variables: {
        exhibitionId: state.exhibition.id,
        shapes: state.exhibition?.artworks.map((art) => ({
          id: art.id,
          x: art.x,
          y: art.y
        }))
      }
    });
  };

  return {
    onDragEnd,
    onDragStart,
    onMouseLeave,
    onMouseMove,
    onClick,
    svgRef,
    saveLayout
  };
}
