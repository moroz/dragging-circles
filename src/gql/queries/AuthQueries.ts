import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { User } from "../../interfaces/users";

export const GET_CURRENT_USER = gql`
  query GetUserProfile {
    currentUser {
      id
      email
      role
    }
  }
`;

export interface GetUserProfileResult {
  currentUser: User | null;
}

export const useGetCurrentUserQuery = () =>
  useQuery<GetUserProfileResult>(GET_CURRENT_USER, {
    fetchPolicy: "cache-first"
  });
