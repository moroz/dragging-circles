import { useCallback, useRef } from "react";
import "./App.css";
import { ID } from "./interfaces/common";
import { useCanvasReducer } from "./store/CanvasReducer";

const ASPECT_RATIO = 16 / 9;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = Math.ceil(CANVAS_WIDTH / ASPECT_RATIO);

function App() {
  const { state } = useCanvasReducer();

  const svgRef = useRef<SVGSVGElement>(null);
  const draggedElement = useRef<ID>();

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
    (id: ID) => (e: React.MouseEvent) => {
      draggedElement.current = id;
      const coords = getMousePosition(e);
    },
    []
  );

  const onDragEnd = useCallback(() => {
    draggedElement.current = undefined;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggedElement.current) return;
    const coords = getMousePosition(e);
    console.log(coords);
  }, []);

  return (
    <div className="App">
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        id="canvas"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onMouseMove={onMouseMove}
      >
        {state.shapes.map((shape) => (
          <circle
            key={shape.id}
            cx={shape.x}
            cy={shape.y}
            r={25}
            className="circle"
            onMouseDown={onDragStart(shape.id)}
            onMouseUp={onDragEnd}
          />
        ))}
      </svg>
    </div>
  );
}

export default App;
