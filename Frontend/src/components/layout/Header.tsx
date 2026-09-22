// Navegación persistente. Mantener sus destinos sincronizados con AppRoutes.
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`site-header${isMenuOpen ? ' menu-open' : ''}`}>
      <NavLink className="brand" to="/" aria-label="Quorum, inicio" onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true"><img className="logo" src={logo} alt="Logo" /></span>
        <span>QUÓRUM<span className="brand-dot">.</span></span>
      </NavLink>
      <nav className="desktop-nav" aria-label="Navegación principal">
        <NavLink to="/nosotros">Sobre Nosotros</NavLink>
        <NavLink to="/servicios">Servicios</NavLink>
        <NavLink to="/proyectos">Proyectos</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
      </nav>
      <NavLink className="header-link" to="/contacto" onClick={closeMenu}>Hablemos <span aria-hidden="true">↗</span></NavLink>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
      <nav
        className="mobile-nav"
        id="mobile-navigation"
        aria-label="Navegación móvil"
        aria-hidden={!isMenuOpen}
      >
        <NavLink to="/nosotros" onClick={closeMenu}>Sobre Nosotros <span>01</span></NavLink>
        <NavLink to="/servicios" onClick={closeMenu}>Servicios <span>02</span></NavLink>
        <NavLink to="/proyectos" onClick={closeMenu}>Proyectos <span>03</span></NavLink>
        <NavLink to="/contacto" onClick={closeMenu}>Contacto <span>04</span></NavLink>
      </nav>
    </header>
  )
}