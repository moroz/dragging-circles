import React from "react";
import { Artwork } from "../../interfaces/artwork";
import styles from "./ArticleThumb.module.sass";
import clsx from "clsx";
import AssetImage from "../AssetImage";

interface Props {
  article?: Artwork;
  orientation: ImageOrientation;
}

const ArticleThumb: React.FC<Props> = ({ article }) => {
  return (
    <div className={clsx(styles.thumb, styles.keep)}>
      {article?.artworkAssets.length ? (
        <AssetImage asset={article.artworkAssets[0].asset} />
      ) : null}
    </div>
  );
};

export default ArticleThumb;
