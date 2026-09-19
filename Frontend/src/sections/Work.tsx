const projects = [
  {
    category: 'Fintech · Producto digital',
    title: 'Nexo',
    detail: 'Una nueva forma de entender tus finanzas.',
    tag: 'Concepto',
    color: 'project-sand',
  },
  {
    category: 'Logística · Plataforma',
    title: 'Cargu',
    detail: 'Moviendo negocios hacia adelante.',
    tag: 'Concepto',
    color: 'project-coral',
  },
]

export function Work() {
  return (
    <section className="section work-section" id="work">
      <div className="section-heading work-heading">
        <p className="eyebrow">Trabajo seleccionado</p>

        <h2>
          Hecho para
          <br />
          <em>dejar huella.</em>
        </h2>

        <p className="work-intro">
          Algunos conceptos y proyectos que representan
          nuestra forma de crear productos digitales.
        </p>

        <a className="text-link" href="/work">
          Explorar proyectos
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="project-grid">
        {projects.map((project, index) => (
          <article
            className={`project-card ${project.color}`}
            key={project.title}
          >
            <div className="project-visual">
              <span aria-hidden="true">
                {project.title.charAt(0)}
              </span>

              <span className="project-index">
                0{index + 1}
              </span>

              <span className="project-tag">
                {project.tag}
              </span>
            </div>

            <div className="project-info">
              <p className="project-category">
                {project.category}
              </p>

              <h3>{project.title}</h3>

              <p className="project-detail">
                {project.detail}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
