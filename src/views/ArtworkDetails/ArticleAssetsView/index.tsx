import React, { useCallback, useState } from "react";
import ArticleImages from "../../../components/ArticleImages";
import { useGetCurrentArtworkQuery } from "../../../gql/queries/ArtworkQueries";
import UploadAsset from "../UploadAsset";

interface Props {}

const ArticleAssetsView: React.FC<Props> = () => {
  const [showModal, setShowModal] = useState(false);
  const { data } = useGetCurrentArtworkQuery();
  const onCloseModal = useCallback(() => setShowModal(false), [setShowModal]);
  const artwork = data?.artwork;

  if (!artwork) return null;

  return (
    <>
      <ArticleImages
        article={article}
        refetch={refetch}
        onOpenModal={() => setShowModal(true)}
      />
      <UploadAsset
        show={showModal}
        onClose={onCloseModal}
        article={article}
        refetch={refetch}
      />
    </>
  );
};

export default ArticleAssetsView;
