
import carritoImage from "../../assets/images/carrito.png";
import menuImage from "../../assets/images/menu.png";
import portadaImage from "../../assets/images/portada.png";
import { Link } from "react-router-dom";
import "./Projects.css";

const projects = [
  {
    number: "01",
    category: "Gastronomía · Menú digital",
    title: "MIGA",
    description:
      "Una experiencia digital para explorar un menú, descubrir productos y preparar un pedido.",
    detail:
      "Menú digital interactivo con catálogo de productos, búsqueda, filtros por categoría y carrito de compras. La demostración utiliza datos simulados y no procesa pedidos ni pagos reales.",
    tags: ["React", "TypeScript", "Vite", "UX/UI"],
    color: "project-sand",
    featured: false,
    slug: "miga",
    image: portadaImage,
    screenshots: [
      {
        src: portadaImage,
        alt: "Portada del menú digital MIGA",
      },
      {
        src: menuImage,
        alt: "Catálogo de productos de MIGA",
      },
      {
        src: carritoImage,
        alt: "Carrito de compras de MIGA",
      },
    ],
    demoUrl: import.meta.env.VITE_MIGA_DEMO_URL || "https://miga-gules.vercel.app/",
    status: "Demo interactiva",
  },
];

function Projects() {
  const featuredProject =
    projects.find((project) => project.featured) ?? projects[0];

  const otherProjects = projects.filter(
    (project) => !project.featured
  );

  return (
    <main className="projects-page">
      {/* HERO */}
      <section className="projects-hero">
        <div className="projects-hero-content">
          <span className="eyebrow">NUESTRO TRABAJO</span>

          <h1>
            Ideas que se
            <br />
            convierten en
            <br />
            <span>productos.</span>
          </h1>

          <p>
            Exploramos, diseñamos y construimos productos digitales
            que buscan resolver problemas reales mediante tecnología.
          </p>
        </div>

        <div className="projects-hero-index">
          <span>PROJECTS</span>
          <strong>{String(projects.length).padStart(2, "0")}</strong>
        </div>
      </section>

      {/* PROYECTO DESTACADO */}
      <section className="featured-project-section">
        <div className="project-section-label">
          <span>{featuredProject.number}</span>
          <span>PROYECTO DESTACADO</span>
        </div>

        <div className="featured-project">
          <div
            className={`featured-project-visual featured-project-visual--image ${featuredProject.color}`}
          >
            <img
              className="featured-project-image"
              src={featuredProject.image}
              alt={`Portada del proyecto ${featuredProject.title}`}
            />
            <div className="project-visual-top">
              <span>{featuredProject.category}</span>
              <span>{featuredProject.number}</span>
            </div>

            <div className="project-visual-bottom">
              <span>{featuredProject.title} · DIGITAL PRODUCT</span>
              <span>↗</span>
            </div>
          </div>

          <div className="featured-project-info">
            <span className="eyebrow">{featuredProject.category}</span>

            <h2>{featuredProject.title}</h2>
            <p>{featuredProject.description}</p>

            <div className="project-tags">
              {featuredProject.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <a
              href={featuredProject.demoUrl}
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visitar sitio <span>↗</span>
            </a>
          </div>
        </div>

        {featuredProject.screenshots.length > 1 && (
          <div className="featured-project-gallery">
            <div className="project-section-label">
              <span>VISTAS DEL PROYECTO</span>
              <span>{String(featuredProject.screenshots.length - 1).padStart(2, "0")}</span>
            </div>

            <div className="featured-project-gallery-grid">
              {featuredProject.screenshots.slice(1).map((screenshot) => (
                <figure key={screenshot.src}>
                  <img src={screenshot.src} alt={screenshot.alt} loading="lazy" />
                  <figcaption>{screenshot.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CATÁLOGO DE PROYECTOS */}
      <section className="projects-list-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">PORTAFOLIO</span>

            <h2>
              Proyectos que
              <br />
              <span>toman forma.</span>
            </h2>
          </div>

          <p>
            Cada proyecto tiene un propósito, una experiencia y una
            solución particular. Explora lo que estamos construyendo.
          </p>
        </div>

        <div className="projects-grid">
          {otherProjects.map((project) => (
            <article className="project-card" key={project.slug}>
              <Link
                to={`/proyectos/${project.slug}`}
                className="project-card-link"
                aria-label={`Conocer el proyecto ${project.title}`}
              >
                <div
                  className={`project-card-visual ${project.color} ${
                    "image" in project && project.image
                      ? "project-card-visual--image"
                      : ""
                  }`}
                >
                  {"image" in project && project.image ? (
                    <img
                      src={project.image}
                      alt={`Vista previa de ${project.title}`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="project-card-center">
                      <span>QUORUM</span>
                      <h3>{project.title}</h3>
                    </div>
                  )}

                  <div className="project-card-number">
                    {project.number}
                  </div>

                  <div className="project-card-arrow">↗</div>

                  {"status" in project && project.status && (
                    <span className="project-status">
                      {project.status}
                    </span>
                  )}
                </div>

                <div className="project-card-info">
                  <span className="project-category">
                    {project.category}
                  </span>

                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>

              {"demoUrl" in project && project.demoUrl && (
                <a
                  className="project-demo-link"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explorar demo <span aria-hidden="true">↗</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ENFOQUE */}
      <section className="projects-approach">
        <div className="approach-label">
          <span>03</span>
          <span>NUESTRO ENFOQUE</span>
        </div>

        <div className="approach-content">
          <span className="eyebrow">MÁS QUE CÓDIGO</span>

          <h2>
            Cada proyecto
            <br />
            empieza con una
            <br />
            <span>pregunta.</span>
          </h2>

          <p>
            Antes de pensar en tecnologías, pensamos en el problema.
            Buscamos entender qué necesita realmente el usuario, qué
            necesita el negocio y qué podemos construir para conectar
            ambos puntos.
          </p>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="projects-final-cta">
        <span className="eyebrow">¿TIENES UNA IDEA?</span>

        <h2>
          Quizá nuestro
          <br />
          próximo proyecto
          <br />
          sea <span>el tuyo.</span>
        </h2>

        <p>
          Cuéntanos qué quieres construir y exploremos las posibilidades.
        </p>

        <Link to="/contacto">Iniciar conversación →</Link>
      </section>
    </main>
  );
}

export default Projects;
