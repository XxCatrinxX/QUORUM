import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import AppRoutes from './routes/AppRoutes'
import './App.css'

function App() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App
