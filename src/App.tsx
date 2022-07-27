import { useCallback, useRef } from "react";
import "./App.css";
import { useCanvasReducer } from "./store/CanvasReducer";

const ASPECT_RATIO = 16 / 9;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = Math.ceil(CANVAS_WIDTH / ASPECT_RATIO);

function App() {
  const [state, dispatch] = useCanvasReducer();

  const svgRef = useRef<SVGSVGElement>(null);
  const draggedElement = useRef<HTMLElement>();

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

  const onDragStart = useCallback((e: React.MouseEvent) => {
    const coords = getMousePosition(e);
    console.log(coords);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
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
            onClick={onDragStart}
          />
        ))}
      </svg>
    </div>
  );
}

export default App;
