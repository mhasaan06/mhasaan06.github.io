import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Lenis from 'lenis';

import LoadingScreen from './components/ui/LoadingScreen';
import CursorGlow from './components/ui/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ui/ScrollProgress';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  // Toggle dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Background ambient cursor glow — hidden on touch devices */}
      <CursorGlow darkMode={darkMode} />

        {loading && <LoadingScreen />}

      <div className={`relative transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Noise texture overlay */}
        <div className="noise-overlay" />

        <ScrollProgress />

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: darkMode ? '#1C1A18' : '#fff',
              color: darkMode ? '#F1EDE9' : '#1A1815',
              border: '1px solid rgba(224,122,95,0.3)',
              borderRadius: '12px',
              fontFamily: 'Inter, sans-serif',
            },
            success: {
              iconTheme: { primary: '#E07A5F', secondary: '#F1EDE9' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#F1EDE9' },
            },
          }}
        />

        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main>
          <Hero darkMode={darkMode} />
          <About />
          <Timeline />
          <Projects />
          <Skills />
          <Certifications />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
