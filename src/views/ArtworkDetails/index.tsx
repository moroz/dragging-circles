import React from "react";
import { useParams } from "react-router-dom";
import EditorComponent from "../../components/RichEditor";
import { useGetArtworkQuery } from "../../gql/queries/ArtworkQueries";
import Layout from "../../layout";
import { LayoutLoader } from "../../layout/Loader";
import NotFound from "../NotFound";

interface Props {}

const ArtworkDetails: React.FC<Props> = () => {
  const { id } = useParams();
  const { data, loading } = useGetArtworkQuery(id!);

  if (loading && !data) return <LayoutLoader />;
  const artwork = data?.artwork;
  if (!artwork) return <NotFound />;

  const title = `編輯藝術作品：${artwork.title}`;

  return (
    <Layout title={title} backUrl="/">
      <form></form>
      <EditorComponent
        initialState={artwork?.body}
        onSave={async () => true}
        mutating={false}
      />
    </Layout>
  );
};

export default ArtworkDetails;
