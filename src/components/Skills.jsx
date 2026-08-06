import React from 'react';
import { motion } from 'framer-motion';

const skillGroups = [
  {
    category: 'Languages',
    color: 'terracotta',
    icon: '{ }',
    skills: ['Java', 'JavaScript', 'TypeScript', 'Python', 'C++', 'C', 'SQL'],
  },
  {
    category: 'Frameworks & Libraries',
    color: 'sage',
    icon: '⚛',
    skills: [
      'React.js', 'Next.js', 'Node.js', 'Express.js', 'Spring Boot',
      'Tailwind CSS', 'Bootstrap', 'Material UI', 'ShadCN', 'Framer Motion',
    ],
  },
  {
    category: 'Databases',
    color: 'terracotta',
    icon: '⬡',
    skills: ['PostgreSQL', 'MySQL', 'Supabase', 'Firebase', 'Redis', 'H2'],
  },
  {
    category: 'Tools & Platforms',
    color: 'sage',
    icon: '⚙',
    skills: ['Git', 'GitHub', 'Docker', 'Vercel', 'Netlify', 'Figma', 'Postman', 'Agile/Scrum'],
  },
  {
    category: 'Concepts & Other',
    color: 'terracotta',
    icon: '◈',
    skills: ['REST APIs', 'WebSockets', 'Prisma ORM', 'BullMQ', 'JWT Auth', 'Spring Security', 'CI/CD'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Skills() {

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      <div className="blob w-96 h-96 bg-terracotta bottom-0 left-0 opacity-8" />

      <div className="section-container">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-grotesk text-xs text-terracotta uppercase tracking-widest">04 — Skills</span>
          <div className="flex-1 h-px dark:bg-white/10 bg-black/10" />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <h2 className="section-heading dark:text-dark-text text-light-text">
            My <span className="heading-accent">Toolkit</span>
          </h2>
          <p className="font-inter dark:text-dark-muted text-light-muted mt-3 max-w-lg">
            A broad and growing stack — from systems programming to modern web frameworks and cloud tooling.
          </p>
        </motion.div>

        {/* Skill groups */}
        <div className="space-y-10">
          {skillGroups.map((group, gi) => {
            const isTC = group.color === 'terracotta';
            const bgAccent = isTC ? 'bg-terracotta/10' : 'bg-sage/10';
            const textAccent = isTC ? 'text-terracotta' : 'text-sage';
            const borderAccent = isTC ? 'border-terracotta/20' : 'border-sage/20';

            return (
              <motion.div
                key={group.category}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={gi * 0.1}
                viewport={{ once: true, margin: '-60px' }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-lg ${bgAccent} flex items-center justify-center font-mono text-sm ${textAccent} font-bold`}>
                    {group.icon}
                  </div>
                  <h3 className="font-syne font-semibold dark:text-dark-text text-light-text text-lg">
                    {group.category}
                  </h3>
                  <div className="flex-1 h-px dark:bg-white/5 bg-black/5" />
                </div>

                {/* Skill chips — staggered layout */}
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill, si) => (
                    <motion.div
                      key={skill}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      custom={gi * 0.05 + si * 0.04}
                      viewport={{ once: true }}
                      whileHover={{ y: -4, scale: 1.04 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      <span className={`skill-chip border ${borderAccent} ${bgAccent} ${textAccent}`}>
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: isTC ? '#E07A5F' : '#81B29A' }}
                        />
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom proficiency note */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 dark:bg-dark-surface bg-white border dark:border-white/10 border-black/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="flex -space-x-2">
            {['TS', 'RJ', 'PG', 'NJ'].map((abbr, i) => (
              <div
                key={abbr}
                className="w-9 h-9 rounded-full flex items-center justify-center font-grotesk text-xs font-bold text-white border-2 dark:border-dark-surface border-white"
                style={{ backgroundColor: i % 2 === 0 ? '#E07A5F' : '#81B29A', zIndex: 4 - i }}
              >
                {abbr}
              </div>
            ))}
          </div>
          <div className="text-center sm:text-left">
            <p className="font-syne font-semibold dark:text-dark-text text-light-text text-sm">
              Always learning, always shipping
            </p>
            <p className="font-inter text-xs dark:text-dark-muted text-light-muted mt-0.5">
              TypeScript · React · PostgreSQL · Node.js are my primary production stack
            </p>
          </div>
          <div className="sm:ml-auto">
            <span className="pill-badge bg-terracotta/10 text-terracotta border border-terracotta/20 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
              Actively improving
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
