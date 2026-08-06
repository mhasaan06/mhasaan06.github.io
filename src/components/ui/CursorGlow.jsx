import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
   Detects touch-primary devices via pointer:coarse media query.
   Returns true on touch screens to disable ambient glow.
───────────────────────────────────────────────────────────── */
function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

/* ─────────────────────────────────────────────────────────────
   Selector for interactive elements that trigger glow expansion
   and color shift to sage accent.
───────────────────────────────────────────────────────────── */
const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, ' +
  '.bento-card, .skill-chip, .pill-badge, [data-cursor-hover]';

export default function CursorGlow({ darkMode = true }) {
  const [isTouch, setIsTouch] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  /* Target mouse coordinates */
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  /* Spring physics for ambient lag/smoothing */
  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    /* Touch device check — disable glow on mobile/tablet */
    if (isTouchDevice()) {
      setIsTouch(true);
      return;
    }

    const mediaQuery = window.matchMedia('(pointer: coarse)');
    const handleMediaChange = (e) => setIsTouch(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    }

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onMouseOver = (e) => {
      if (e.target.closest && e.target.closest(HOVER_SELECTOR)) {
        setHovered(true);
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest && e.target.closest(HOVER_SELECTOR)) {
        if (e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(HOVER_SELECTOR)) {
          return;
        }
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      }
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [mouseX, mouseY, visible]);

  if (isTouch) return null;

  /* Glow properties */
  const SIZE = 140; // ~120-150px diameter

  /* Color: Terracotta default (#E07A5F), Sage on hover (#81B29A) */
  const glowColor = hovered
    ? 'rgba(129, 178, 154, 0.9)' // Sage
    : 'rgba(224, 122, 95, 0.9)'; // Terracotta

  /* Opacity: light mode needs less intensity (~10-12%) so background isn't washed out,
     dark mode uses ~18-20% opacity for visible ambient glow */
  const opacity = darkMode
    ? (hovered ? 0.22 : 0.18)
    : (hovered ? 0.14 : 0.10);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        borderRadius: '50%',
        backgroundColor: glowColor,
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'transform',
        x: glowX,
        y: glowY,
        translateX: '-50%',
        translateY: '-50%',
        scale: hovered ? 1.3 : 1,
        opacity: visible ? opacity : 0,
        transition:
          'scale 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, opacity 0.3s ease',
      }}
    />
  );
}
