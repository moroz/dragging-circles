import { useSignOutMutation } from "../gql/mutations/AuthMutations";
import { useGetCurrentUserQuery } from "../gql/queries/AuthQueries";
import { Role } from "../interfaces/users";

export default function useAuth() {
  const { data, loading } = useGetCurrentUserQuery();
  const [signOut] = useSignOutMutation();
  const user = data?.currentUser;
  const isAdmin = user?.role === Role.Admin;
  return { user, loading, signOut: () => signOut(), isAdmin };
}
