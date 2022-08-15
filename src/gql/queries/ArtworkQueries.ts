import { gql, useQuery } from "@apollo/client";
import { Artwork } from "../../interfaces/artwork";
import { ID } from "../../interfaces/common";

export const ARTWORK_DETAILS = gql`
  fragment ArtworkDetails on Artwork {
    id
    title
    x
    y
    body
    author
  }
`;

export const GET_ARTWORK_QUERY = gql`
  ${ARTWORK_DETAILS}

  query GetArtwork($id: ID!) {
    artwork: getArtwork(id: $id) {
      ...ArtworkDetails
    }
  }
`;

export interface GetArtworkQueryResult {
  artwork: Artwork | null;
}

export interface GetArtworkQueryVariables {
  id: ID;
}

export const useGetArtworkQuery = (id: ID) =>
  useQuery<GetArtworkQueryResult, GetArtworkQueryVariables>(GET_ARTWORK_QUERY, {
    variables: {
      id
    }
  });
