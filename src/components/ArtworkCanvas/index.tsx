import { useCallback, useEffect, useRef } from "react";
import { useGetExhibitionQuery } from "../../gql/queries/ExhibitionQueries";
import { Artwork } from "../../interfaces/artwork";
import { ID } from "../../interfaces/common";
import { useCanvasReducer } from "../../store/CanvasReducer";

const ASPECT_RATIO = 16 / 9;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = Math.ceil(CANVAS_WIDTH / ASPECT_RATIO);

interface DraggingState {
  id: ID;
  offsetX: number;
  offsetY: number;
}

function ArtworkCanvas() {
  const { data, loading } = useGetExhibitionQuery(1);
  const { state, moveElement, reset } = useCanvasReducer();

  useEffect(() => {
    if (data?.getExhibition?.artworks) reset(data.getExhibition?.artworks);
  }, [loading, data]);

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

  if (loading) return <div className="App" />;

  return (
    <div className="App">
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        id="canvas"
        width="100vmin"
        height={`${100 / ASPECT_RATIO}vmin`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {state.shapes.map((shape) => (
          <circle
            key={shape.id}
            cx={shape.x}
            cy={shape.y}
            r={25}
            className="circle"
            onMouseDown={onDragStart(shape)}
            onMouseUp={onDragEnd}
          >
            <title>{shape.title}</title>
          </circle>
        ))}
      </svg>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default ArtworkCanvas;
