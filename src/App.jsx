import { useState } from 'react';
import IntroSplash from './components/IntroSplash';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ServicesGrid from './components/ServicesGrid';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroSplash onComplete={handleIntroComplete} />;
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Hero />
        <About />
        <ServicesGrid />
      </main>
      <Footer />
    </div>
  );
}

const handleIntroComplete = (state) => {
  if (state === "start-fade") {
    document.body.classList.add("home-fade-in");
  }

  if (state === "finish") {
    setShowIntro(false);
  }
};

export default App;
