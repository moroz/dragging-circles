import React from "react";
import { Link } from "react-router-dom";
import { Artwork } from "../../../interfaces/artwork";
import { CanvasReducerMode } from "../../../store/CanvasReducerState";
import styles from "./Shape.module.sass";

interface Props extends React.HTMLProps<SVGCircleElement> {
  artwork: Artwork;
  mode: CanvasReducerMode;
}

const Shape: React.FC<Props> = ({ artwork, onMouseDown, onMouseUp, mode }) => {
  const isLink = mode === CanvasReducerMode.Standby;

  const shape = (
    <circle
      key={artwork.id}
      cx={artwork.x}
      cy={artwork.y}
      r={25}
      className={styles.circle}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <title>{artwork.title}</title>
    </circle>
  );

  if (isLink) return <Link to={`/artworks/${artwork.id}`}>{shape}</Link>;
  return shape;
};

export default Shape;
