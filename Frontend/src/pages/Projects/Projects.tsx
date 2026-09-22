import { Link } from 'react-router-dom';
// Catálogo de proyectos: los datos de cada tarjeta se mantienen en los arreglos de esta vista.
import './Projects.css';

const projects = [
  {
    number: '01',
    category: 'Fintech · Producto digital',
    title: 'Nexo',
    description:
      'Una nueva forma de entender y administrar tus finanzas desde un solo lugar.',
    detail:
      'Plataforma digital enfocada en simplificar la relación de las personas con sus finanzas.',
    tags: ['Fintech', 'Web App', 'UX/UI'],
    color: 'project-sand',
    featured: true,
    slug: 'nexo',
  },
  {
    number: '02',
    category: 'Logística · Plataforma',
    title: 'Cargu',
    description:
      'Una plataforma para conectar, administrar y optimizar operaciones logísticas.',
    detail:
      'Herramienta digital para centralizar procesos y facilitar la gestión logística.',
    tags: ['Logística', 'Plataforma', 'Dashboard'],
    color: 'project-blue',
    featured: false,
    slug: 'cargu',
  },
  {
    number: '03',
    category: 'Software · Producto digital',
    title: 'Proyecto 03',
    description:
      'Una solución digital pensada para resolver problemas específicos de negocio.',
    detail:
      'Proyecto actualmente en desarrollo.',
    tags: ['Software', 'Web', 'Producto'],
    color: 'project-gray',
    featured: false,
    slug: 'proyecto-03',
  },
  {
    number: '04',
    category: 'Tecnología · Automatización',
    title: 'Proyecto 04',
    description:
      'Tecnología diseñada para hacer procesos más simples, rápidos y eficientes.',
    detail:
      'Proyecto actualmente en exploración.',
    tags: ['Automatización', 'IA', 'Software'],
    color: 'project-yellow',
    featured: false,
    slug: 'proyecto-04',
  },
];

function Projects() {
  const featuredProject = projects.find(
    (project) => project.featured
  ) ?? projects[0];

  const otherProjects = projects.filter(
    (project) => !project.featured
  );

  return (
    <main className="projects-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="projects-hero">

        <div className="projects-hero-content">

          <span className="eyebrow">
            NUESTRO TRABAJO
          </span>

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
          <strong>04</strong>
        </div>

      </section>


      {/* =========================
          FEATURED PROJECT
      ========================= */}

      <section className="featured-project-section">

        <div className="project-section-label">

          <span>01</span>

          <span>
            PROYECTO DESTACADO
          </span>

        </div>


        <div className="featured-project">

          <div
            className={`featured-project-visual ${featuredProject.color}`}
          >

            <div className="project-visual-top">
              <span>
                {featuredProject.category}
              </span>

              <span>
                {featuredProject.number}
              </span>
            </div>

            <div className="project-visual-content">

              <span className="project-visual-brand">
                QUORUM
              </span>

              <h2>
                {featuredProject.title}
              </h2>

              <p>
                {featuredProject.detail}
              </p>

            </div>

            <div className="project-visual-bottom">
              <span>
                DIGITAL PRODUCT
              </span>

              <span>
                ↗
              </span>
            </div>

          </div>


          <div className="featured-project-info">

            <span className="eyebrow">
              {featuredProject.category}
            </span>

            <h2>
              {featuredProject.title}
            </h2>

            <p>
              {featuredProject.description}
            </p>

            <div className="project-tags">

              {featuredProject.tags.map((tag) => (
                <span key={tag}>
                  {tag}
                </span>
              ))}

            </div>

            <Link
              to={`/proyectos/${featuredProject.slug}`}
              className="project-link"
            >
              Ver proyecto
              <span>↗</span>
            </Link>

          </div>

        </div>

      </section>


      {/* =========================
          PROJECT GRID
      ========================= */}

      <section className="projects-list-section">

        <div className="section-header">

          <div>

            <span className="eyebrow">
              MÁS PROYECTOS
            </span>

            <h2>
              Lo que estamos
              <br />
              <span>construyendo.</span>
            </h2>

          </div>

          <p>
            Algunos proyectos nacen como productos propios y otros
            surgen a partir de necesidades específicas. Todos
            comparten la misma intención: crear algo útil.
          </p>

        </div>


        <div className="projects-grid">

          {otherProjects.map((project) => (

            <article
              className="project-card"
              key={project.number}
            >

              <Link
                to={`/proyectos/${project.slug}`}
                className="project-card-link"
              >

                <div
                  className={`project-card-visual ${project.color}`}
                >

                  <div className="project-card-number">
                    {project.number}
                  </div>

                  <div className="project-card-center">

                    <span>
                      QUORUM
                    </span>

                    <h3>
                      {project.title}
                    </h3>

                  </div>

                  <div className="project-card-arrow">
                    ↗
                  </div>

                </div>


                <div className="project-card-info">

                  <span className="project-category">
                    {project.category}
                  </span>

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {project.description}
                  </p>

                  <div className="project-tags">

                    {project.tags.map((tag) => (
                      <span key={tag}>
                        {tag}
                      </span>
                    ))}

                  </div>

                </div>

              </Link>

            </article>

          ))}

        </div>

      </section>


      {/* =========================
          APPROACH
      ========================= */}

      <section className="projects-approach">

        <div className="approach-label">

          <span>03</span>

          <span>
            NUESTRO ENFOQUE
          </span>

        </div>


        <div className="approach-content">

          <span className="eyebrow">
            MÁS QUE CÓDIGO
          </span>

          <h2>
            Cada proyecto
            <br />
            empieza con una
            <br />
            <span>pregunta.</span>
          </h2>

          <p>
            Antes de pensar en tecnologías, pensamos en el problema.
            Buscamos entender qué necesita realmente el usuario,
            qué necesita el negocio y qué podemos construir para
            conectar ambos puntos.
          </p>

        </div>

      </section>


      {/* =========================
          CTA
      ========================= */}

      <section className="projects-final-cta">

        <span className="eyebrow">
          ¿TIENES UNA IDEA?
        </span>

        <h2>
          Quizá nuestro
          <br />
          próximo proyecto
          <br />
          sea <span>el tuyo.</span>
        </h2>

        <p>
          Cuéntanos qué quieres construir y exploremos las
          posibilidades.
        </p>

        <Link to="/contacto">
          Iniciar conversación →
        </Link>

      </section>

    </main>
  );
}

export default Projects;

