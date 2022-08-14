import { ApolloProvider } from "@apollo/client";
import "./css/app.sass";
import client from "./gql/client";
import { useCanvasReducer } from "./store/CanvasReducer";
import CanvasReducerContext from "./store/CanvasReducerContext";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  const contextValue = useCanvasReducer();

  return (
    <ApolloProvider client={client}>
      <CanvasReducerContext.Provider value={contextValue}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CanvasReducerContext.Provider>
    </ApolloProvider>
  );
}

export default App;
