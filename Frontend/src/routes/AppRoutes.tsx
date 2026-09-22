import type { ReactNode } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

import ProtectedAdminRoute from "../components/admin/ProtectedAdminRoute";
import AdminLayout from "../components/admin/AdminLayout";

import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import Projects from "../pages/Projects/Projects";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

import AdminLogin from "../pages/Admin/Login";
import Dashboard from "../pages/Admin/Dashboard";
import AdminProjects from "../pages/Admin/Projects";
import Clients from "../pages/Admin/Clients";
import Tasks from "../pages/Admin/Tasks";
import Meeting from "../pages/Admin/Meeting";

type PublicLayoutProps = {
  children: ReactNode;
};

function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />

      <Route
        path="/nosotros"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />

      <Route
        path="/servicios"
        element={
          <PublicLayout>
            <Services />
          </PublicLayout>
        }
      />

      <Route
        path="/proyectos"
        element={
          <PublicLayout>
            <Projects />
          </PublicLayout>
        }
      />

      <Route
        path="/contacto"
        element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        }
      />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="projects" element={<AdminProjects />} />

          <Route path="clients" element={<Clients />} />

          <Route path="tasks" element={<Tasks />} />

          <Route path="meeting" element={<Meeting />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
