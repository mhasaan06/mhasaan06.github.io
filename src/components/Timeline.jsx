import React from 'react';
import { motion } from 'framer-motion';
import { Building2, ExternalLink, Calendar } from 'lucide-react';

const experiences = [
  {
    company: 'Decode Labs',
    role: 'Full Stack Development Intern',
    type: 'Remote',
    period: 'May 2026 – June 2026',
    color: 'terracotta',
    description:
      'Worked on full-stack projects at a government-registered enterprise. Delivered mentor-led milestones, contributed to production-level features, and collaborated within an agile team environment.',
    skills: ['React.js', 'Node.js', 'PostgreSQL', 'REST APIs', 'Agile'],
  },
  {
    company: 'CodeAlpha',
    role: 'Full Stack Development Intern',
    type: 'Remote',
    period: 'May 2026 – June 2026',
    color: 'sage',
    description:
      'Executed real-world project assignments with mentorship from senior developers. Followed professional development workflows, code review cycles, and deployment best practices.',
    skills: ['Next.js', 'TypeScript', 'Express.js', 'Git', 'CI/CD'],
  },
  {
    company: 'Hex Softwares Pvt. Ltd.',
    role: 'Web Development Intern',
    type: 'Remote / WFH',
    period: 'May 2026 – June 2026',
    color: 'terracotta',
    description:
      'Developed production-oriented web deliverables. Gained deep understanding of industry workflows, client communication, and building scalable, maintainable web applications.',
    skills: ['React.js', 'Tailwind CSS', 'Supabase', 'Firebase', 'Vercel'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Timeline() {
  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      {/* Bg accent */}
      <div className="blob w-96 h-96 bg-terracotta -bottom-20 -left-20 opacity-8" />

      <div className="section-container">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-grotesk text-xs text-terracotta uppercase tracking-widest">02 — Experience</span>
          <div className="flex-1 h-px dark:bg-white/10 bg-black/10" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="section-heading dark:text-dark-text text-light-text">
            Where I've <span className="heading-accent">Worked</span>
          </h2>
          <p className="font-inter dark:text-dark-muted text-light-muted mt-3 max-w-lg">
            Three concurrent remote internships from May–June 2026 — navigating real-world projects, mentorship, and professional workflows simultaneously.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div className="timeline-line hidden lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const accentColor = exp.color === 'terracotta' ? '#E07A5F' : '#81B29A';
              const bgClass = exp.color === 'terracotta' ? 'bg-terracotta/10' : 'bg-sage/10';
              const textClass = exp.color === 'terracotta' ? 'text-terracotta' : 'text-sage';
              const borderClass = exp.color === 'terracotta' ? 'border-terracotta/30' : 'border-sage/30';

              return (
                <motion.div
                  key={exp.company}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  custom={i * 0.15}
                  viewport={{ once: true, margin: '-80px' }}
                  className={`
                    relative lg:grid lg:grid-cols-2 lg:gap-16 items-center
                    ${isLeft ? '' : 'lg:[&>*:first-child]:order-2'}
                    lg:mb-20
                  `}
                >
                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -4, rotateX: 2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`
                      dark:bg-dark-surface bg-white border rounded-2xl p-6 relative
                      ${borderClass} hover:shadow-xl transition-shadow duration-300
                    `}
                    style={{ boxShadow: `0 4px 30px ${accentColor}10` }}
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-7 h-7 rounded-lg ${bgClass} flex items-center justify-center`}>
                            <Building2 size={14} className={textClass} />
                          </div>
                          <h3 className="font-syne font-bold dark:text-dark-text text-light-text text-lg">
                            {exp.company}
                          </h3>
                        </div>
                        <p className={`font-inter text-sm font-medium ${textClass}`}>{exp.role}</p>
                      </div>
                      <span className={`pill-badge ${bgClass} ${textClass} text-xs flex-shrink-0`}>
                        {exp.type}
                      </span>
                    </div>

                    {/* Period */}
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar size={12} className="dark:text-dark-muted text-light-muted" />
                      <span className="font-grotesk text-xs dark:text-dark-muted text-light-muted tracking-wide">
                        {exp.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="font-inter text-sm dark:text-dark-muted text-light-muted leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`pill-badge ${bgClass} ${textClass} text-xs border ${borderClass}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Center dot */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      whileInView={{ scale: [0, 1.3, 1] }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className={`w-4 h-4 rounded-full border-4 dark:border-dark-bg border-light-bg`}
                      style={{ backgroundColor: accentColor }}
                    />
                  </div>

                  {/* Empty column placeholder for opposite side */}
                  <div className="hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
