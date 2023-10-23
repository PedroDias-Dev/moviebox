'use client';

import { AnimatePresence, motion } from 'framer-motion';

const Transition = ({ children, duration }: any) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        opacity: { duration: duration || 0.5 }
      }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default Transition;
