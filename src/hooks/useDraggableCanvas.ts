import { useRef, useCallback, useState } from "react";
import {
  useCreateArtworkMutation,
  useSaveArtworkLayoutMutation
} from "../gql/mutations/ExhibitionMutations";
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
  const [saveMutation] = useSaveArtworkLayoutMutation();
  const [createArtwork] = useCreateArtworkMutation();
  const [isCreatingMode, setIsCreatingMode] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const draggedElement = useRef<DraggingState>();

  const onStartCreating = useCallback(() => {
    if (state.dirty) return;
    setIsCreatingMode((t) => !t);
  }, [setIsCreatingMode]);

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
      if (isCreatingMode) return;
      const coords = getMousePosition(e);
      draggedElement.current = {
        id: shape.id,
        offsetX: coords.x - shape.x,
        offsetY: coords.y - shape.y
      };
    },
    [state, isCreatingMode]
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
      if (!isCreatingMode) return;

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
    [isCreatingMode]
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
    saveLayout,
    onStartCreating
  };
}
