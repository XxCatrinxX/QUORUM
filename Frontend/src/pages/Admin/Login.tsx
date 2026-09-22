import { useEffect, useState, type FormEvent } from "react";

import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import "./LoginSecurity.css";

type FormErrors = {
  email?: string;
  password?: string;
  general?: string;
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const { user, loading: authLoading, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user?.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [user, authLoading, navigate]);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "El correo es obligatorio.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        newErrors.email = "Escribe un correo electrónico válido.";
      }
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const loggedUser = await login(email.trim(), password, remember);

      if (loggedUser.role !== "admin") {
        // Normalmente el backend nunca llega a devolver un usuario no admin.
        setErrors({
          general: "Correo o contraseña incorrectos.",
        });
        return;
      }

      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response;

        if (response?.status === 422) {
          const backendErrors = response.data?.errors;

          // Estos errores solo describen formato/campos requeridos, no existencia de cuentas.
          if (backendErrors) {
            setErrors({
              email: backendErrors.email?.[0],
              password: backendErrors.password?.[0],
              general: undefined,
            });
            return;
          }

          setErrors({
            general: "Correo o contraseña incorrectos.",
          });
          return;
        }

        if (response?.status === 429) {
          const retryAfter = Number(response.data?.retry_after ?? 0);
          const minutes = Math.max(1, Math.ceil(retryAfter / 60));

          setErrors({
            general:
              `Demasiados intentos. Intenta nuevamente en aproximadamente ${minutes} ` +
              `minuto${minutes === 1 ? "" : "s"}.`,
          });
          return;
        }

        if (response?.status === 419) {
          setErrors({
            general:
              "La sesión de seguridad expiró. Recarga la página e intenta nuevamente.",
          });
          return;
        }

        if (response && response.status >= 500) {
          setErrors({
            general: "Ocurrió un error en el servidor. Intenta nuevamente.",
          });
          return;
        }
      }

      setErrors({
        general:
          "No fue posible iniciar sesión. Verifica que el servidor esté disponible.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <main className="admin-login">
        <div className="admin-login-card">
          <p>Verificando sesión...</p>
        </div>
      </main>
    );
  }

  if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <main className="admin-login">
      <section className="admin-login-card">
        <div className="admin-login-brand">
          <span className="admin-login-brand-mark">Q</span>

          <div>
            <strong>QUÓRUM.</strong>
            <span>Administración</span>
          </div>
        </div>

        <div className="admin-login-heading">
          <span className="admin-eyebrow">QUÓRUM / ADMIN</span>
          <h1>Bienvenido</h1>
          <p>Ingresa tus credenciales para acceder al panel administrativo.</p>
        </div>

        {errors.general && (
          <div className="admin-login-alert" role="alert">
            {errors.general}
          </div>
        )}

        <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
          <div className="admin-form-group">
            <label htmlFor="email">Correo electrónico</label>

            <input
              id="email"
              type="email"
              value={email}
              placeholder="admin@quorum.com"
              autoComplete="email"
              disabled={loading}
              className={errors.email ? "admin-input-error" : ""}
              onChange={(event) => {
                setEmail(event.target.value);

                if (errors.email || errors.general) {
                  setErrors((current) => ({
                    ...current,
                    email: undefined,
                    general: undefined,
                  }));
                }
              }}
            />

            {errors.email && (
              <span className="admin-field-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Contraseña</label>

            <div className="admin-password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={loading}
                className={errors.password ? "admin-input-error" : ""}
                onChange={(event) => {
                  setPassword(event.target.value);

                  if (errors.password || errors.general) {
                    setErrors((current) => ({
                      ...current,
                      password: undefined,
                      general: undefined,
                    }));
                  }
                }}
              />

              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                aria-pressed={showPassword}
                disabled={loading}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 3L21 21" />
                    <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
                    <path d="M9.9 4.2A10.7 10.7 0 0 1 12 4c5.5 0 9 5.5 9 5.5a15.4 15.4 0 0 1-2.1 2.7" />
                    <path d="M6.6 6.6C4.4 8 3 10 3 10s3.5 5.5 9 5.5c1.2 0 2.3-.2 3.3-.6" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" />
                    <circle cx="12" cy="12" r="2.5" />
                  </svg>
                )}
              </button>
            </div>

            {errors.password && (
              <span className="admin-field-error" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <label className="admin-remember">
            <input
              type="checkbox"
              checked={remember}
              disabled={loading}
              onChange={(event) => setRemember(event.target.checked)}
            />

            <span className="admin-remember-control" aria-hidden="true" />
            <span className="admin-remember-text">
              Mantener sesión iniciada
            </span>
          </label>

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? "Verificando..." : "Iniciar sesión"}
          </button>
        </form>

        <a href="/" className="admin-login-back">
          ← Regresar al sitio
        </a>
      </section>
    </main>
  );
}
