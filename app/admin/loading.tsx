'use client';

import PageTransition from '@/components/motion/PageTransition';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <PageTransition>
      <div className='w-full h-screen'>
        <div className='w-[100%] h-[100%] flex items-center justify-center'>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
            <Image src='/assets/icon.svg' alt='logo' width={30} height={30} />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Loading;
