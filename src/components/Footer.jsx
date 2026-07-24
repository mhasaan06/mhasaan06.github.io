import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { href: 'https://github.com/mhasaan06', icon: GithubIcon, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/mhasaan06', icon: LinkedinIcon, label: 'LinkedIn' },
  { href: 'mailto:mhasaan.tech@gmail.com', icon: Mail, label: 'Email' },
];

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t dark:border-white/10 border-black/10 overflow-hidden">
      {/* Subtle gradient top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terracotta/40 to-transparent" />
      <div className="blob w-64 h-64 bg-terracotta -bottom-20 -left-20 opacity-5" />
      <div className="blob w-48 h-48 bg-sage -bottom-10 -right-10 opacity-5" />

      <div className="section-container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12 md:gap-8 mb-12">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={scrollToTop}
              className="flex items-center gap-3 w-fit group"
            >
              <div className="w-10 h-10 rounded-xl bg-terracotta flex items-center justify-center">
                <span className="font-syne font-bold text-white text-sm">MH</span>
              </div>
              <span className="font-syne font-bold text-lg dark:text-dark-text text-light-text group-hover:text-terracotta transition-colors">
                Muhammad Hasaan
              </span>
            </motion.button>

            <p className="font-inter text-sm dark:text-dark-muted text-light-muted leading-relaxed max-w-xs">
              Full-Stack Developer & CS Student at University of Lahore. Building production-grade digital experiences.
            </p>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              <span className="font-grotesk text-xs text-sage">Available for opportunities</span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center dark:bg-dark-surface bg-white border dark:border-white/10 border-black/10 dark:text-dark-muted text-light-muted hover:text-terracotta hover:border-terracotta/40 transition-all duration-200"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-grotesk text-xs dark:text-dark-muted text-light-muted uppercase tracking-widest mb-5">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="font-inter text-sm dark:text-dark-muted text-light-muted hover:text-terracotta transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-terracotta transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-grotesk text-xs dark:text-dark-muted text-light-muted uppercase tracking-widest mb-5">
              More
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.slice(3).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="font-inter text-sm dark:text-dark-muted text-light-muted hover:text-terracotta transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-terracotta transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  download="Muhammad_Hasaan_Resume.pdf"
                  className="font-inter text-sm dark:text-dark-muted text-light-muted hover:text-terracotta transition-colors duration-200 flex items-center gap-1.5 group"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-terracotta transition-all duration-200" />
                  Resume
                  <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t dark:border-white/10 border-black/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs dark:text-dark-muted text-light-muted flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
            © {new Date().getFullYear()} Muhammad Hasaan. Built with
            <Heart size={11} className="text-terracotta fill-terracotta" />
            using React, Vite & Framer Motion.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-full flex items-center justify-center dark:bg-dark-surface bg-white border dark:border-white/10 border-black/10 dark:text-dark-muted text-light-muted hover:border-terracotta/40 hover:text-terracotta transition-all duration-200"
            aria-label="Scroll to top"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
