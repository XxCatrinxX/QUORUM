const services = [
  { number: '01', title: 'Estrategia digital', text: 'Alineamos negocio, usuarios y tecnología para encontrar la dirección correcta.' },
  { number: '02', title: 'Diseño de producto', text: 'Convertimos flujos complejos en interfaces intuitivas, útiles y memorables.' },
  { number: '03', title: 'Desarrollo', text: 'Construimos software robusto, rápido y listo para crecer con tu equipo.' },
]

export function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="section-heading"><p className="eyebrow">Lo que hacemos</p><h2>Del primer boceto<br />al producto real.</h2></div>
      <div className="services-list">
        {services.map((service) => <article className="service-item" key={service.number}><span className="service-number">{service.number}</span><div><h3>{service.title}</h3><p>{service.text}</p></div><span className="service-arrow" aria-hidden="true">↗</span></article>)}
      </div>
    </section>
  )
}