import { RawDraftContentState } from "draft-js";
import React, { useCallback } from "react";
import EditorComponent from "../../../components/RichEditor";
import { useUpdateArtworkMutation } from "../../../gql/mutations/ArtworkMutations";
import { useGetCurrentArtworkQuery } from "../../../gql/queries/ArtworkQueries";

interface Props {}

const ArticleContentEditor: React.FC<Props> = () => {
  const { data } = useGetCurrentArtworkQuery();
  const [mutate, { loading: mutating }] = useUpdateArtworkMutation();
  const artwork = data?.artwork;
  const onSave = useCallback(async (state: RawDraftContentState) => {
    try {
      const res = await mutate({
        variables: {
          id: artwork!.id,
          params: { body: JSON.stringify(state) }
        }
      });
      return res.data?.result.success ?? false;
    } catch (e) {
      return false;
    }
  }, []);

  return (
    <EditorComponent
      initialState={artwork?.body}
      onSave={onSave}
      mutating={mutating}
    />
  );
};

export default ArticleContentEditor;
