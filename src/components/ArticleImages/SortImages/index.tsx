import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { useDeleteArticleAssetMutation } from "../../../gql/mutations/assetMutations";
import { Article } from "../../../interfaces/articles";
import { Asset } from "../../../interfaces/assets";
import { ID } from "../../../interfaces/common";
import AssetImage from "../../AssetImage";
import styles from "../ArticleImages.module.sass";

interface Props {
  article: Article;
  refetch: VoidFunction;
  items: ImageItem[];
  setItems: React.Dispatch<React.SetStateAction<ImageItem[]>>;
}

export interface ImageItem {
  id: ID;
  asset: Asset;
}

const DELETE_PROMPT = `您確定希望刪除這張圖片嗎？`;

const SortImages: React.FC<Props> = ({ refetch, article, items, setItems }) => {
  const [dirty, setDirty] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [deleteImage] = useDeleteArticleAssetMutation();

  const onDelete = useCallback(
    (id: ID) => {
      return async () => {
        if (!confirm(DELETE_PROMPT)) return;
        await deleteImage({
          variables: { articleId: article.id, articleAssetId: id }
        });
        setItems((items) => items.filter((that) => that.id !== id));
        refetch();
      };
    },
    [deleteImage]
  );

  const onChoose = () => {
    setIsDragging(true);
  };

  const onUnchoose = () => {
    setIsDragging(false);
  };

  const onStart = () => {
    setDirty(true);
  };

  return (
    <ReactSortable
      list={items}
      setList={setItems}
      onStart={onStart}
      onChoose={onChoose}
      onUnchoose={onUnchoose}
      className={styles.grid}
    >
      {items.map((img) => (
        <div
          key={img.id}
          className={clsx(
            "card",
            styles.thumb,
            styles.arrangeable,
            isDragging && styles.isDragging
          )}
        >
          <AssetImage asset={img.asset} />
          <button
            type="button"
            className={clsx(
              "button is-small is-danger is-light",
              styles.deleteButton
            )}
            onClick={onDelete(img.id)}
          >
            刪除
          </button>
        </div>
      ))}
    </ReactSortable>
  );
};

export default SortImages;
