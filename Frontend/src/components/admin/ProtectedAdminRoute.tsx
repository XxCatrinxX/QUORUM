import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function ProtectedAdminRoute() {
  const { user, loading } = useAuth();

  /*
  |--------------------------------------------------------------------------
  | Estamos comprobando la sesión
  |--------------------------------------------------------------------------
  |
  | Mientras Laravel responde, NO mostramos el dashboard.
  |
  */

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        Verificando sesión...
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | No existe sesión
  |--------------------------------------------------------------------------
  */

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  /*
  |--------------------------------------------------------------------------
  | Tiene sesión, pero no es administrador
  |--------------------------------------------------------------------------
  */

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  /*
  |--------------------------------------------------------------------------
  | Usuario administrador
  |--------------------------------------------------------------------------
  */

  return <Outlet />;
}
