import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { User } from "../../interfaces/users";

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      success
      user {
        id
      }
    }
  }
`;

export interface SignInMutationResult {
  signIn: {
    success: boolean;
    user: User | null;
  };
}

export interface SignInMutationVars {
  email: string;
  password: string;
}

export const useSignInMutation = () =>
  useMutation<SignInMutationResult, SignInMutationVars>(SIGN_IN_MUTATION, {
    awaitRefetchQueries: true,
    refetchQueries: ["GetUserProfile"]
  });

export const SIGN_OUT_MUTATION = gql`
  mutation SignOut {
    signOut
  }
`;

export const useSignOutMutation = () =>
  useMutation(SIGN_OUT_MUTATION, {
    awaitRefetchQueries: true,
    refetchQueries: ["GetUserProfile"]
  });
