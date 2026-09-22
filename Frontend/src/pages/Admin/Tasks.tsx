export default function Tasks() {
  return (
    <section>
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Organización</span>
          <h1>Tareas</h1>
          <p>Seguimiento de actividades del equipo.</p>
        </div>

        <button className="admin-primary-button">+ Nueva tarea</button>
      </div>

      <div className="admin-empty-state">
        <span>TAREAS / 00</span>
        <h2>No hay tareas pendientes</h2>
        <p>Aquí podremos asignar y administrar las tareas del equipo.</p>
      </div>
    </section>
  );
}
