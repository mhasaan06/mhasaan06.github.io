import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

const socials = [
  {
    label: 'Email',
    value: 'mhasaan.tech@gmail.com',
    href: 'mailto:mhasaan.tech@gmail.com',
    icon: Mail,
    color: 'terracotta',
  },
  {
    label: 'GitHub',
    value: 'github.com/mhasaan06',
    href: 'https://github.com/mhasaan06',
    icon: GithubIcon,
    color: 'sage',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/mhasaan06',
    href: 'https://www.linkedin.com/in/mhasaan06',
    icon: LinkedinIcon,
    color: 'terracotta',
  },
  {
    label: 'Location',
    value: 'Lahore, Pakistan',
    href: null,
    icon: MapPin,
    color: 'sage',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message too short (min 10 chars)';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from('contacts').insert([
        {
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      toast.success('Message sent! I\'ll get back to you soon 🎉', {
        duration: 5000,
        icon: <CheckCircle size={18} className="text-terracotta" />,
      });
      setForm({ name: '', email: '', message: '' });
      setErrors({});
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again or email me directly.', {
        icon: <AlertCircle size={18} className="text-red-400" />,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) => `
    w-full px-4 py-3.5 rounded-xl font-inter text-sm
    dark:bg-dark-bg bg-light-bg
    dark:text-dark-text text-light-text
    border transition-all duration-200 outline-none
    placeholder:dark:text-dark-muted placeholder:text-light-muted
    focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta
    ${errors[field]
      ? 'border-red-400/60 ring-2 ring-red-400/20'
      : 'dark:border-white/10 border-black/10 hover:border-terracotta/30'}
  `;

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="blob w-96 h-96 bg-terracotta bottom-0 right-0 opacity-8" />
      <div className="blob w-64 h-64 bg-sage top-0 left-0 opacity-8" />

      <div className="section-container">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-grotesk text-xs text-terracotta uppercase tracking-widest">06 — Contact</span>
          <div className="flex-1 h-px dark:bg-white/10 bg-black/10" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-start">

          {/* ── Left: heading + socials ── */}
          <div className="flex flex-col gap-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="section-heading dark:text-dark-text text-light-text leading-tight">
                Let's Build<br />
                Something <span className="heading-accent">Great</span>
              </h2>
              <p className="font-inter dark:text-dark-muted text-light-muted mt-4 max-w-sm leading-relaxed">
                I'm open to full-time roles, freelance projects, and interesting collaborations. Drop me a message — I usually respond within 24 hours.
              </p>
            </motion.div>

            {/* Availability status */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={0.1}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 dark:bg-dark-surface bg-white border dark:border-white/10 border-black/10 rounded-2xl px-5 py-4 w-fit"
            >
              <div className="relative">
                <span className="w-2.5 h-2.5 rounded-full bg-sage flex" />
                <span className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-sage animate-ping opacity-60" />
              </div>
              <div>
                <p className="font-syne font-semibold dark:text-dark-text text-light-text text-sm">Available for opportunities</p>
                <p className="font-inter text-xs dark:text-dark-muted text-light-muted">Internships · Freelance · Full-time</p>
              </div>
            </motion.div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              {socials.map(({ label, value, href, icon: Icon, color }, i) => {
                const isTC = color === 'terracotta';
                const bgAccent = isTC ? 'bg-terracotta/10' : 'bg-sage/10';
                const textAccent = isTC ? 'text-terracotta' : 'text-sage';

                const content = (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    custom={0.15 + i * 0.08}
                    viewport={{ once: true }}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="flex items-center gap-4 dark:bg-dark-surface bg-white border dark:border-white/10 border-black/10 rounded-xl px-4 py-3 group"
                  >
                    <div className={`w-9 h-9 rounded-lg ${bgAccent} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={16} className={textAccent} />
                    </div>
                    <div>
                      <p className="font-grotesk text-xs dark:text-dark-muted text-light-muted uppercase tracking-wider">{label}</p>
                      <p className={`font-inter text-sm font-medium ${href ? 'dark:text-dark-text text-light-text group-hover:' + textAccent : 'dark:text-dark-text text-light-text'} transition-colors`}>
                        {value}
                      </p>
                    </div>
                  </motion.div>
                );

                return href ? (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="no-underline">
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}
            </div>
          </div>

          {/* ── Right: contact form ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0.2}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="dark:bg-dark-surface bg-white border dark:border-white/10 border-black/10 rounded-2xl p-8 flex flex-col gap-5"
              style={{ boxShadow: '0 8px 60px rgba(224,122,95,0.07)' }}
            >
              <div>
                <p className="font-syne font-bold dark:text-dark-text text-light-text text-xl mb-1">Send a Message</p>
                <p className="font-inter text-xs dark:text-dark-muted text-light-muted">
                  All fields required — I'll reply promptly ✉️
                </p>
              </div>

              {/* Name */}
              <div>
                <label className="block font-grotesk text-xs dark:text-dark-muted text-light-muted uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={inputClass('name')}
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="font-inter text-xs text-red-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-grotesk text-xs dark:text-dark-muted text-light-muted uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={inputClass('email')}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="font-inter text-xs text-red-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block font-grotesk text-xs dark:text-dark-muted text-light-muted uppercase tracking-wider mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Hi Muhammad, I'd like to discuss a project..."
                  rows={5}
                  className={`${inputClass('message')} resize-none`}
                />
                {errors.message && (
                  <p className="font-inter text-xs text-red-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.97 }}
                className={`
                  w-full flex items-center justify-center gap-2 py-4 rounded-xl
                  font-inter font-semibold text-sm text-white
                  transition-all duration-300 mt-1
                  ${submitting
                    ? 'bg-terracotta/60 cursor-not-allowed'
                    : 'bg-terracotta hover:bg-terracotta-hover hover:shadow-lg hover:shadow-terracotta/30'}
                `}
              >
                {submitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="font-inter text-xs dark:text-dark-muted text-light-muted text-center">
                Or email directly at{' '}
                <a href="mailto:mhasaan.tech@gmail.com" className="text-terracotta hover:underline">
                  mhasaan.tech@gmail.com
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
