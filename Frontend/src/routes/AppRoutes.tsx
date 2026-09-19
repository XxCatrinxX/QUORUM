import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Services from '../pages/Services/Services';
import Projects from '../pages/Projects/Projects';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<About />} />
      <Route path="/servicios" element={<Services />} />
      <Route path="/proyectos" element={<Projects />} />
      <Route path="/contacto" element={<Contact />} />
    </Routes>
  );
}