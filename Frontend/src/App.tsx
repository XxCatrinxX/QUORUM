import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Work } from './sections/Work'
import { ContactBand } from './sections/ContactBand'
import './App.css'

function App() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <Services />
        <Work />
        <ContactBand />
      </main>
      <Footer />
    </div>
  )
}

export default App
