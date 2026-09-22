import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../auth/AuthContext'
import './AdminLogoutButton.css'

export default function AdminLogoutButton() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogout = async () => {
    if (loading) {
      return
    }

    setLoading(true)
    setError('')

    try {
      await logout()

      /*
       * replace:true evita que la página administrativa anterior
       * quede como destino normal del botón "Atrás".
       *
       * Aunque el usuario intente regresar manualmente, las rutas
       * protegidas deben volver a comprobar /api/user.
       */
      navigate('/admin/login', {
        replace: true,
      })
    } catch {
      setError(
        'No se pudo cerrar la sesión de forma segura. Intenta nuevamente.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-logout-container">
      <button
        type="button"
        className="admin-logout-button"
        onClick={handleLogout}
        disabled={loading}
        aria-busy={loading}
      >
        <svg
          className="admin-logout-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M10 5H6.5A2.5 2.5 0 0 0 4 7.5v9A2.5 2.5 0 0 0 6.5 19H10" />
          <path d="M14 8l4 4-4 4" />
          <path d="M18 12H9" />
        </svg>

        <span>
          {loading
            ? 'Cerrando sesión...'
            : 'Cerrar sesión'}
        </span>
      </button>

      {error && (
        <p
          className="admin-logout-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}
