import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";

//Admin
import Login from "../admin/pages/Login";

function About() {
  return <h1>About Page</h1>;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Website */}

      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      {/* Admin */}
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />
    </Routes>
  );
}