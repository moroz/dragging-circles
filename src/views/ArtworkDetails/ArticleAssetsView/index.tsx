import React, { useCallback, useState } from "react";
import ArtworkImages from "../../../components/ArticleImages";
import { useGetCurrentArtworkQuery } from "../../../gql/queries/ArtworkQueries";
import UploadAsset from "../UploadAsset";

interface Props {
  refetch: () => void;
}

const ArtworkAssetsView: React.FC<Props> = ({ refetch }) => {
  const [showModal, setShowModal] = useState(false);
  const { data } = useGetCurrentArtworkQuery();
  const onCloseModal = useCallback(() => setShowModal(false), [setShowModal]);
  const artwork = data?.artwork;

  if (!artwork) return null;

  return (
    <>
      <ArtworkImages
        artwork={artwork}
        refetch={refetch}
        onOpenModal={() => setShowModal(true)}
      />
      <UploadAsset
        show={showModal}
        onClose={onCloseModal}
        artwork={artwork}
        refetch={refetch}
      />
    </>
  );
};

export default ArtworkAssetsView;
