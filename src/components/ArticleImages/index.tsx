import React, { useCallback, useState } from "react";
import styles from "./ArticleImages.module.sass";
import { Artwork } from "../../interfaces/artwork";
import Picker from "./Picker";
import Thumbnail from "./Thumbnail";
import SortImages, { ImageItem } from "./SortImages";
import clsx from "clsx";
import { useRearrangeArticleAssetsMutation } from "../../gql/mutations/assetMutations";

interface Props {
  artwork: Artwork;
  refetch: VoidFunction;
  onOpenModal: VoidFunction;
}

const ArticleImages: React.FC<Props> = ({ artwork, refetch, onOpenModal }) => {
  const [arranging, setArranging] = useState(false);
  const [items, setItems] = useState<ImageItem[]>([]);
  const [mutate] = useRearrangeArticleAssetsMutation();

  const toggleArranging = useCallback(() => {
    setArranging((t) => !t);
    setItems(
      artwork.artworkAssets.map((ai: any) => ({
        id: ai.id,
        asset: ai.asset
      }))
    );
  }, [artwork.artworkAssets]);

  const onSaveOrder = useCallback(async () => {
    await mutate({
      variables: {
        artworkId: artwork.id,
        params: items.map((item, i) => ({
          priority: i + 1,
          assetId: item.asset.id
        }))
      }
    });
    setArranging(false);
    refetch();
  }, [items]);

  return (
    <section>
      {article.articleAssets.length > 1 ? (
        <header className={styles.sectionHeader}>
          <div className="buttons">
            <button
              type="button"
              onClick={toggleArranging}
              className={clsx(
                "button",
                arranging ? "is-danger is-light" : "is-info"
              )}
            >
              {arranging ? "取消編輯" : "編輯"}
            </button>
            {arranging ? (
              <button
                type="button"
                className="button is-success"
                onClick={onSaveOrder}
              >
                儲存順序
              </button>
            ) : null}
          </div>
        </header>
      ) : null}
      {arranging ? (
        <SortImages
          artwork={artwork}
          refetch={refetch}
          items={items}
          setItems={setItems}
        />
      ) : (
        <div className={styles.grid}>
          {artwork.artworkAssets.map((ai) => (
            <Thumbnail
              articleAsset={ai}
              key={ai.id}
              article={artwork}
              refetch={refetch}
            />
          ))}
          <Picker onOpenModal={onOpenModal} />
        </div>
      )}
    </section>
  );
};

export default ArticleImages;
