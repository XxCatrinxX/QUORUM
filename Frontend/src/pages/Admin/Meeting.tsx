export default function Meeting() {
  return (
    <section>
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Calendario</span>
          <h1>Reuniones</h1>
          <p>Organización de reuniones con clientes y equipo.</p>
        </div>

        <button className="admin-primary-button">+ Nueva reunión</button>
      </div>

      <div className="admin-empty-state">
        <span>REUNIONES / 00</span>
        <h2>No hay reuniones programadas</h2>
        <p>Las próximas reuniones aparecerán en esta sección.</p>
      </div>
    </section>
  );
}
