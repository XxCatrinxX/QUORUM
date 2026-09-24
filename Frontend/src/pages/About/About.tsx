// Página institucional: valores, principios e historia de QUORUM.
import "./About.css";
import logo from "../../assets/images/logo.png";

const values = [
  {
    number: "01",
    title: "Pensamiento crítico",
    description:
      "Antes de construir, buscamos entender. Analizamos cada problema desde diferentes perspectivas para encontrar soluciones que realmente tengan sentido.",
  },
  {
    number: "02",
    title: "Tecnología con propósito",
    description:
      "No desarrollamos tecnología por desarrollarla. Cada línea de código debe responder a una necesidad y aportar valor al producto.",
  },
  {
    number: "03",
    title: "Diseño funcional",
    description:
      "Creemos que un buen producto debe verse bien, pero también debe ser intuitivo, rápido y fácil de utilizar.",
  },
  {
    number: "04",
    title: "Construir juntos",
    description:
      "Los mejores productos nacen de la colaboración. Trabajamos junto a nuestros clientes durante todo el proceso.",
  },
];

const principles = [
  "Entender antes de construir.",
  "Mantener las cosas simples.",
  "Cuestionar lo establecido.",
  "Aprender constantemente.",
  "Construir pensando en el futuro.",
];

function About() {
  return (
    <main className="about-page">
      {/* =========================
          HERO
      ========================= */}

      <section className="about-hero">
        <div className="about-hero-background-logo" aria-hidden="true" />

        <div className="about-hero-content">
          <span className="eyebrow">SOBRE QUORUM</span>

          <h1>
            Somos un equipo
            <br />
            que <span>construye</span>
            <br />
            tecnología.
          </h1>

          <p>
            QUORUM nace de una idea sencilla: utilizar la tecnología para
            transformar problemas reales en productos digitales que generen
            valor.
          </p>
        </div>

        <div className="about-hero-mark">
          <span>
            <img className="logo-hero" src={logo} alt="Quorum Logo" />
          </span>
        </div>
      </section>

      {/* =========================
          INTRO
      ========================= */}

      <section className="about-intro">
        <div className="intro-label">
          <span>01</span>
          <span>QUIÉNES SOMOS</span>
        </div>

        <div className="intro-content">
          <h2>
            No somos solamente
            <br />
            <span>desarrolladores.</span>
          </h2>

          <p>
            Somos personas interesadas en crear, aprender y resolver problemas
            utilizando tecnología.
          </p>

          <p>
            Desde productos digitales hasta sistemas empresariales, trabajamos
            para convertir ideas complejas en experiencias simples y
            funcionales.
          </p>
        </div>
      </section>

      {/* =========================
          HISTORIA
      ========================= */}

      <section className="story-section">
        <div className="story-header">
          <span className="eyebrow">NUESTRA HISTORIA</span>

          <h2>
            Empezamos con una
            <br />
            <span>idea.</span>
          </h2>
        </div>

        <div className="story-content">
          <div className="story-year">2026</div>

          <div className="story-text">
            <p>
              QUORUM comenzó como la iniciativa de un grupo de desarrolladores
              con una visión compartida: crear una empresa tecnológica capaz de
              desarrollar productos digitales propios y soluciones para otras
              empresas.
            </p>

            <p>
              Lo que comenzó como proyectos y experimentación fue tomando forma
              hasta convertirse en una identidad, una metodología y una forma de
              trabajar.
            </p>

            <p>
              Hoy seguimos construyendo desde la misma idea: aprender,
              experimentar y crear tecnología que tenga un propósito.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          MANIFESTO
      ========================= */}

      <section className="manifesto-section">
        <div className="manifesto-label">
          <span>02</span>
          <span>NUESTRA FORMA DE PENSAR</span>
        </div>

        <div className="manifesto-content">
          <span className="manifesto-small">QUORUM / MANIFESTO</span>

          <h2>
            Las mejores ideas
            <br />
            empiezan con una
            <br />
            <span>pregunta.</span>
          </h2>

          <p>
            ¿Por qué hacerlo así?
            <br />
            ¿Podemos hacerlo mejor?
            <br />
            ¿Qué necesita realmente el usuario?
          </p>
        </div>
      </section>

      {/* =========================
          VALORES
      ========================= */}

      <section className="values-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">LO QUE NOS DEFINE</span>

            <h2>
              Nuestra forma
              <br />
              de <span>trabajar.</span>
            </h2>
          </div>

          <p>
            Estos principios guían las decisiones que tomamos, desde una pequeña
            interacción hasta la arquitectura completa de un producto.
          </p>
        </div>

        <div className="values-grid">
          {values.map((value) => (
            <article className="value-card" key={value.number}>
              <span className="value-number">{value.number}</span>

              <h3>{value.title}</h3>

              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================
          PRINCIPIOS
      ========================= */}

      <section className="principles-section">
        <div className="principles-title">
          <span className="eyebrow">PRINCIPIOS</span>

          <h2>Cómo pensamos.</h2>
        </div>

        <div className="principles-list">
          {principles.map((principle, index) => (
            <div className="principle-item" key={principle}>
              <span>0{index + 1}</span>

              <h3>{principle}</h3>

              <span className="principle-arrow">↗</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          EQUIPO
      ========================= */}

      <section className="team-section">
        <div className="team-header">
          <span className="eyebrow">EL EQUIPO</span>

          <h2>
            Personas detrás
            <br />
            del <span>código.</span>
          </h2>

          <p>
            QUORUM está formado por desarrolladores y personas con diferentes
            habilidades que comparten la misma curiosidad por la tecnología.
          </p>
        </div>

        <div className="team-placeholder">
          <div className="team-placeholder-content">
            <span>QUORUM</span>

            <strong>
              WE BUILD
              <br />
              TOGETHER.
            </strong>
          </div>
        </div>
      </section>

      {/* =========================
          CTA
      ========================= */}

      <section className="about-final-cta">
        <span className="eyebrow">¿CONSTRUIMOS ALGO JUNTOS?</span>

        <h2>
          Una idea puede
          <br />
          convertirse en
          <br />
          <span>algo real.</span>
        </h2>

        <a href="/contacto">Hablemos de tu proyecto →</a>
      </section>
    </main>
  );
}

export default About;
