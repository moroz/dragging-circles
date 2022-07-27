import { useCallback, useRef } from "react";
import "./App.css";

const ASPECT_RATIO = 16 / 9;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = Math.ceil(CANVAS_WIDTH / ASPECT_RATIO);

function App() {
  const svgRef = useRef<SVGSVGElement>(null);

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

  const onClick = useCallback((e: React.MouseEvent) => {
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
      >
        <circle cx="50" cy="50" r="25" className="circle" onClick={onClick} />
        <circle cx="130" cy="80" r="25" className="circle" onClick={onClick} />
      </svg>
    </div>
  );
}

export default App;
