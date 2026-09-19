import type { FC } from 'react'

const CONTACT_EMAIL = 'hola@quorum.dev'
const WHATSAPP_NUMBER = '521XXXXXXXXXX'

export const ContactBand: FC = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`

  return (
    <section
      className="contact-band"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-band__content">
        <div className="contact-band__text">
          <span className="contact-band__eyebrow">
            ¿Tienes un reto en mente?
          </span>

          <h2 id="contact-title">
            Hagamos que avance.
          </h2>

          <p>
            Cuéntanos qué quieres construir, mejorar o automatizar.
            En QUORUM convertimos ideas y necesidades de negocio
            en soluciones tecnológicas.
          </p>
        </div>

        <div className="contact-band__actions">
          <a
            className="button button-light"
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label="Enviar un correo a QUORUM"
          >
            Cuéntanos tu proyecto
            <span aria-hidden="true">↗</span>
          </a>

          <a
            className="button button-outline-light"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar a QUORUM por WhatsApp"
          >
            Hablemos por WhatsApp
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="contact-band__footer">
        <a href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>

        <span aria-hidden="true">•</span>

        <span>
          Guadalajara, Jalisco · México
        </span>
      </div>
    </section>
  )
}

