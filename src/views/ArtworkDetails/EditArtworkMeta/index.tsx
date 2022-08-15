import React from "react";
import { useGetCurrentArtworkQuery } from "../../../gql/queries/ArtworkQueries";

interface Props {}

const EditArtworkMeta: React.FC<Props> = () => {
  const { data, loading } = useGetCurrentArtworkQuery();
  return (
    <div>
      <p>Hello world!</p>
    </div>
  );
};

export default EditArtworkMeta;
