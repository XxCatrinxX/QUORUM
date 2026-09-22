import { Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";

// Layout público
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

// Seguridad y layout del administrador
import AdminLayout from "../components/admin/AdminLayout";
import ProtectedAdminRoute from "../components/admin/ProtectedAdminRoute";

// Páginas públicas
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Services from "../pages/Services/Services";
import Projects from "../pages/Projects/Projects";
import Contact from "../pages/Contact/Contact";

// Páginas administrativas
import AdminLogin from "../pages/Admin/Login";
import Dashboard from "../pages/Admin/Dashboard";
import AdminProjects from "../pages/Admin/Projects";
import Clients from "../pages/Admin/Clients";
import Tasks from "../pages/Admin/Tasks";
import Meeting from "../pages/Admin/Meeting";

/*
|--------------------------------------------------------------------------
| Layout público
|--------------------------------------------------------------------------
|
| Este layout solamente se utiliza en la página pública.
| El panel administrativo NO utiliza Header ni Footer públicos.
|
*/

function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Rutas
|--------------------------------------------------------------------------
*/

export default function AppRoutes() {
  return (
    <Routes>
      {/* =========================================================
          PÁGINAS PÚBLICAS
         ========================================================= */}

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

      {/* =========================================================
          LOGIN ADMIN
         =========================================================
          
          Esta ruta NO está dentro de ProtectedAdminRoute porque
          precisamente necesitamos poder verla sin iniciar sesión.
      */}

      <Route path="/admin/login" element={<AdminLogin />} />

      {/* =========================================================
          RUTAS PROTEGIDAS DEL ADMIN
         =========================================================
          
          Todo lo que esté dentro de ProtectedAdminRoute requiere:
          
          1. Usuario autenticado
          2. role === "admin"
          
          Si no existe sesión:
              → /admin/login
          
          Si existe sesión pero no es admin:
              → /
      */}

      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          {/* /admin → /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Proyectos */}
          <Route path="projects" element={<AdminProjects />} />

          {/* Clientes */}
          <Route path="clients" element={<Clients />} />

          {/* Tareas */}
          <Route path="tasks" element={<Tasks />} />

          {/* Reuniones */}
          <Route path="meeting" element={<Meeting />} />
        </Route>
      </Route>

      {/* =========================================================
          RUTA NO ENCONTRADA
         ========================================================= */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
