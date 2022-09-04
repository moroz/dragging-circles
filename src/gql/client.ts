import { ApolloClient, InMemoryCache } from "@apollo/client";

export const GRAPHQL_API_URI = import.meta.env.VITE_GRAPHQL_URL;

export const EXHIBITION_URL = new URL(GRAPHQL_API_URI).origin;

const client = new ApolloClient({
  uri: GRAPHQL_API_URI,
  cache: new InMemoryCache({
    possibleTypes: {
      Asset: ["Image", "Video", "Audio"]
    }
  }),
  credentials: "include"
});

export default client;
