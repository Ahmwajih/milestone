import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import Main from "../pages/Main";
import CreateBlog from "../pages/CreateBlog";
import UserProfile from "../pages/UserProfile";
import NotFound from "../pages/NotFound";
import BlogDetails from "../pages/BlogDetails";
import Layout from "../components/Layout";
function AppRouter() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Main />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog/*" element={<PrivateRouter />}>
          <Route path="" element={<Layout />}>
            <Route path="create" element={<CreateBlog />} />
            <Route path="profile" element={<UserProfile />} />
            {/* <Route path="/:id" element={<BlogDetails />} /> */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter;
