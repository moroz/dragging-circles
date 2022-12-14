import React from "react";
import { Route, Routes } from "react-router-dom";
import ArtworkCanvas from "./components/ArtworkCanvas";
import ArtworkDetails from "./views/ArtworkDetails";
import ArticleAssetsView from "./views/ArtworkDetails/ArticleAssetsView";
import EditArtworkBody from "./views/ArtworkDetails/EditArtworkBody";
import EditArtworkMeta from "./views/ArtworkDetails/EditArtworkMeta";
import CreateExhibition from "./views/ExhibitionManagement/CreateExhibition";
import ExhibitionList from "./views/ExhibitionManagement/ExhibitionList";
import ExhibitionSetup from "./views/ExhibitionSetup";
import SignIn from "./views/SignIn";
import CreateUser from "./views/UserManagement/CreateUser";
import UpdateUser from "./views/UserManagement/UpdateUser";
import UserList from "./views/UserManagement/UserList";

interface Props {}

const AppRoutes: React.FC<Props> = () => {
  return (
    <Routes>
      <Route index element={<ArtworkCanvas />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/exhibition" element={<ExhibitionSetup />} />
      <Route path="/exhibitions" element={<ExhibitionList />} />
      <Route path="/exhibitions/new" element={<CreateExhibition />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/users/new" element={<CreateUser />} />
      <Route path="/users/:id" element={<UpdateUser />} />
      <Route path="/artworks/:id" element={<ArtworkDetails />}>
        <Route index element={<EditArtworkMeta />} />
        <Route path="body" element={<EditArtworkBody />} />
        <Route path="assets" element={<ArticleAssetsView />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
