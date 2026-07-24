import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
   Detects touch-primary devices via pointer:coarse media query.
   Returns true → hide custom cursor and use default.
───────────────────────────────────────────────────────────── */
function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

/* ─────────────────────────────────────────────────────────────
   Clickable selector — anything that should trigger "hover" mode
───────────────────────────────────────────────────────────── */
const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, ' +
  '.bento-card, .skill-chip, .pill-badge, [data-cursor-hover]';

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  /* Raw mouse position — dot follows this instantly */
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  /* Spring-lagged position — ring trails behind */
  const springConfig = { stiffness: 180, damping: 22, mass: 0.6 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  /* Scale spring for smooth hover transition */
  const ringScale = useSpring(1, { stiffness: 250, damping: 20 });
  const dotOpacity = useSpring(1, { stiffness: 250, damping: 20 });

  useEffect(() => {
    /* Touch device check — bail out early, keep default cursor */
    if (isTouchDevice()) {
      setIsTouch(true);
      return;
    }

    /* Show cursor once mouse enters window */
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    /* Hover detection: delegate via document-level listeners */
    const onMouseOver = (e) => {
      if (e.target.closest(HOVER_SELECTOR)) {
        setHovered(true);
        ringScale.set(1.8);
        dotOpacity.set(0);
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest(HOVER_SELECTOR)) {
        setHovered(false);
        ringScale.set(1);
        dotOpacity.set(1);
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [mouseX, mouseY, ringScale, dotOpacity]);

  /* Don't render anything on touch devices */
  if (isTouch) return null;

  const DOT_SIZE = 8;    // px
  const RING_SIZE = 36;  // px

  return (
    <>
      {/* ── Dot — follows mouse instantly ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: '50%',
          backgroundColor: '#E07A5F',   /* terracotta */
          pointerEvents: 'none',
          zIndex: 99999,
          /* Center the dot on the cursor hotspot */
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: dotOpacity,
          /* Dot fades when cursor leaves window */
          scale: visible ? 1 : 0,
        }}
        transition={{ scale: { duration: 0.15 } }}
      />

      {/* ── Ring — trails with spring physics ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: RING_SIZE,
          height: RING_SIZE,
          borderRadius: '50%',
          border: '1.5px solid #81B29A',  /* sage */
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scale: ringScale,
          opacity: visible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.15 } }}
      />
    </>
  );
}
