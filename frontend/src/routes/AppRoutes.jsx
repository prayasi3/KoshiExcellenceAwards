import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";

// Admin
import Login from "../admin/pages/Login";
import Dashboard from "../admin/pages/Dashboard";
import AdminLayout from "../admin/layouts/AdminLayout";
import ProtectedRoute from "../admin/routes/ProtectedRoute";
import Categories from "../admin/pages/Categories";
import Editions from "../admin/pages/Editions";

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

      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />

      {/* Login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />

          {/* Add more pages here later */}
          {/* <Route path="users" element={<Users />} /> */}
          <Route path="categories" element={<Categories />} />
          <Route path="editions" element={<Editions />} />
          {/* <Route path="recipients" element={<Recipients />} /> */}
          {/* <Route path="honorees" element={<Honorees />} /> */}
          {/* <Route path="gallery" element={<Gallery />} /> */}
          {/* <Route path="sponsors" element={<Sponsors />} /> */}
          {/* <Route path="speakers" element={<Speakers />} /> */}
          {/* <Route path="team" element={<Team />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}