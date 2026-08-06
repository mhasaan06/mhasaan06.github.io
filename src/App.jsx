import React, { useState, useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';

import LoadingScreen from './components/ui/LoadingScreen';
import CursorGlow from './components/ui/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollProgress from './components/ui/ScrollProgress';

/* ── Lazy-loaded below-the-fold sections ── */
const About = lazy(() => import('./components/About'));
const Timeline = lazy(() => import('./components/Timeline'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

/* Lazy-load Toaster — only needed when contact form submits */
const Toaster = lazy(() =>
  import('react-hot-toast').then((mod) => ({ default: mod.Toaster }))
);

/* Minimal fallback to prevent CLS — invisible div with approximate section height */
const SectionFallback = ({ minHeight = '50vh' }) => (
  <div style={{ minHeight }} aria-hidden="true" />
);

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

        <Suspense fallback={null}>
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
        </Suspense>

        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main>
          <Hero darkMode={darkMode} />
          <Suspense fallback={<SectionFallback minHeight="80vh" />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionFallback minHeight="60vh" />}>
            <Timeline />
          </Suspense>
          <Suspense fallback={<SectionFallback minHeight="70vh" />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionFallback minHeight="60vh" />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<SectionFallback minHeight="70vh" />}>
            <Certifications />
          </Suspense>
          <Suspense fallback={<SectionFallback minHeight="60vh" />}>
            <Contact />
          </Suspense>
        </main>

        <Suspense fallback={<SectionFallback minHeight="20vh" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}
