import { gql, useMutation } from "@apollo/client";
import { Artwork, UpdateArtworkInput } from "../../interfaces/artwork";
import { ID, MutationResult } from "../../interfaces/common";

export const UPDATE_ARTWORK_MUTATION = gql`
  mutation UpdateArtwork($id: ID!, $params: UpdateArtworkInput!) {
    result: updateArtwork(id: $id, params: $params) {
      success
      errors {
        key
        message
      }
      data {
        id
        author
        title
        bodyHtml
        body
      }
    }
  }
`;

export interface UpdateArtworkMutationResult {
  result: MutationResult<Artwork>;
}

export interface UpdateArtworkMutationVariables {
  id: ID;
  params: UpdateArtworkInput;
}

export const useUpdateArtworkMutation = () =>
  useMutation<UpdateArtworkMutationResult, UpdateArtworkMutationVariables>(
    UPDATE_ARTWORK_MUTATION
  );
