export default function Dashboard() {
  return (
    <section>
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Resumen</span>
          <h1>Dashboard</h1>
          <p>Vista general de la actividad de QUÓRUM.</p>
        </div>
      </div>

      <div className="admin-stats">
        <article className="admin-stat-card">
          <span>Proyectos</span>
          <strong>0</strong>
          <small>Proyectos registrados</small>
        </article>

        <article className="admin-stat-card">
          <span>Clientes</span>
          <strong>0</strong>
          <small>Clientes registrados</small>
        </article>

        <article className="admin-stat-card">
          <span>Tareas</span>
          <strong>0</strong>
          <small>Tareas pendientes</small>
        </article>

        <article className="admin-stat-card">
          <span>Reuniones</span>
          <strong>0</strong>
          <small>Próximas reuniones</small>
        </article>
      </div>
    </section>
  );
}
