import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Work } from './sections/Work'
import './App.css'

function App() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <Services />
        <Work />
        <section className="contact-band" id="contact">
          <div>
            <p className="eyebrow">¿Tienes un reto en mente?</p>
            <h2>Hagamos que avance.</h2>
          </div>
          <a className="button button-light" href="mailto:hola@quorum.dev">
            Cuéntanos tu proyecto <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
