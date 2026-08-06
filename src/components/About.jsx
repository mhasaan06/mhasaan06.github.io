import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Zap } from 'lucide-react';

const techStack = [
  'React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js',
  'PostgreSQL', 'Supabase', 'Redis', 'Socket.io', 'Prisma ORM',
  'Spring Boot', 'Docker', 'Figma', 'Tailwind CSS', 'Framer Motion',
  'BullMQ', 'JWT Auth', 'REST APIs', 'WebSockets', 'Git & GitHub',
];

const InfiniteMarquee = ({ items, direction = 1 }) => {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex gap-4"
        animate={{ x: direction > 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full dark:bg-dark-surface bg-white border dark:border-white/10 border-black/10 font-grotesk text-sm dark:text-dark-muted text-light-muted whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle bg accent */}
      <div className="blob w-72 h-72 bg-sage top-0 right-0 opacity-10" />

      <div className="section-container">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-grotesk text-xs text-terracotta uppercase tracking-widest">01 — About</span>
          <div className="flex-1 h-px dark:bg-white/10 bg-black/10" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">

          {/* Left: photo + stats */}
          <div className="relative">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Image frame — p-0 so image sits flush against border */}
              <div className="relative aspect-[4/5] max-w-sm rounded-2xl overflow-hidden border-4 border-terracotta/20">
                <picture>
                  <source srcSet="/my_img1.webp" type="image/webp" />
                  <img
                    src="/my_img1.png"
                    alt="Muhammad Hasaan"
                    loading="lazy"
                    width={384}
                    height={480}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent" />
              </div>

              {/* Decorative offset border — pushed further so they don't touch stats */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-terracotta/25 rounded-2xl max-w-sm -z-10" />
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-sage/20 rounded-2xl max-w-sm -z-10" />
            </motion.div>

          </div>

          {/* Right: bio text */}
          <div className="flex flex-col gap-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="section-heading dark:text-dark-text text-light-text mb-2">
                Who I <span className="heading-accent">Am</span>
              </h2>
              <p className="font-grotesk text-sm text-terracotta uppercase tracking-widest">
                Full-Stack Developer &amp; CS Student
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={0.1}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="font-inter dark:text-dark-muted text-light-muted leading-relaxed">
                I'm <span className="dark:text-dark-text text-light-text font-semibold">Muhammad Hasaan</span>, a second-year Computer Science student at the University of Lahore, Pakistan, maintaining a CGPA of 3.72/4.00 while simultaneously interning at three companies.
              </p>
              <p className="font-inter dark:text-dark-muted text-light-muted leading-relaxed">
                I specialize in building <span className="text-terracotta font-medium">production-grade full-stack applications</span> — real-time systems, REST APIs, and complex dashboards. My current stack centers around <span className="text-sage font-medium">Next.js, TypeScript, Node.js, and PostgreSQL</span>, with deep experience in WebSockets, BullMQ queues, and Supabase.
              </p>
              <p className="font-inter dark:text-dark-muted text-light-muted leading-relaxed">
                Beyond code, I'm passionate about clean UI/UX, system design, and building things that actually ship to real users — not just toy projects.
              </p>
            </motion.div>

            {/* Education card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={0.2}
              viewport={{ once: true }}
              className="dark:bg-dark-surface bg-white border dark:border-white/10 border-black/10 rounded-2xl p-5 flex gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <GraduationCap size={20} className="text-terracotta" />
              </div>
              <div>
                <p className="font-syne font-bold dark:text-dark-text text-light-text">
                  The University of Lahore
                </p>
                <p className="font-inter text-sm dark:text-dark-muted text-light-muted mt-0.5">
                  BS Computer Science &mdash; CGPA: 3.72 / 4.00
                </p>
                <p className="font-grotesk text-xs text-terracotta mt-1.5 tracking-wide">
                  Feb 2024 – Feb 2028 (Expected) · Lahore, Pakistan
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Stats row — full width, 4 cols desktop, 2 cols tablet, 1 col mobile ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { icon: GraduationCap, label: 'CGPA', value: '3.72 / 4.0', color: 'text-terracotta', bg: 'bg-terracotta/10' },
            { icon: Code2,         label: 'Projects',     value: '10+ Built',     color: 'text-sage',      bg: 'bg-sage/10'      },
            { icon: Zap,           label: 'Internships',  value: '3 Concurrent',  color: 'text-terracotta', bg: 'bg-terracotta/10' },
            { icon: GraduationCap, label: 'CS Batch',     value: '2024 – 2028',   color: 'text-sage',      bg: 'bg-sage/10'      },
          ].map(({ icon: Icon, label, value, color, bg }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i * 0.08}
              viewport={{ once: true }}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="dark:bg-dark-surface bg-white border dark:border-white/10 border-black/10 rounded-xl p-4 flex items-center gap-3"
            >
              <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon size={16} className={color} />
              </div>
              <div className="min-w-0">
                <p className="font-grotesk text-[10px] uppercase tracking-wider dark:text-dark-muted text-light-muted leading-none mb-0.5">{label}</p>
                <p className="font-syne text-sm font-bold dark:text-dark-text text-light-text leading-tight truncate">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack marquee */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20"
        >
          <p className="font-grotesk text-xs dark:text-dark-muted text-light-muted uppercase tracking-widest text-center mb-6">
            Technologies I work with
          </p>
          <div className="space-y-3">
            <InfiniteMarquee items={techStack} direction={1} />
            <InfiniteMarquee items={[...techStack].reverse()} direction={-1} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
