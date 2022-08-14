import { gql, useMutation } from "@apollo/client";
import {
  Artwork,
  ArtworkInput,
  ArtworkShapeInput
} from "../../interfaces/artwork";
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

export const CREATE_ARTWORK_MUTATION = gql`
  mutation CreateArtwork($params: ArtworkInput!) {
    result: createArtwork(params: $params) {
      success
      errors {
        key
        message
      }
      data {
        id
        artworks {
          id
          x
          y
        }
      }
    }
  }
`;

export interface CreateArtworkMutationResult {
  result: MutationResult<Artwork>;
}

export interface CreateArtworkMutationVariables {
  params: ArtworkInput;
}

export const useCreateArtworkMutation = () =>
  useMutation<CreateArtworkMutationResult, CreateArtworkMutationVariables>(
    CREATE_ARTWORK_MUTATION
  );
