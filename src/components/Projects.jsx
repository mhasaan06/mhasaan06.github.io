import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './ui/BrandIcons';

const projects = [
  {
    id: 1,
    title: 'Skill Exchange App',
    subtitle: 'Production-grade barter marketplace',
    description:
      'Full-stack skill-swap platform with 13 pages: public landing, user dashboard, real-time swap workspace, and admin panel. Real-time chat via Socket.io, BullMQ + Redis pipeline for automated reminders and swap expiry, Prisma ORM over PostgreSQL.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'Socket.io', 'BullMQ'],
    liveUrl: 'https://skill-swap-six-phi.vercel.app/',
    githubUrl: 'https://github.com/mhasaan06',
    featured: true,
    color: 'terracotta',
    tag: 'Featured',
    size: 'large',
  },
  {
    id: 2,
    title: 'Store Management App',
    subtitle: 'BinHayat Dollar Store',
    description:
      'Full-stack retail management app with real-time inventory & sales tracking. Supabase Auth, live sync, deployed on Vercel.',
    tech: ['React.js', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
    liveUrl: 'https://binhayat-dollarstore.vercel.app/',
    githubUrl: 'https://github.com/mhasaan06',
    featured: false,
    color: 'sage',
    tag: 'Live',
    size: 'small',
  },
  {
    id: 3,
    title: 'Study Planner',
    subtitle: 'Zero-dependency productivity tool',
    description:
      'Zero-framework, zero-backend study planner with persistent LocalStorage. Clean UI, session management, progress tracking.',
    tech: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    liveUrl: 'https://study-planner-nine-woad.vercel.app/',
    githubUrl: 'https://github.com/mhasaan06',
    featured: false,
    color: 'terracotta',
    tag: 'Live',
    size: 'small',
  },
];

const filters = ['All', 'Full-Stack', 'Frontend', 'Real-time'];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ProjectCard({ project, index }) {
  const isFeatured = project.size === 'large';
  const accentColor = project.color === 'terracotta' ? '#E07A5F' : '#81B29A';
  const bgAccent = project.color === 'terracotta' ? 'bg-terracotta/10' : 'bg-sage/10';
  const textAccent = project.color === 'terracotta' ? 'text-terracotta' : 'text-sage';
  const borderAccent = project.color === 'terracotta' ? 'border-terracotta/20' : 'border-sage/20';

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      custom={index * 0.1}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`
        bento-card group relative
        ${isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''}
      `}
      style={{ boxShadow: `0 4px 40px ${accentColor}0D` }}
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        style={{ background: `radial-gradient(circle at 30% 40%, ${accentColor}10, transparent 70%)` }}
      />

      <div className={`relative z-10 h-full flex flex-col ${isFeatured ? 'p-8 md:p-10' : 'p-6'}`}>
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className={`pill-badge ${bgAccent} ${textAccent} border ${borderAccent} text-xs`}>
              {project.tag}
            </span>
            {isFeatured && (
              <span className="pill-badge bg-white/5 border border-white/10 text-dark-muted text-xs">
                Production
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 rounded-full dark:bg-dark-bg/80 bg-light-bg/80 flex items-center justify-center dark:text-dark-muted text-light-muted hover:text-terracotta transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={14} />
            </motion.a>
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-white"
              aria-label="Live Demo"
            >
              <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-syne font-bold dark:text-dark-text text-light-text mb-1 ${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {project.title}
        </h3>
        <p className={`font-grotesk ${textAccent} text-xs uppercase tracking-wider mb-4`}>
          {project.subtitle}
        </p>

        {/* Description */}
        <p className={`font-inter dark:text-dark-muted text-light-muted leading-relaxed flex-1 ${isFeatured ? 'text-base' : 'text-sm'}`}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="pill-badge dark:bg-dark-bg/60 bg-light-bg/60 border dark:border-white/10 border-black/10 dark:text-dark-muted text-light-muted text-xs"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-inter font-semibold transition-all duration-300
              ${project.color === 'terracotta' ? 'bg-terracotta text-white hover:bg-terracotta-hover' : 'bg-sage text-white hover:bg-sage-hover'}
            `}
          >
            <ExternalLink size={12} />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-inter font-semibold border dark:border-white/10 border-black/10 dark:text-dark-muted text-light-muted hover:border-terracotta/40 hover:text-terracotta transition-all duration-300"
          >
            <GithubIcon size={12} />
            View Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="blob w-80 h-80 bg-sage top-1/2 right-0 opacity-8" />

      <div className="section-container">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-grotesk text-xs text-terracotta uppercase tracking-widest">03 — Projects</span>
          <div className="flex-1 h-px dark:bg-white/10 bg-black/10" />
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="section-heading dark:text-dark-text text-light-text">
              Things I've <span className="heading-accent">Built</span>
            </h2>
            <p className="font-inter dark:text-dark-muted text-light-muted mt-3 max-w-md">
              From production marketplaces to lightweight tools — each project ships real value.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0.1}
            viewport={{ once: true }}
            className="flex gap-2 flex-wrap"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full font-grotesk text-xs font-medium transition-all duration-200 border
                  ${activeFilter === f
                    ? 'bg-terracotta text-white border-terracotta'
                    : 'dark:bg-dark-surface bg-white border dark:border-white/10 border-black/10 dark:text-dark-muted text-light-muted hover:border-terracotta/40 hover:text-terracotta'
                  }
                `}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 auto-rows-auto">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
