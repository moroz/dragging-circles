import { gql, useMutation } from "@apollo/client";
import { ID, MutationResult } from "../../interfaces/common";
import { Role, User } from "../../interfaces/users";

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($params: CreateUserParams!) {
    result: createUser(params: $params) {
      success
      errors {
        key
        message
      }
      data {
        id
        email
        role
      }
    }
  }
`;

export interface CreateUserParams {
  email: string;
  password: string;
  passwordConfirmation: string;
  role: Role;
}

export interface CreateUserMutationResult {
  result: MutationResult<User>;
}

export interface CreateUserMutationVariables {
  params: CreateUserParams;
}

export const useCreateUserMutation = () =>
  useMutation<CreateUserMutationResult, CreateUserMutationVariables>(
    CREATE_USER_MUTATION
  );
