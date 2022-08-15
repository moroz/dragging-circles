import React from "react";
import { Outlet } from "react-router-dom";
import { useGetCurrentArtworkQuery } from "../../gql/queries/ArtworkQueries";
import Layout from "../../layout";
import { LayoutLoader } from "../../layout/Loader";
import NotFound from "../NotFound";
import TabNavigation from "./TabNavigation";

interface Props {}

const ArtworkDetails: React.FC<Props> = () => {
  const { data, loading } = useGetCurrentArtworkQuery();

  if (loading && !data) return <LayoutLoader />;
  const artwork = data?.artwork;
  if (!artwork) return <NotFound />;

  const title = `編輯藝術作品：${artwork.title}`;

  return (
    <Layout title={title} backUrl="/">
      <TabNavigation artwork={artwork} />
      <Outlet />
    </Layout>
  );
};

export default ArtworkDetails;
