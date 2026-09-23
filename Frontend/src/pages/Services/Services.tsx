// Página de servicios: los arreglos superiores controlan las tarjetas y el proceso mostrado.
import "./Services.css";

const services = [
  {
    number: "01",
    title: "Desarrollo web",
    description:
      "Creamos sitios web y plataformas digitales modernas, rápidas y adaptadas a las necesidades de cada proyecto.",
    tags: ["React", "Laravel", "Node.js"],
  },
  {
    number: "02",
    title: "Aplicaciones móviles",
    description:
      "Diseñamos y desarrollamos aplicaciones móviles enfocadas en ofrecer experiencias simples, rápidas y escalables.",
    tags: ["Android", "React Native", "APIs"],
  },
  {
    number: "03",
    title: "Sistemas empresariales",
    description:
      "Transformamos procesos internos en herramientas digitales que permiten administrar información y operaciones de forma eficiente.",
    tags: ["ERP", "Dashboards", "Bases de datos"],
  },
  {
    number: "04",
    title: "E-commerce",
    description:
      "Construimos tiendas digitales preparadas para gestionar productos, clientes, pedidos y pagos.",
    tags: ["React", "Pagos", "CMS"],
  },
  {
    number: "05",
    title: "APIs y backend",
    description:
      "Diseñamos arquitecturas backend seguras y escalables para conectar aplicaciones, servicios y datos.",
    tags: ["Node.js", "Laravel", "MongoDB"],
  },
  {
    number: "06",
    title: "Automatización e IA",
    description:
      "Integramos automatización, análisis de datos e inteligencia artificial para resolver procesos específicos de negocio.",
    tags: ["Python", "IA", "Automatización"],
  },
];

const process = [
  {
    number: "01",
    title: "Descubrimiento",
    description:
      "Entendemos el problema, los objetivos y las necesidades reales del proyecto.",
  },
  {
    number: "02",
    title: "Estrategia",
    description:
      "Definimos la arquitectura, funcionalidades, tecnologías y alcance del proyecto.",
  },
  {
    number: "03",
    title: "Diseño",
    description:
      "Creamos la experiencia visual y la interfaz antes de comenzar el desarrollo.",
  },
  {
    number: "04",
    title: "Desarrollo",
    description:
      "Construimos el producto utilizando tecnologías modernas y buenas prácticas.",
  },
  {
    number: "05",
    title: "Lanzamiento",
    description:
      "Probamos, desplegamos y dejamos el proyecto preparado para comenzar a operar.",
  },
];

function Services() {
  return (
    <main className="services-page">
      {/* HERO */}
      <section className="services-hero">
        <div className="services-hero-background-logo" aria-hidden="true" />
        <div className="services-hero-content">
          <span className="eyebrow">LO QUE HACEMOS</span>

          <h1>
            Tecnología diseñada
            <br />
            para <span>hacer avanzar</span>
            <br />
            tu negocio.
          </h1>

          <p>
            Desarrollamos productos digitales, sistemas y soluciones
            tecnológicas que convierten ideas y problemas reales en herramientas
            útiles.
          </p>

          <a href="#services" className="services-cta">
            Explorar servicios
            <span>↓</span>
          </a>
        </div>

        <div className="hero-decoration">
          <span>01</span>
          <span>06</span>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="services-section" id="services">
        <div className="section-header">
          <div>
            <span className="eyebrow">SERVICIOS</span>

            <h2>
              Construimos más que
              <br />
              <span>software.</span>
            </h2>
          </div>

          <p>
            Cada proyecto comienza con una necesidad diferente. Nuestro trabajo
            consiste en convertirla en una solución tecnológica funcional,
            escalable y fácil de utilizar.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-card-top">
                <span className="service-number">{service.number}</span>

                <span className="service-arrow">↗</span>
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <div className="service-tags">
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SERVICIO DESTACADO */}
      <section className="featured-service">
        <div className="featured-service-content">
          <span className="eyebrow">SOLUCIONES A MEDIDA</span>

          <h2>
            Tu problema no necesita
            <br />
            una solución genérica.
          </h2>

          <p>
            Analizamos cómo funciona actualmente tu negocio para desarrollar una
            solución que se adapte realmente a tus procesos, clientes y
            objetivos.
          </p>

          <a href="/contacto">Cuéntanos tu proyecto →</a>
        </div>

        <div className="featured-service-visual">
          <div className="visual-card">
            <span>QUORUM</span>

            <div className="visual-lines">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>

            <strong>
              DIGITAL
              <br />
              PRODUCTS
            </strong>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="process-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">NUESTRO PROCESO</span>

            <h2>
              De la idea al
              <br />
              <span>producto.</span>
            </h2>
          </div>

          <p>
            Trabajamos de forma estructurada para mantener claridad durante todo
            el desarrollo y convertir las ideas en productos funcionales.
          </p>
        </div>

        <div className="process-list">
          {process.map((step) => (
            <div className="process-item" key={step.number}>
              <span className="process-number">{step.number}</span>

              <div>
                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </div>

              <span className="process-arrow">↗</span>
            </div>
          ))}
        </div>
      </section>

      {/* TECNOLOGÍAS */}
      <section className="technologies-section">
        <span className="eyebrow">TECNOLOGÍAS</span>

        <h2>
          Herramientas para
          <br />
          construir lo que sigue.
        </h2>

        <div className="technology-list">
          <span>React</span>
          <span>Laravel</span>
          <span>Node.js</span>
          <span>JavaScript</span>
          <span>Python</span>
          <span>MongoDB</span>
          <span>MySQL</span>
          <span>Git</span>
        </div>
      </section>

      {/* CTA */}
      <section className="services-final-cta">
        <span className="eyebrow">¿TIENES UN PROYECTO?</span>

        <h2>
          Hagamos que
          <br />
          <span>suceda.</span>
        </h2>

        <p>
          Cuéntanos qué quieres construir y descubramos juntos cómo podemos
          llevarlo a la realidad.
        </p>

        <a href="/contacto">Iniciar conversación →</a>
      </section>
    </main>
  );
}

export default Services;
