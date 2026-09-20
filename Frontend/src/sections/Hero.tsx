import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.png';

export function Hero() {
  return (
    <section className="hero-section" id="top">

      <div className="hero-copy">

        <p className="eyebrow">
          Soluciones tecnológicas para empresas
        </p>

        <h1>
          Tu visión.
          <br />
          <em>Nuestra tecnología.</em>
        </h1>

        <p className="hero-intro">
          Transformamos ideas y necesidades de negocio en
          soluciones digitales que ayudan a las empresas a
          crecer, automatizar y trabajar mejor.
        </p>

        <div className="hero-actions">

          <Link
            className="button button-primary"
            to="/contacto#form-contact"
          >
            Cuéntanos tu proyecto
            <span aria-hidden="true">↗</span>
          </Link>

          <Link
            className="button button-secondary"
            to="/proyectos"
          >
            Ver proyectos
          </Link>

        </div>

      </div>

      <div
        className="hero-art"
        aria-label="Visual abstracto de tecnología"
      >
        <div className="art-grid" />

        <div className="art-card art-card-main">
          <span className="art-label">
            technology / 01
          </span>

          <img src={logo} alt="Logo" />

          <strong>
            Build what
            <br />
            matters.
          </strong>
        </div>

        <div className="art-card art-card-note">
          <span>Digital</span>
          <small>solutions</small>
        </div>

        <span className="art-orbit orbit-one" />
        <span className="art-orbit orbit-two" />

      </div>

      <Link className="scroll-cue" to="/servicios">
        <span aria-hidden="true">↓</span>
        Explorar
      </Link>

    </section>
  );
}