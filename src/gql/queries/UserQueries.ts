import { gql, useQuery } from "@apollo/client";
import { User } from "../../interfaces/users";

export const LIST_USERS_QUERY = gql`
  query ListUsers {
    users {
      id
      email
      role
    }
  }
`;

export interface ListUsersQueryResult {
  users: User[];
}

export const useListUsersQuery = () =>
  useQuery<ListUsersQueryResult>(LIST_USERS_QUERY, {
    fetchPolicy: "cache-and-network"
  });
