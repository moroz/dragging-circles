import { ApolloProvider } from "@apollo/client";
import "./css/app.sass";
import ArtworkCanvas from "./components/ArtworkCanvas";
import client from "./gql/client";
import { useCanvasReducer } from "./store/CanvasReducer";
import CanvasReducerContext from "./store/CanvasReducerContext";

function App() {
  const contextValue = useCanvasReducer();

  return (
    <ApolloProvider client={client}>
      <CanvasReducerContext.Provider value={contextValue}>
        <ArtworkCanvas />
      </CanvasReducerContext.Provider>
    </ApolloProvider>
  );
}

export default App;
