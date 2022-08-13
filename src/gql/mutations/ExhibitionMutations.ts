import { gql, useMutation } from "@apollo/client";
import { Artwork, ArtworkShapeInput } from "../../interfaces/artwork";
import { ID, MutationResult } from "../../interfaces/common";

export const SAVE_ARTWORK_LAYOUT_MUTATION = gql`
  mutation SaveLayout($exhibitionId: ID!, $shapes: [ArtworkShapeInput!]!) {
    result: saveArtworkLayout(exhibitionId: $exhibitionId, shapes: $shapes) {
      success
      data {
        id
        artworks {
          id
          x
          y
        }
      }
      errors {
        message
        key
      }
    }
  }
`;

export interface SaveArtworkLayoutMutationResult {
  result: MutationResult<Artwork>;
}

export interface SaveArtworkLayoutMutationVariables {
  exhibitionId: ID;
  shapes: ArtworkShapeInput[];
}

export const useSaveArtworkLayoutMutation = () =>
  useMutation<
    SaveArtworkLayoutMutationResult,
    SaveArtworkLayoutMutationVariables
  >(SAVE_ARTWORK_LAYOUT_MUTATION);
