import { useEffect, useRef, useState } from "react";

import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";

import "./AdminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const menuRef = useRef<HTMLDivElement | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const [loggingOut, setLoggingOut] = useState(false);

  const [logoutError, setLogoutError] = useState("");

  const userName = user?.name?.trim() || "Administrador";

  const userEmail = user?.email || "admin@quorum.com";

  const initial = userName.charAt(0).toUpperCase();

  const avatarUrl = user?.avatar_url?.trim() || "";

  /*
  |--------------------------------------------------------------------------
  | Cerrar menú al hacer clic fuera
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);

      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Cerrar sesión
  |--------------------------------------------------------------------------
  */

  const handleLogout = async () => {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);
    setLogoutError("");

    try {
      await logout();

      setMenuOpen(false);

      navigate("/admin/login", {
        replace: true,
      });
    } catch {
      setLogoutError("No se pudo cerrar la sesión. Intenta nuevamente.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="qa-admin">
      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <aside className="qa-admin__sidebar">
        <div className="qa-admin__sidebar-top">
          {/* LOGO */}

          <div className="qa-admin__brand">
            <div className="qa-admin__brand-mark">Q</div>

            <div className="qa-admin__brand-copy">
              <strong>QUÓRUM.</strong>

              <span>ADMINISTRACIÓN</span>
            </div>
          </div>

          <div className="qa-admin__sidebar-line" />

          {/* NAVEGACIÓN */}

          <nav className="qa-admin__nav" aria-label="Navegación administrativa">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "qa-admin__nav-link qa-admin__nav-link--active"
                  : "qa-admin__nav-link"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/projects"
              className={({ isActive }) =>
                isActive
                  ? "qa-admin__nav-link qa-admin__nav-link--active"
                  : "qa-admin__nav-link"
              }
            >
              Proyectos
            </NavLink>

            <NavLink
              to="/admin/clients"
              className={({ isActive }) =>
                isActive
                  ? "qa-admin__nav-link qa-admin__nav-link--active"
                  : "qa-admin__nav-link"
              }
            >
              Clientes
            </NavLink>

            <NavLink
              to="/admin/tasks"
              className={({ isActive }) =>
                isActive
                  ? "qa-admin__nav-link qa-admin__nav-link--active"
                  : "qa-admin__nav-link"
              }
            >
              Tareas
            </NavLink>

            <NavLink
              to="/admin/meeting"
              className={({ isActive }) =>
                isActive
                  ? "qa-admin__nav-link qa-admin__nav-link--active"
                  : "qa-admin__nav-link"
              }
            >
              Reuniones
            </NavLink>
          </nav>
        </div>

        {/* FOOTER */}

        <div className="qa-admin__sidebar-bottom">
          <div className="qa-admin__sidebar-line" />

          <a href="/" className="qa-admin__back">
            <span aria-hidden="true">←</span>

            <span>Volver al sitio</span>
          </a>
        </div>
      </aside>

      {/* =====================================================
          ÁREA DERECHA
          ===================================================== */}

      <section className="qa-admin__main">
        {/* HEADER */}

        <header className="qa-admin__header">
          <span className="qa-admin__header-title">PANEL ADMINISTRATIVO</span>

          {/* =================================================
              PERFIL
              ================================================= */}

          <div className="qa-admin__profile" ref={menuRef}>
            <button
              type="button"
              className={
                menuOpen
                  ? "qa-admin__profile-button qa-admin__profile-button--open"
                  : "qa-admin__profile-button"
              }
              onClick={() => {
                setMenuOpen((current) => !current);

                setLogoutError("");
              }}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              {/* AVATAR */}

              <span className="qa-admin__avatar">
                {avatarUrl ? <img src={avatarUrl} alt={userName} /> : initial}
              </span>

              {/* DATOS */}

              <span className="qa-admin__profile-copy">
                <strong>{userName}</strong>

                <small>QUÓRUM</small>
              </span>

              {/* FLECHA */}

              <svg
                className={
                  menuOpen
                    ? "qa-admin__chevron qa-admin__chevron--open"
                    : "qa-admin__chevron"
                }
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="m7 10 5 5 5-5" />
              </svg>
            </button>

            {/* =================================================
                DROPDOWN
                ================================================= */}

            {menuOpen && (
              <div className="qa-admin__dropdown" role="menu">
                {/* CABECERA PERFIL */}

                <div className="qa-admin__dropdown-profile">
                  <span className="qa-admin__dropdown-avatar">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={userName} />
                    ) : (
                      initial
                    )}
                  </span>

                  <div className="qa-admin__dropdown-user">
                    <strong>{userName}</strong>

                    <span>{userEmail}</span>
                  </div>
                </div>

                <div className="qa-admin__dropdown-line" />

                {/* PERFIL FUTURO */}

                <button
                  type="button"
                  className="qa-admin__dropdown-item"
                  disabled
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="8" r="3" />

                    <path d="M5.5 20c.7-4 3-6 6.5-6s5.8 2 6.5 6" />
                  </svg>

                  <span className="qa-admin__dropdown-item-copy">
                    <strong>Mi perfil</strong>

                    <small>Próximamente</small>
                  </span>
                </button>

                <div className="qa-admin__dropdown-line" />

                {/* CERRAR SESIÓN */}

                <button
                  type="button"
                  className="qa-admin__dropdown-item qa-admin__dropdown-item--logout"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  role="menuitem"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M10 5H6.5A2.5 2.5 0 0 0 4 7.5v9A2.5 2.5 0 0 0 6.5 19H10" />

                    <path d="M14 8l4 4-4 4" />

                    <path d="M18 12H9" />
                  </svg>

                  <span>
                    {loggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
                  </span>
                </button>

                {logoutError && (
                  <p className="qa-admin__logout-error" role="alert">
                    {logoutError}
                  </p>
                )}
              </div>
            )}
          </div>
        </header>

        {/* =====================================================
            CONTENIDO
            ===================================================== */}

        <main className="qa-admin__content">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
