import { gql, useQuery } from "@apollo/client";
import { Exhibition } from "../../interfaces/exhibitions";

export const GET_EXHIBITION_QUERY = gql`
  query GetExhibition {
    getExhibition: getActiveExhibition {
      id
      title
      showTitle
      titlePosition
      borderColor
      background(variant: THUMB_WEBP)
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
  useQuery<GetExhibitionQueryResult>(GET_EXHIBITION_QUERY, {
    fetchPolicy: "network-only"
  });

export const LIST_EXHIBITIONS_QUERY = gql`
  query ListExhibitions {
    exhibitions {
      id
      title
      active
    }
  }
`;

export interface ListExhibitionQueryResult {
  exhibitions: Exhibition[];
}

export const useListExhibitionsQuery = () =>
  useQuery<ListExhibitionQueryResult>(LIST_EXHIBITIONS_QUERY, {
    fetchPolicy: "cache-and-network"
  });
