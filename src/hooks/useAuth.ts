import { useSignOutMutation } from "../gql/mutations/AuthMutations";
import { useGetCurrentUserQuery } from "../gql/queries/AuthQueries";

export default function useAuth() {
  const { data, loading } = useGetCurrentUserQuery();
  const [signOut] = useSignOutMutation();
  const user = data?.currentUser;
  return { user, loading, signOut: () => signOut() };
}
