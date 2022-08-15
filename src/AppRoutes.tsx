import React from "react";
import { Route, Routes } from "react-router-dom";
import ArtworkCanvas from "./components/ArtworkCanvas";
import ArtworkDetails from "./views/ArtworkDetails";
import EditArtworkBody from "./views/ArtworkDetails/EditArtworkBody";
import SignIn from "./views/SignIn";

interface Props {}

const AppRoutes: React.FC<Props> = () => {
  return (
    <Routes>
      <Route index element={<ArtworkCanvas />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/artworks/:id" element={<ArtworkDetails />}>
        <Route index element={<EditArtworkBody />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
