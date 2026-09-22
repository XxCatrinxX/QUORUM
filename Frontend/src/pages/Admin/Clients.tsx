export default function Clients() {
  return (
    <section>
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Gestión</span>
          <h1>Clientes</h1>
          <p>Información y seguimiento de clientes.</p>
        </div>

        <button className="admin-primary-button">+ Nuevo cliente</button>
      </div>

      <div className="admin-empty-state">
        <span>CLIENTES / 00</span>
        <h2>Aún no hay clientes</h2>
        <p>Los clientes registrados aparecerán aquí.</p>
      </div>
    </section>
  );
}
