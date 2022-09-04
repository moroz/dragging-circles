import { gql, useQuery } from "@apollo/client";
import { ID } from "../../interfaces/common";
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

export const GET_USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      role
    }
  }
`;

export interface GetUserQueryResult {
  user: User | null;
}

export interface GetUserQueryVariables {
  id: ID;
}

export const useGetUserQuery = (id?: ID) =>
  useQuery<GetUserQueryResult, GetUserQueryVariables>(GET_USER_QUERY, {
    variables: { id: id! }
  });
