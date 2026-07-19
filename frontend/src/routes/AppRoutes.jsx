import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import PublicCategories from "../pages/Categories";
import PublicRecipients from "../pages/Recipients";
import PublicHonorees from "../pages/Honorees";
import PublicSpeakers from "../pages/Speakers";


// Admin
import Login from "../admin/pages/Login";
import Dashboard from "../admin/pages/Dashboard";
import AdminLayout from "../admin/layouts/AdminLayout";
import ProtectedRoute from "../admin/routes/ProtectedRoute";
import Categories from "../admin/pages/Categories";
import Editions from "../admin/pages/Editions";
import Recipients from "../admin/pages/Recipients";
import Honorees from "../admin/pages/Honorees";
import Sponsors from "../admin/pages/Sponsors";
import Speakers from "../admin/pages/Speakers";
import Teams from "../admin/pages/Teams";
import Gallery from "../admin/pages/Gallery";
import News from "../admin/pages/News";

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
        path="/categories"
        element={
          <MainLayout>
            <PublicCategories />
          </MainLayout>
        }
      /> 

      <Route
        path="/honorees"
        element={
          <MainLayout>
            <PublicHonorees />
          </MainLayout>
        }
      />

      <Route
        path="/speakers"
        element={
          <MainLayout>
            <PublicSpeakers />
          </MainLayout>
        }
      />

      <Route
        path="/recipients"
        element={
          <MainLayout>
            <PublicRecipients />
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
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

          {/* Add more pages here later */}
          {/* <Route path="users" element={<Users />} /> */}
          <Route path="categories" element={<Categories />} />
          <Route path="editions" element={<Editions />} />
          <Route path="recipients" element={<Recipients />} />
          <Route path="honorees" element={<Honorees />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="speakers" element={<Speakers />} />
          <Route path="teams" element={<Teams />} />
          <Route path="news" element={<News />} />
        </Route>
      </Route>
    </Routes>
  );
}