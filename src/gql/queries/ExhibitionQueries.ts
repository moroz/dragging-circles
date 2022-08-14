import { gql, useQuery } from "@apollo/client";
import { ID } from "../../interfaces/common";
import { Exhibition } from "../../interfaces/exhibitions";

export const GET_EXHIBITION_QUERY = gql`
  query GetExhibition {
    getExhibition: getActiveExhibition {
      id
      title
      artworks {
        id
        title
        body
        author
        x
        y
      }
    }
  }
`;

export interface GetExhibitionQueryResult {
  getExhibition: Exhibition | null;
}

export interface GetExhibitionQueryVariables {
  id: ID;
}

export const useGetExhibitionQuery = (id: ID) =>
  useQuery<GetExhibitionQueryResult, GetExhibitionQueryVariables>(
    GET_EXHIBITION_QUERY,
    { variables: { id } }
  );
