export default function AdminProjects() {
  return (
    <section>
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Gestión</span>
          <h1>Proyectos</h1>
          <p>Administra los proyectos de la empresa.</p>
        </div>

        <button className="admin-primary-button">+ Nuevo proyecto</button>
      </div>

      <div className="admin-empty-state">
        <span>PROYECTOS / 00</span>
        <h2>Aún no hay proyectos</h2>
        <p>Cuando registremos proyectos aparecerán en esta sección.</p>
      </div>
    </section>
  );
}
