'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { AnimatePresence } from 'framer-motion';

const PreLoad = ({ wait, children }: any) => {
  return !wait ? (
    <AnimatePresence>
      <Skeleton className='w-[100%] h-[62px] rounded-md' />
    </AnimatePresence>
  ) : (
    <AnimatePresence>{children}</AnimatePresence>
  );
};

export default PreLoad;
