import React, { useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDeleteArtworkMutation } from "../../gql/mutations/ArtworkMutations";
import { useGetCurrentArtworkQuery } from "../../gql/queries/ArtworkQueries";
import Layout from "../../layout";
import { LayoutLoader } from "../../layout/Loader";
import NotFound from "../NotFound";
import TabNavigation from "./TabNavigation";

interface Props {}

const CONFIRMATION_TEXT = `您確定希望刪除這個作品嗎？此動作無法撤消。`;

const ArtworkDetails: React.FC<Props> = () => {
  const { data, loading } = useGetCurrentArtworkQuery();
  const [mutate] = useDeleteArtworkMutation();
  const navigate = useNavigate();

  const id = data?.artwork?.id;

  const onDelete = useCallback(async () => {
    if (!id || !confirm(CONFIRMATION_TEXT)) return;
    const result = await mutate({ variables: { id } });
    if (result.data?.result.success) {
      navigate("/");
    }
  }, [id]);

  if (loading && !data) return <LayoutLoader />;
  const artwork = data?.artwork;
  if (!artwork) return <NotFound />;

  const title = `編輯藝術作品：${artwork.title}`;

  return (
    <Layout
      title={title}
      backUrl="/"
      actions={
        <button type="button" className="button is-danger" onClick={onDelete}>
          永久刪除作品
        </button>
      }
    >
      <TabNavigation artwork={artwork} />
      <Outlet />
    </Layout>
  );
};

export default ArtworkDetails;
