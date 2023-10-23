'use client';

import { motion } from 'framer-motion';
// eslint-disable-next-line prettier/prettier
import type { ReactNode } from 'react';
import React from 'react';

interface Props {
  children?: ReactNode;
}

const PageTransition = ({ children }: Props) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      type: 'spring',
      stiffness: 260,
      damping: 20,
      opacity: { duration: 0.5 }
    }}
  >
    {children}
  </motion.div>
);
export default PageTransition;
