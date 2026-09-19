const services = [
  {
    number: '01',
    title: 'Desarrollo web',
    text: 'Creamos sitios web y plataformas digitales profesionales, rápidas y adaptadas a las necesidades de cada negocio.',
  },
  {
    number: '02',
    title: 'Sistemas empresariales',
    text: 'Desarrollamos sistemas a medida para administrar, automatizar y mejorar los procesos internos de tu empresa.',
  },
  {
    number: '03',
    title: 'Aplicaciones móviles',
    text: 'Convertimos ideas y necesidades de negocio en aplicaciones móviles funcionales, intuitivas y escalables.',
  },
  {
    number: '04',
    title: 'Automatización',
    text: 'Simplificamos tareas repetitivas mediante tecnología para ahorrar tiempo, reducir errores y mejorar la operación.',
  },
  {
    number: '05',
    title: 'Infraestructura tecnológica',
    text: 'Implementamos y configuramos soluciones de infraestructura para que tus sistemas funcionen de forma estable y segura.',
  },
]

export function Services() {
  return (
    <section className="section services-section" id="services">

      <div className="section-heading">

        <p className="eyebrow">
          Lo que hacemos
        </p>

        <h2>
          Tecnología para
          <br />
          hacer crecer tu negocio.
        </h2>

      </div>

      <div className="services-list">

        {services.map((service) => (

          <article
            className="service-item"
            key={service.number}
          >

            <span className="service-number">
              {service.number}
            </span>

            <div>

              <h3>
                {service.title}
              </h3>

              <p>
                {service.text}
              </p>

            </div>

            <span
              className="service-arrow"
              aria-hidden="true"
            >
              ↗
            </span>

          </article>

        ))}

      </div>

    </section>
  )
}