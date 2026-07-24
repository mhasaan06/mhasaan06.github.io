import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark-bg"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        {/* Background blobs */}
        <div className="blob w-96 h-96 bg-terracotta top-1/4 -left-20 animate-float-slow" />
        <div className="blob w-72 h-72 bg-sage bottom-1/4 -right-10 animate-float-medium" />

        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Animated monogram */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-2xl bg-dark-surface border border-white/10 flex items-center justify-center">
              <span className="font-syne font-bold text-4xl text-gradient-duo">MH</span>
            </div>
            {/* Spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2 rounded-2xl border-2 border-dashed border-terracotta/40"
            />
          </motion.div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <p className="font-grotesk text-dark-muted text-sm tracking-widest uppercase">
              Portfolio Loading
            </p>
            {/* Progress bar */}
            <div className="mt-4 w-48 h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-terracotta to-sage rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
