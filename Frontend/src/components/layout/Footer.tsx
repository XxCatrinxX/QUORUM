import logo from '../../assets/images/logo.png';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="brand-mark" aria-hidden="true">
          <img src={logo} alt="Quorum Logo" className="logo" />
        </span>
        <span>QUÓRUM<span className="brand-dot">.</span></span>
      </div>
      <p>Software con intención. Producto con propósito.</p>
      <p className="footer-year">© 2026 Quorum Studio</p>
    </footer>
  )
}