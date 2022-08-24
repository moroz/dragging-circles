import { ApolloClient, InMemoryCache } from "@apollo/client";

export const GRAPHQL_API_URI = import.meta.env.VITE_GRAPHQL_URL;

const client = new ApolloClient({
  uri: GRAPHQL_API_URI,
  cache: new InMemoryCache(),
  credentials: "include"
});

export default client;
