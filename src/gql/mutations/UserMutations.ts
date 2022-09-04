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

export const UPDATE_USER_PASSWORD_MUTATION = gql`
  mutation UpdateUserPassword(
    $userId: ID!
    $params: UpdateUserPasswordParams!
  ) {
    result: updateUserPassword(userId: $userId, params: $params) {
      success
      errors {
        key
        message
      }
    }
  }
`;

export interface UpdateUserPasswordParams {
  password: string;
  passwordConfirmation: string;
}

export interface UpdateUserPasswordMutationResult {
  result: MutationResult<User>;
}

export interface UpdateUserPasswordMutationVariables {
  userId: ID;
  params: UpdateUserPasswordParams;
}

export const useUpdateUserPasswordMutation = () =>
  useMutation<
    UpdateUserPasswordMutationResult,
    UpdateUserPasswordMutationVariables
  >(UPDATE_USER_PASSWORD_MUTATION);
