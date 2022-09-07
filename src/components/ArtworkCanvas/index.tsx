import { useCallback, useEffect } from "react";
import { useGetExhibitionQuery } from "../../gql/queries/ExhibitionQueries";
import { useCanvasReducerContext } from "../../store/CanvasReducerContext";
import useDraggableCanvas from "../../hooks/useDraggableCanvas";
import Toolbar from "./Toolbar";
import styles from "./Canvas.module.sass";
import Layout from "../../layout";
import Shape from "./Shape";
import { LayoutLoader } from "../../layout/Loader";

const ASPECT_RATIO = 16 / 9;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = Math.ceil(CANVAS_WIDTH / ASPECT_RATIO);

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
        </svg>
        <Toolbar onReset={onReset} />
      </div>
    </Layout>
  );
}

export default ArtworkCanvas;
