// Página de contacto: gestiona el estado del formulario y sus canales directos.
import { useState, type ChangeEvent, type FormEvent } from 'react';
import './Contact.css';

const initialForm = {
  name: '',
  company: '',
  email: '',
  projectType: '',
  budget: '',
  message: '',
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Aquí posteriormente conectaremos el formulario
    // con el backend / servicio de correo.

    console.log('Formulario enviado:', form);

    setStatus('success');

    setForm(initialForm);
  };

  return (
    <main className="contact-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="contact-hero">

        <div className="contact-hero-content">

          <span className="eyebrow">
            HABLEMOS
          </span>

          <h1>
            Cuéntanos qué
            <br />
            quieres
            <br />
            <span>construir.</span>
          </h1>

          <p>
            No necesitas tener todo definido. Cuéntanos tu idea,
            problema o proyecto y nosotros nos encargamos de
            explorar las posibilidades.
          </p>

        </div>

        <div className="contact-hero-number">
          <span>QUORUM</span>
          <strong>04</strong>
        </div>

      </section>


      {/* =========================
          CONTACT INFO
      ========================= */}

      <section className="contact-info-section">

        <div className="contact-info-label">

          <span>01</span>

          <span>
            CONTACTO DIRECTO
          </span>

        </div>


        <div className="contact-info-grid">

          <a
            href="mailto:contacto@quórum.tech"
            className="contact-info-card"
          >

            <span className="contact-info-type">
              EMAIL
            </span>

            <h2>
              contacto@quórum.tech
            </h2>

            <span className="contact-info-arrow">
              ↗
            </span>

          </a>


          <a
            href="https://wa.me/523311948323"
            className="contact-info-card"
            target="_blank"
            rel="noreferrer"
          >

            <span className="contact-info-type">
              WHATSAPP
            </span>

            <h2>
              Hablemos
            </h2>

            <span className="contact-info-arrow">
              ↗
            </span>

          </a>


          <div className="contact-info-card">

            <span className="contact-info-type">
              UBICACIÓN
            </span>

            <h2>
              Guadalajara,
              <br />
              México
            </h2>

            <span className="contact-info-arrow">
              ↗
            </span>

          </div>

        </div>

      </section>


      {/* =========================
          FORMULARIO
      ========================= */}

      <section className="contact-form-section">

        <div className="contact-form-intro" id='form-contact'>

          <span className="eyebrow">
            02 / TU PROYECTO
          </span>

          <h2>
            Empecemos
            <br />
            por una
            <br />
            <span>idea.</span>
          </h2>

          <p>
            Completa la información que tengas disponible.
            No necesitas conocer todos los detalles técnicos.
          </p>

        </div>


        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          {/* NOMBRE */}

          <div className="form-field">

            <label htmlFor="name">
              Tu nombre
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="¿Cómo te llamas?"
              required
            />

          </div>


          {/* EMPRESA */}

          <div className="form-field">

            <label htmlFor="company">
              Empresa
            </label>

            <input
              id="company"
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Nombre de tu empresa"
            />

          </div>


          {/* EMAIL */}

          <div className="form-field">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />

          </div>


          {/* TIPO DE PROYECTO */}

          <div className="form-field">

            <label htmlFor="projectType">
              ¿Qué quieres construir?
            </label>

            <select
              id="projectType"
              name="projectType"
              value={form.projectType}
              onChange={handleChange}
              required
            >

              <option value="">
                Selecciona una opción
              </option>

              <option value="web">
                Plataforma / Aplicación web
              </option>

              <option value="mobile">
                Aplicación móvil
              </option>

              <option value="system">
                Sistema empresarial
              </option>

              <option value="ecommerce">
                E-commerce
              </option>

              <option value="automation">
                Automatización
              </option>

              <option value="ai">
                Inteligencia artificial
              </option>

              <option value="other">
                Otro
              </option>

            </select>

          </div>


          {/* PRESUPUESTO */}

          <div className="form-field">

            <label htmlFor="budget">
              Presupuesto aproximado
            </label>

            <select
              id="budget"
              name="budget"
              value={form.budget}
              onChange={handleChange}
            >

              <option value="">
                Prefiero hablarlo
              </option>

              <option value="10-25">
                $10,000 — $25,000 MXN
              </option>

              <option value="25-50">
                $25,000 — $50,000 MXN
              </option>

              <option value="50-100">
                $50,000 — $100,000 MXN
              </option>

              <option value="100+">
                $100,000+ MXN
              </option>

            </select>

          </div>


          {/* MENSAJE */}

          <div className="form-field form-field-full">

            <label htmlFor="message">
              Cuéntanos sobre el proyecto
            </label>

            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="¿Qué problema quieres resolver? ¿Qué tienes en mente?"
              rows={6}
              required
            />

          </div>


          {/* SUBMIT */}

          <div className="form-submit">

            <button type="submit">
              Enviar proyecto
              <span>↗</span>
            </button>

            <small>
              Al enviar este formulario aceptas que podamos
              contactarte para hablar sobre tu proyecto.
            </small>

          </div>


          {/* SUCCESS */}

          {status === 'success' && (

            <div className="form-success">

              <strong>
                ¡Gracias por escribirnos!
              </strong>

              <p>
                Recibimos la información de tu proyecto.
                Nos pondremos en contacto contigo.
              </p>

            </div>

          )}

        </form>

      </section>


      {/* =========================
          WHAT HAPPENS NEXT
      ========================= */}

      <section className="contact-process">

        <div className="contact-process-label">

          <span>03</span>

          <span>
            ¿Y DESPUÉS?
          </span>

        </div>


        <div className="contact-process-content">

          <span className="eyebrow">
            DESPUÉS DE ENVIAR
          </span>

          <h2>
            Una conversación
            <br />
            antes que una
            <br />
            <span>propuesta.</span>
          </h2>

          <p>
            Primero queremos entender lo que necesitas. Hablamos
            contigo, analizamos el proyecto y, si existe una buena
            oportunidad para trabajar juntos, definimos los
            siguientes pasos.
          </p>


          <div className="contact-steps">

            <div>
              <span>01</span>
              <strong>Te escuchamos</strong>
            </div>

            <div>
              <span>02</span>
              <strong>Analizamos</strong>
            </div>

            <div>
              <span>03</span>
              <strong>Proponemos</strong>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FINAL CTA
      ========================= */}

      <section className="contact-final">

        <span className="eyebrow">
          QUORUM
        </span>

        <h2>
          Hagamos algo
          <br />
          <span>interesante.</span>
        </h2>

        <a href="mailto:contacto@quórum.tech">
          contacto@quórum.tech →
        </a>

      </section>

    </main>
  );
}

export default Contact;

