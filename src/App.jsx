import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ServicesGrid from './components/ServicesGrid';
import Footer from './components/Footer';
import IntroSplash from './components/IntroSplash';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="app">
      <a className="skip-link" href="#contenido">
        Ir al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <About />
        <ServicesGrid />
      </main>
      <Footer />
      {showIntro && <IntroSplash onComplete={() => setShowIntro(false)} />}
    </div>
  );
}

export default App;
