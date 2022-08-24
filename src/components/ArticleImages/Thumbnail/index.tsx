import React, { useCallback } from "react";
import styles from "../ArtworkImages.module.sass";
import { ArtworkAsset } from "../../../interfaces/assets";
import clsx from "clsx";
import AssetImage from "../../AssetImage";
import { useDeleteArtworkAssetMutation } from "../../../gql/mutations/AssetMutations";
import { ID } from "../../../interfaces/common";
import { Artwork } from "../../../interfaces/artwork";

interface Props {
  artworkAsset: ArtworkAsset;
  artwork: Artwork;
  refetch: VoidFunction;
}

const DELETE_PROMPT = `您確定希望刪除這張圖片嗎？`;

const Thumbnail: React.FC<Props> = ({ artworkAsset, artwork, refetch }) => {
  const [deleteImage] = useDeleteArtworkAssetMutation();

  const onDelete = useCallback(
    (id: ID) => {
      return async () => {
        if (!confirm(DELETE_PROMPT)) return;
        await deleteImage({
          variables: { artworkId: artwork.id, artworkAssetId: id }
        });
        refetch();
      };
    },
    [deleteImage]
  );

  return (
    <div className={clsx("card", styles.thumb)}>
      <AssetImage asset={artworkAsset.asset} className={styles.img} />
      <button
        type="button"
        className={clsx(
          "button is-small is-danger is-light",
          styles.deleteButton
        )}
        onClick={onDelete(artworkAsset.id)}
      >
        刪除
      </button>
    </div>
  );
};

export default Thumbnail;
