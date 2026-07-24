import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Download, ArrowRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons';


/* ── Magnetic button wrapper ── */
function MagneticBtn({ children, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated word reveal ── */
function WordReveal({ text, delay = 0 }) {
  const words = text.split(' ');
  return (
    <span className="inline-flex flex-wrap gap-x-[0.3em]">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: '120%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block overflow-hidden"
        >
          <span className="inline-block">{word}</span>
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const handleScrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* ── Animated background blobs ── */}
      <motion.div
        className="blob w-[500px] h-[500px] bg-terracotta -top-32 -left-32"
        animate={{
          x: mousePos.x * 0.015,
          y: mousePos.y * 0.015,
          scale: [1, 1.05, 1],
        }}
        transition={{ scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, x: { duration: 0.8 }, y: { duration: 0.8 } }}
      />
      <motion.div
        className="blob w-[400px] h-[400px] bg-sage -bottom-20 -right-20"
        animate={{
          x: -mousePos.x * 0.01,
          y: -mousePos.y * 0.01,
          scale: [1, 1.08, 1],
        }}
        transition={{ scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' }, x: { duration: 0.8 }, y: { duration: 0.8 } }}
      />
      <motion.div
        className="blob w-64 h-64 bg-terracotta/50 top-1/2 left-1/2"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(224,122,95,1) 1px, transparent 1px), linear-gradient(90deg, rgba(224,122,95,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="section-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-0 items-center min-h-[calc(100vh-5rem)]">

          {/* ── Left column: text ── */}
          <div className="flex flex-col justify-center gap-8 py-16 lg:py-0">
            {/* Eyebrow tag */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.7, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="pill-badge bg-terracotta/10 border border-terracotta/30 text-terracotta">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
                Available for work
              </span>
            </motion.div>

            {/* Name */}
            <div className="overflow-hidden">
              <h1 className="font-syne font-bold leading-[0.9] tracking-tight">
                <div className="text-[clamp(3.5rem,8vw,6.5rem)] dark:text-dark-text text-light-text">
                  <WordReveal text="Muhammad" delay={2.8} />
                </div>
                <div className="text-[clamp(3.5rem,8vw,6.5rem)]">
                  <motion.span
                    initial={{ y: '120%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.95, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-gradient-terracotta"
                  >
                    Hasaan
                  </motion.span>
                </div>
              </h1>
            </div>

            {/* Role chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              {['Full-Stack Developer', 'CS Student @ UOL', 'React & Next.js'].map((tag) => (
                <span
                  key={tag}
                  className="pill-badge bg-dark-surface/60 dark:bg-dark-surface/60 bg-white/60 border dark:border-white/10 border-black/10 dark:text-dark-muted text-light-muted text-xs"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.35, duration: 0.6 }}
              className="font-inter text-base md:text-lg dark:text-dark-muted text-light-muted max-w-md leading-relaxed"
            >
              Building production-grade digital experiences — from real-time chat systems to full-stack marketplaces. Currently juggling 3 remote internships and a 3.72 GPA.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticBtn>
                <a
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn-terracotta group"
                >
                  View My Work
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </MagneticBtn>
              <MagneticBtn>
                <a
                  href="/resume.pdf"
                  download="Muhammad_Hasaan_Resume.pdf"
                  className="btn-outline group"
                >
                  <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                  Download CV
                </a>
              </MagneticBtn>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.65, duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <span className="font-grotesk text-xs dark:text-dark-muted text-light-muted uppercase tracking-widest">Find me</span>
              <div className="h-px w-8 dark:bg-white/20 bg-black/20" />
              {[
                { href: 'https://github.com/mhasaan06', icon: GithubIcon, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/mhasaan06', icon: LinkedinIcon, label: 'LinkedIn' },
                { href: 'mailto:mhasaan.tech@gmail.com', icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center dark:bg-dark-surface bg-white border dark:border-white/10 border-black/10 dark:text-dark-muted text-light-muted hover:text-terracotta hover:border-terracotta/40 transition-all duration-200"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── Right column: profile image ── */}
          <div className="hidden lg:flex items-center justify-center relative">
            {/* Floating stat cards */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 3.5, duration: 0.7 }}
              className="absolute -top-4 -left-8 z-20"
            >
              <div className="glass-card px-4 py-3 flex items-center gap-3 shadow-xl">
                <div className="w-8 h-8 rounded-lg bg-terracotta/20 flex items-center justify-center">
                  <span className="text-terracotta text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="font-grotesk text-xs dark:text-dark-muted text-light-muted">Active Internships</p>
                  <p className="font-syne text-sm font-semibold dark:text-dark-text text-light-text">Concurrent</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 3.7, duration: 0.7 }}
              className="absolute -bottom-4 -right-4 z-20"
            >
              <div className="glass-card px-4 py-3 flex items-center gap-3 shadow-xl">
                <div className="w-8 h-8 rounded-lg bg-sage/20 flex items-center justify-center">
                  <span className="text-sage text-sm font-bold">3.72</span>
                </div>
                <div>
                  <p className="font-grotesk text-xs dark:text-dark-muted text-light-muted">CGPA / 4.0</p>
                  <p className="font-syne text-sm font-semibold dark:text-dark-text text-light-text">Dean's Level</p>
                </div>
              </div>
            </motion.div>

            {/* Profile photo with ring frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.0, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative"
            >
              {/* Outer spinning dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-6 rounded-full border-2 border-dashed border-terracotta/25"
              />
              {/* Inner spinning ring (opposite dir) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 rounded-full border border-sage/30"
              />

              {/* Sage blob behind */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-sage/15 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-terracotta/15 blur-2xl" />

              {/* Photo */}
              <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-terracotta/40 shadow-2xl shadow-terracotta/20">
                <img
                  src="/my_img1.png"
                  alt="Muhammad Hasaan"
                  className="w-full h-full object-cover object-center"
                />
                {/* Photo overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-terracotta/20 to-transparent" />
              </div>

              {/* Decorative dots grid */}
              <div
                className="absolute -bottom-12 -right-16 w-32 h-32 opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E07A5F 1.5px, transparent 1.5px)',
                  backgroundSize: '12px 12px',
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 0.6 }}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 dark:text-dark-muted text-light-muted hover:text-terracotta transition-colors group"
      >
        <span className="font-grotesk text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
