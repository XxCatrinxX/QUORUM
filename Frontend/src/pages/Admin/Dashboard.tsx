import { useEffect, useState } from "react";

import api from "../../api/axios";

type Project = {
  id: number;
};

export default function Dashboard() {
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    const loadProjectCount = async () => {
      try {
        const response = await api.get<Project[]>("/api/admin/projects");

        setProjectCount(response.data.length);
      } catch {
        setProjectCount(0);
      }
    };

    void loadProjectCount();
  }, []);

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

          <strong>{projectCount}</strong>

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
