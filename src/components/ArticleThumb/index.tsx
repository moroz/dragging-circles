import React from "react";
import { Article } from "../../interfaces/articles";
import AspectRatioBox from "../AspectRatioBox";
import styles from "./ArticleThumb.module.sass";
import clsx from "clsx";
import AssetImage from "../AssetImage";
import { ORIENTATION_RATIO_MAPPING } from "../../helpers/orientation";
import { ImageOrientation } from "../../interfaces/assets";

interface Props {
  article?: Article;
  orientation: ImageOrientation;
}

const ArticleThumb: React.FC<Props> = ({ article, orientation }) => {
  if (orientation === ImageOrientation.KeepProportions)
    return (
      <div className={clsx(styles.thumb, styles.keep)}>
        {article?.coverAsset ? <AssetImage asset={article.coverAsset} /> : null}
      </div>
    );
  const ratio = ORIENTATION_RATIO_MAPPING[orientation];
  return (
    <AspectRatioBox
      ratio={ratio}
      className={clsx(!article?.coverAsset && styles.placeholder)}
    >
      {article?.coverAsset ? <AssetImage asset={article.coverAsset} /> : null}
    </AspectRatioBox>
  );
};

export default ArticleThumb;
