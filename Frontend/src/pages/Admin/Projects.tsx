import { useEffect, useState, type FormEvent } from "react";

import axios from "axios";

import api from "../../api/axios";

import "./AdminProjects.css";
import "./AdminProjectsActions.css";

type ProjectColor =
  | "project-sand"
  | "project-blue"
  | "project-gray"
  | "project-yellow";

type Project = {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  detail: string | null;
  tags: string[];
  color: ProjectColor;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

type ProjectForm = {
  title: string;
  slug: string;
  category: string;
  description: string;
  detail: string;
  tags: string;
  color: ProjectColor;
  featured: boolean;
};

const emptyForm: ProjectForm = {
  title: "",
  slug: "",
  category: "",
  description: "",
  detail: "",
  tags: "",
  color: "project-sand",
  featured: false,
};

function createSlugPreview(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [error, setError] = useState("");

  const [formError, setFormError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [form, setForm] = useState<ProjectForm>(emptyForm);

  const generatedSlug = createSlugPreview(form.title);

  const slugPreview =
    form.slug.trim() || generatedSlug || "nombre-del-proyecto";

  const loadProjects = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get<Project[]>("/api/admin/projects");

      setProjects(response.data);
    } catch {
      setError("No se pudieron cargar los proyectos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);

    setForm(emptyForm);

    setFormError("");

    setModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);

    setForm({
      title: project.title,

      slug: project.slug,

      category: project.category,

      description: project.description,

      detail: project.detail ?? "",

      tags: project.tags.join(", "),

      color: project.color,

      featured: project.featured,
    });

    setFormError("");

    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) {
      return;
    }

    setModalOpen(false);

    setEditingProject(null);

    setForm(emptyForm);

    setFormError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormError("");

    if (
      !form.title.trim() ||
      !form.category.trim() ||
      !form.description.trim()
    ) {
      setFormError("Nombre, categoría y descripción son obligatorios.");

      return;
    }

    setSaving(true);

    const payload = {
      title: form.title.trim(),

      slug: form.slug.trim() || null,

      category: form.category.trim(),

      description: form.description.trim(),

      detail: form.detail.trim() || null,

      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),

      color: form.color,

      featured: form.featured,
    };

    try {
      await api.get("/sanctum/csrf-cookie");

      if (editingProject) {
        await api.put(`/api/admin/projects/${editingProject.id}`, payload);
      } else {
        await api.post("/api/admin/projects", payload);
      }

      closeModal();

      await loadProjects();
    } catch (requestError) {
      if (axios.isAxiosError(requestError)) {
        const backendErrors = requestError.response?.data?.errors;

        if (backendErrors) {
          const firstError = Object.values(backendErrors)[0];

          if (Array.isArray(firstError) && firstError[0]) {
            setFormError(String(firstError[0]));

            return;
          }
        }

        if (requestError.response?.data?.message) {
          setFormError(requestError.response.data.message);

          return;
        }
      }

      setFormError("No se pudo guardar el proyecto.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project: Project) => {
    const confirmed = window.confirm(
      `¿Eliminar el proyecto "${project.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(project.id);
    setError("");

    try {
      await api.get("/sanctum/csrf-cookie");

      await api.delete(`/api/admin/projects/${project.id}`);

      await loadProjects();
    } catch {
      setError("No se pudo eliminar el proyecto.");
    } finally {
      setDeletingId(null);
    }
  };

  const totalProjects = String(projects.length).padStart(2, "0");

  return (
    <section className="qa-projects-admin">
      <div className="qa-projects-admin__heading">
        <div>
          <span className="qa-projects-admin__eyebrow">Gestión</span>

          <h1>Proyectos</h1>

          <p>Administra los proyectos de la empresa.</p>
        </div>

        <button
          type="button"
          className="qa-projects-admin__new-button"
          onClick={openCreateModal}
        >
          <span aria-hidden="true">+</span>
          Nuevo proyecto
        </button>
      </div>

      {error && <div className="qa-projects-admin__error">{error}</div>}

      <div className="qa-projects-admin__panel">
        <div className="qa-projects-admin__panel-header">
          <div>
            <span className="qa-projects-admin__panel-label">PROYECTOS</span>

            <strong>{totalProjects}</strong>
          </div>

          <p>Proyectos registrados en QUÓRUM</p>
        </div>

        {loading ? (
          <div className="qa-projects-admin__empty">
            <span>PROYECTOS</span>

            <h2>Cargando proyectos...</h2>
          </div>
        ) : projects.length === 0 ? (
          <div className="qa-projects-admin__empty">
            <span>PROYECTOS / 00</span>

            <h2>Aún no hay proyectos</h2>

            <p>Presiona “Nuevo proyecto” para registrar el primero.</p>
          </div>
        ) : (
          <div className="qa-projects-admin__table-wrapper">
            <table className="qa-projects-admin__table">
              <thead>
                <tr>
                  <th>Proyecto</th>

                  <th>Categoría</th>

                  <th>Etiquetas</th>

                  <th>Destacado</th>

                  <th>Slug</th>

                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project, index) => (
                  <tr key={project.id}>
                    <td>
                      <div className="qa-projects-admin__project">
                        <span className="qa-projects-admin__number">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="qa-projects-admin__project-copy">
                          <strong>{project.title}</strong>

                          <p>{project.description}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="qa-projects-admin__category">
                        {project.category}
                      </span>
                    </td>

                    <td>
                      <div className="qa-projects-admin__tags">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </td>

                    <td>
                      <span
                        className={
                          project.featured
                            ? "qa-projects-admin__featured qa-projects-admin__featured--yes"
                            : "qa-projects-admin__featured"
                        }
                      >
                        <span
                          className="qa-projects-admin__featured-dot"
                          aria-hidden="true"
                        />

                        {project.featured ? "Sí" : "No"}
                      </span>
                    </td>

                    <td>
                      <code className="qa-projects-admin__slug">
                        {project.slug}
                      </code>
                    </td>

                    <td>
                      <div className="qa-projects-admin__actions">
                        <button
                          type="button"
                          onClick={() => openEditModal(project)}
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className="qa-projects-admin__delete"
                          disabled={deletingId === project.id}
                          onClick={() => void handleDelete(project)}
                        >
                          {deletingId === project.id
                            ? "Eliminando..."
                            : "Eliminar"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="qa-project-modal" role="presentation">
          <div className="qa-project-modal__backdrop" onClick={closeModal} />

          <section
            className="qa-project-modal__card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <div className="qa-project-modal__header">
              <div>
                <span>
                  {editingProject ? "EDITAR PROYECTO" : "NUEVO PROYECTO"}
                </span>

                <h2 id="project-modal-title">
                  {editingProject ? editingProject.title : "Registrar proyecto"}
                </h2>
              </div>

              <button
                type="button"
                className="qa-project-modal__close"
                onClick={closeModal}
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <form className="qa-project-form" onSubmit={handleSubmit}>
              {formError && (
                <div className="qa-project-form__error">{formError}</div>
              )}

              <div className="qa-project-form__grid">
                <label>
                  <span>Nombre</span>

                  <input
                    type="text"
                    value={form.title}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,

                        title: event.target.value,
                      }))
                    }
                    required
                  />
                </label>

                <label>
                  <span className="qa-project-form__label-with-help">
                    <span>Slug</span>

                    <span className="qa-project-form__help">
                      <button
                        type="button"
                        className="qa-project-form__help-button"
                        aria-label="Información sobre el slug"
                      >
                        ?
                      </button>

                      <span className="qa-project-form__tooltip" role="tooltip">
                        Se usa para crear la URL del proyecto. Es opcional; si
                        lo dejas vacío se genera automáticamente desde el
                        nombre.
                      </span>
                    </span>
                  </span>

                  <input
                    type="text"
                    value={form.slug}
                    placeholder={generatedSlug || "Se genera automáticamente"}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,

                        slug: event.target.value,
                      }))
                    }
                  />

                  <span className="qa-project-form__slug-preview">
                    <span>Vista previa</span>

                    <code>/proyectos/{slugPreview}</code>
                  </span>
                </label>

                <label className="qa-project-form__full">
                  <span>Categoría</span>

                  <input
                    type="text"
                    value={form.category}
                    placeholder="Fintech · Producto digital"
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,

                        category: event.target.value,
                      }))
                    }
                    required
                  />
                </label>

                <label className="qa-project-form__full">
                  <span>Descripción</span>

                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,

                        description: event.target.value,
                      }))
                    }
                    required
                  />
                </label>

                <label className="qa-project-form__full">
                  <span>Detalle</span>

                  <textarea
                    rows={3}
                    value={form.detail}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,

                        detail: event.target.value,
                      }))
                    }
                  />
                </label>

                <label className="qa-project-form__full">
                  <span>Etiquetas</span>

                  <input
                    type="text"
                    value={form.tags}
                    placeholder="React, Laravel, UX/UI"
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,

                        tags: event.target.value,
                      }))
                    }
                  />

                  <small>Separa las etiquetas con comas.</small>
                </label>

                <label>
                  <span>Color</span>

                  <select
                    value={form.color}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,

                        color: event.target.value as ProjectColor,
                      }))
                    }
                  >
                    <option value="project-sand">Arena</option>

                    <option value="project-blue">Azul</option>

                    <option value="project-gray">Gris</option>

                    <option value="project-yellow">Amarillo</option>
                  </select>
                </label>

                <label className="qa-project-form__featured">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,

                        featured: event.target.checked,
                      }))
                    }
                  />

                  <span>Proyecto destacado</span>
                </label>
              </div>

              <div className="qa-project-form__footer">
                <button
                  type="button"
                  className="qa-project-form__cancel"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="qa-project-form__save"
                  disabled={saving}
                >
                  {saving
                    ? "Guardando..."
                    : editingProject
                      ? "Guardar cambios"
                      : "Crear proyecto"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}
