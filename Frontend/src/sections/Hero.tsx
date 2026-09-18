import heroImg from '../assets/hero.png'

export function Hero() {
  return (
    <section className="hero-section" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Estudio de producto digital · Desde 2018</p>
        <h1>Ideas claras.<br /><em>Software</em> que mueve.</h1>
        <p className="hero-intro">Diseñamos y construimos productos digitales que convierten problemas complejos en experiencias simples.</p>
        <a className="button button-primary" href="#contact">Empezar un proyecto <span aria-hidden="true">↗</span></a>
      </div>
      <div className="hero-art" aria-label="Visual abstracto de producto digital">
        <div className="art-grid" />
        <div className="art-card art-card-main">
          <span className="art-label">product / 01</span>
          <img src={heroImg} alt="" />
          <strong>Build what<br />matters.</strong>
        </div>
        <div className="art-card art-card-note">+ 42%<small>conversión</small></div>
        <span className="art-orbit orbit-one" />
        <span className="art-orbit orbit-two" />
      </div>
      <a className="scroll-cue" href="#services"><span aria-hidden="true">↓</span> Explorar</a>
    </section>
  )
}