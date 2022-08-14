import { useEffect } from "react";
import { useGetExhibitionQuery } from "../../gql/queries/ExhibitionQueries";
import { useCanvasReducerContext } from "../../store/CanvasReducerContext";
import useDraggableCanvas from "../../hooks/useDraggableCanvas";

const ASPECT_RATIO = 16 / 9;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = Math.ceil(CANVAS_WIDTH / ASPECT_RATIO);

function ArtworkCanvas() {
  const { data, loading } = useGetExhibitionQuery(1);
  const { state, reset } = useCanvasReducerContext();
  const {
    onDragStart,
    onDragEnd,
    onMouseMove,
    onMouseLeave,
    svgRef,
    saveLayout,
    onClick,
    onStartCreating
  } = useDraggableCanvas();

  useEffect(() => {
    if (data?.getExhibition) reset(data.getExhibition);
  }, [loading, data]);

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
        onClick={onClick}
        onMouseLeave={onMouseLeave}
      >
        {state.exhibition?.artworks.map((shape) => (
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
      <button type="button" onClick={saveLayout} disabled={!state.dirty}>
        儲存佈局
      </button>
      <button type="button" onClick={onStartCreating} disabled={state.dirty}>
        新增藝品
      </button>
    </div>
  );
}

export default ArtworkCanvas;
