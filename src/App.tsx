import { ApolloProvider } from "@apollo/client";
import "./App.css";
import ArtworkCanvas from "./components/ArtworkCanvas";
import client from "./gql/client";

function App() {
  return (
    <ApolloProvider client={client}>
      <ArtworkCanvas />
    </ApolloProvider>
  );
}

export default App;
