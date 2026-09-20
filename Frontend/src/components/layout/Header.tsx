import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

export function Header() {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="Quorum, inicio">
        <span className="brand-mark" aria-hidden="true"><img className="logo" src={logo} alt="Logo" /></span>
        <span>QUÓRUM<span className="brand-dot">.</span></span>
      </NavLink>
      <nav aria-label="Navegación principal">
        <NavLink to="/nosotros">Sobre Nosotros</NavLink>
        <NavLink to="/servicios">Servicios</NavLink>
        <NavLink to="/proyectos">Proyectos</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
      </nav>
      <NavLink className="header-link" to="/contacto">Hablemos <span aria-hidden="true">↗</span></NavLink>
    </header>
  )
}