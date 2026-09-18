const projects = [
  { category: 'Fintech · Producto digital', title: 'Nexo', detail: 'Una nueva forma de entender tus finanzas.', color: 'project-sand' },
  { category: 'Logística · Plataforma', title: 'Cargu', detail: 'Moviendo negocios hacia adelante.', color: 'project-coral' },
]

export function Work() {
  return (
    <section className="section work-section" id="work">
      <div className="section-heading work-heading"><p className="eyebrow">Trabajo seleccionado</p><h2>Hecho para<br /><em>dejar huella.</em></h2><a className="text-link" href="#contact">Ver todos los proyectos <span aria-hidden="true">↗</span></a></div>
      <div className="project-grid">
        {projects.map((project) => <article className={`project-card ${project.color}`} key={project.title}><div className="project-visual"><span>{project.title.slice(0, 1)}</span></div><p className="project-category">{project.category}</p><h3>{project.title}</h3><p>{project.detail}</p></article>)}
      </div>
    </section>
  )
}