export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Quorum, inicio">
        <span className="brand-mark" aria-hidden="true">Q</span>
        <span>QUÓRUM<span className="brand-dot">.</span></span>
      </a>
      <nav aria-label="Navegación principal">
        <a href="#about">Sobre Nosotros</a>
        <a href="#services">Servicios</a>
        <a href="#work">Proyectos</a>
        <a href="#contact">Contacto</a>
      </nav>
      <a className="header-link" href="#contact">Hablemos <span aria-hidden="true">↗</span></a>
    </header>
  )
}