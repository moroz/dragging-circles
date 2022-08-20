import React, { useCallback } from "react";
import styles from "../ArticleImages.module.sass";
import { ArticleAsset } from "../../../interfaces/assets";
import clsx from "clsx";
import AssetImage from "../../AssetImage";
import { useDeleteArticleAssetMutation } from "../../../gql/mutations/assetMutations";
import { ID } from "../../../interfaces/common";
import { Article } from "../../../interfaces/articles";

interface Props {
  articleAsset: ArticleAsset;
  article: Article;
  refetch: VoidFunction;
}

const DELETE_PROMPT = `您確定希望刪除這張圖片嗎？`;

const Thumbnail: React.FC<Props> = ({ articleAsset, article, refetch }) => {
  const [deleteImage] = useDeleteArticleAssetMutation();

  const onDelete = useCallback(
    (id: ID) => {
      return async () => {
        if (!confirm(DELETE_PROMPT)) return;
        await deleteImage({
          variables: { articleId: article.id, articleAssetId: id }
        });
        refetch();
      };
    },
    [deleteImage]
  );

  return (
    <div className={clsx("card", styles.thumb)}>
      <AssetImage asset={articleAsset.asset} className={styles.img} />
      <button
        type="button"
        className={clsx(
          "button is-small is-danger is-light",
          styles.deleteButton
        )}
        onClick={onDelete(articleAsset.id)}
      >
        刪除
      </button>
    </div>
  );
};

export default Thumbnail;
