import React from "react";
import { Route, Routes } from "react-router-dom";
import ArtworkCanvas from "./components/ArtworkCanvas";
import ArtworkDetails from "./views/ArtworkDetails";
import SignIn from "./views/SignIn";

interface Props {}

const AppRoutes: React.FC<Props> = () => {
  return (
    <Routes>
      <Route index element={<ArtworkCanvas />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/artworks/:id" element={<ArtworkDetails />} />
    </Routes>
  );
};

export default AppRoutes;
