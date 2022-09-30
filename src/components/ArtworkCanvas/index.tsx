import { useCallback, useEffect } from "react";
import { useGetExhibitionQuery } from "../../gql/queries/ExhibitionQueries";
import { useCanvasReducerContext } from "../../store/CanvasReducerContext";
import useDraggableCanvas from "../../hooks/useDraggableCanvas";
import Toolbar from "./Toolbar";
import styles from "./Canvas.module.sass";
import Layout from "../../layout";
import Shape from "./Shape";
import { LayoutLoader } from "../../layout/Loader";
import clsx from "clsx";

const ASPECT_RATIO = 16 / 9;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = Math.ceil(CANVAS_WIDTH / ASPECT_RATIO);

//   def title_position(1), do: {400, 30}
//   def title_position(2), do: {800 - 18, 30}
//   def title_position(3), do: {18, 225}
//   def title_position(4), do: {400, 225}
//   def title_position(5), do: {800 - 18, 225}
//   def title_position(6), do: {18, 450 - 30}
//   def title_position(7), do: {400, 450 - 30}
//   def title_position(8), do: {800 - 18, 450 - 30}
//   def title_position(_), do: {18, 30}
// end

const COORDS = [
  [18, 30],
  [400, 30],
  [800 - 18, 30],
  [18, 225],
  [400, 225],
  [800 - 18, 225],
  [18, 450 - 30],
  [400, 450 - 30],
  [800 - 18, 450 - 30]
];

function ArtworkCanvas() {
  const { data, loading } = useGetExhibitionQuery();
  const { state, reset } = useCanvasReducerContext();
  const { onDragStart, onDragEnd, onMouseMove, onMouseLeave, svgRef, onClick } =
    useDraggableCanvas();

  const exhibition = data?.getExhibition;

  const onReset = useCallback(() => {
    exhibition && reset(exhibition);
  }, [data, reset]);

  useEffect(onReset, [loading, data]);

  const [x, y] = exhibition?.titlePosition
    ? COORDS[exhibition.titlePosition]
    : [18, 30];

  const cssVars = {
    "--border-color": exhibition?.borderColor ?? undefined,
    "--font-color": exhibition?.fontColor ?? undefined
  } as React.CSSProperties;

  if (loading) return <LayoutLoader />;

  return (
    <Layout title={`畫布：${exhibition?.title}`}>
      <div className={styles.root}>
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
          style={cssVars}
        >
          {exhibition?.background ? (
            <image href={exhibition.background} width={800} />
          ) : null}

          {state.exhibition?.artworks.map((artwork) => (
            <Shape
              mode={state.mode}
              key={artwork.id}
              artwork={artwork}
              onMouseDown={onDragStart(artwork)}
              onMouseUp={onDragEnd}
            />
          ))}
          {exhibition?.showTitle ? (
            <text
              x={x}
              y={y}
              className={clsx(
                styles.title,
                styles[`position-${exhibition.titlePosition ?? 0}`]
              )}
            >
              {exhibition.title}
            </text>
          ) : null}
        </svg>
        <Toolbar onReset={onReset} />
      </div>
    </Layout>
  );
}

export default ArtworkCanvas;
