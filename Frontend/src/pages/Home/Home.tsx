// Página principal: concentra todas sus secciones para mantener el flujo de Home en un solo archivo.
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';

const services = [
	// El contenido de estas listas se refleja directamente en la interfaz de Home.
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
];

const projects = [
	{
		category: 'Fintech · Producto digital',
		title: 'Nexo',
		detail: 'Una nueva forma de entender tus finanzas.',
		tag: 'Concepto',
		color: 'project-sand',
	},
	{
		category: 'Logística · Plataforma',
		title: 'Cargu',
		detail: 'Moviendo negocios hacia adelante.',
		tag: 'Concepto',
		color: 'project-coral',
	},
];

const WHATSAPP_NUMBER = '523311948323';

export default function Home() {
	const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

	return (
		<>
			<section className="hero-section" id="top">
				<div className="hero-copy">
					<p className="eyebrow">Soluciones tecnológicas para empresas</p>
					<h1>
						Tu visión.
						<br />
						<em>Nuestra tecnología.</em>
					</h1>
					<p className="hero-intro">
						Transformamos ideas y necesidades de negocio en soluciones digitales que ayudan a las empresas a crecer, automatizar y trabajar mejor.
					</p>
					<div className="hero-actions">
						<Link className="button button-primary" to="/contacto#form-contact">
							Cuéntanos tu proyecto
							<span aria-hidden="true">↗</span>
						</Link>
						<Link className="button button-secondary" to="/proyectos">Ver proyectos</Link>
					</div>
				</div>

				<div className="hero-art" aria-label="Visual abstracto de tecnología">
					<div className="art-grid" />
					<div className="art-card art-card-main">
						<span className="art-label">technology / 01</span>
						<img src={logo} alt="Logo" />
						<strong>
							Build what
							<br />
							matters.
						</strong>
					</div>
					<div className="art-card art-card-note">
						<span>Digital</span>
						<small>solutions</small>
					</div>
					<span className="art-orbit orbit-one" />
					<span className="art-orbit orbit-two" />
				</div>

				<Link className="scroll-cue" to="/servicios">
					<span aria-hidden="true">↓</span>
					Explorar
				</Link>
			</section>

			<section className="section services-section" id="services">
				<div className="section-heading">
					<p className="eyebrow">Lo que hacemos</p>
					<h2>
						Tecnología para
						<br />
						hacer crecer tu negocio.
					</h2>
				</div>
				<div className="services-list">
					{services.map((service) => (
						<article className="service-item" key={service.number}>
							<span className="service-number">{service.number}</span>
							<div>
								<h3>{service.title}</h3>
								<p>{service.text}</p>
							</div>
							<span className="service-arrow" aria-hidden="true">↗</span>
						</article>
					))}
				</div>
			</section>

			<section className="section work-section" id="work">
				<div className="section-heading work-heading">
					<p className="eyebrow">Trabajo seleccionado</p>
					<h2>
						Hecho para
						<br />
						<em>dejar huella.</em>
					</h2>
					<p className="work-intro">
						Algunos conceptos y proyectos que representan nuestra forma de crear productos digitales.
					</p>
					<a className="text-link" href="/work">
						Explorar proyectos
						<span aria-hidden="true">↗</span>
					</a>
				</div>

				<div className="project-grid">
					{projects.map((project, index) => (
						<article className={`project-card ${project.color}`} key={project.title}>
							<div className="project-visual">
								<div className="project-meta">
									<span className="project-index">0{index + 1}</span>
									<span className="project-tag">{project.tag}</span>
								</div>
								<span className="project-letter" aria-hidden="true">{project.title.charAt(0)}</span>
							</div>
							<div className="project-info">
								<p className="project-category">{project.category}</p>
								<h3>{project.title}</h3>
								<p className="project-detail">{project.detail}</p>
							</div>
						</article>
					))}
				</div>
			</section>

			<section className="contact-band" id="contact" aria-labelledby="contact-title">
				<div className="contact-band__content">
					<div className="contact-band__text">
						<span className="contact-band__eyebrow">¿Tienes un reto en mente?</span>
						<h2 id="contact-title">Hagamos que avance.</h2>
						<p>
							Cuéntanos qué quieres construir, mejorar o automatizar. En QUORUM convertimos ideas y necesidades de negocio en soluciones tecnológicas.
						</p>
					</div>
					<div className="contact-band__actions">
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
					<span aria-hidden="true">•</span>
					<span>Guadalajara, Jalisco · México</span>
				</div>
			</section>
		</>
	);
}
