import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, Building } from 'lucide-react';

const certifications = [
  {
    id: 1,
    title: 'HTML, CSS, and Javascript for Web Developers',
    issuer: 'Johns Hopkins University',
    platform: 'Coursera',
    date: 'August 2025',
    color: 'terracotta',
    verifyUrl: 'https://www.coursera.org',
    image: '/cert1.jpg',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
  },
  {
    id: 2,
    title: 'Introduction to Python Programming',
    issuer: 'University of Pennsylvania',
    platform: 'Coursera',
    date: 'December 2025',
    color: 'sage',
    verifyUrl: 'https://www.coursera.org',
    image: '/cert2.jpg',
    skills: ['Python', 'Data Structures', 'Algorithms', 'OOP'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 md:py-32 relative overflow-hidden">
      <div className="blob w-80 h-80 bg-sage top-0 right-0 opacity-8" />

      <div className="section-container">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-grotesk text-xs text-terracotta uppercase tracking-widest">05 — Certifications</span>
          <div className="flex-1 h-px dark:bg-white/10 bg-black/10" />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <h2 className="section-heading dark:text-dark-text text-light-text">
            Verified <span className="heading-accent">Credentials</span>
          </h2>
          <p className="font-inter dark:text-dark-muted text-light-muted mt-3 max-w-lg">
            Continuous learning through top-tier university courses on global platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {certifications.map((cert, i) => {
            const isTC = cert.color === 'terracotta';
            const accentColor = isTC ? '#E07A5F' : '#81B29A';
            const bgAccent = isTC ? 'bg-terracotta/10' : 'bg-sage/10';
            const textAccent = isTC ? 'text-terracotta' : 'text-sage';
            const borderAccent = isTC ? 'border-terracotta/25' : 'border-sage/25';

            return (
              <motion.div
                key={cert.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={i * 0.15}
                viewport={{ once: true }}
                whileHover={{ y: -6, rotateX: 2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`relative rounded-2xl border overflow-hidden group cursor-default dark:bg-dark-surface bg-white ${borderAccent}`}
                style={{ boxShadow: `0 4px 40px ${accentColor}12` }}
              >
                {/* Top gradient band */}
                <div
                  className="h-2 w-full"
                  style={{ background: `linear-gradient(90deg, ${accentColor}, ${isTC ? '#81B29A' : '#E07A5F'})` }}
                />

                {/* Certificate image preview */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t dark:from-dark-surface from-white via-transparent to-transparent" />

                  {/* Platform badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`pill-badge ${bgAccent} ${textAccent} border ${borderAccent} text-xs backdrop-blur-sm`}>
                      {cert.platform}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Award icon + title */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-xl ${bgAccent} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Award size={16} className={textAccent} />
                    </div>
                    <h3 className="font-syne font-bold dark:text-dark-text text-light-text text-base leading-snug">
                      {cert.title}
                    </h3>
                  </div>

                  {/* Issuer */}
                  <div className="flex items-center gap-2 mb-2">
                    <Building size={12} className="dark:text-dark-muted text-light-muted" />
                    <p className="font-inter text-sm dark:text-dark-muted text-light-muted">
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 mb-5">
                    <Calendar size={12} className="dark:text-dark-muted text-light-muted" />
                    <p className="font-grotesk text-xs dark:text-dark-muted text-light-muted tracking-wide">
                      {cert.date}
                    </p>
                  </div>

                  {/* Skill badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`pill-badge ${bgAccent} ${textAccent} text-[10px] border ${borderAccent}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Verify button */}
                  <motion.a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                      font-inter text-sm font-semibold transition-all duration-300
                      border ${borderAccent} ${textAccent}
                      hover:${bgAccent}
                    `}
                    style={{
                      background: `${accentColor}10`,
                    }}
                  >
                    <ExternalLink size={13} />
                    Verify Certificate
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-inter text-xs dark:text-dark-muted text-light-muted mt-8 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sage" />
          More certifications in progress — continuous learning is a core value.
        </motion.p>
      </div>
    </section>
  );
}
