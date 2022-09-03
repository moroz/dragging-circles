import { gql, useQuery } from "@apollo/client";
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

export const useGetExhibitionQuery = () =>
  useQuery<GetExhibitionQueryResult>(GET_EXHIBITION_QUERY);
