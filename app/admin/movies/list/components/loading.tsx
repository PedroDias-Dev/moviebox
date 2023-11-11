'use client';

import Transition from '@/components/motion/Transition';
import { Skeleton } from '@/components/ui/skeleton';

const MoviesLoading = () => {
  return (
    <Transition duration={0.3}>
      <div className='col-span-1 p-5 flex flex-col gap-3'>
        <Skeleton className='w-[100%] h-[53px] rounded-sm' />
        <Skeleton className='w-[100%] h-[53px] rounded-sm' />
        <Skeleton className='w-[100%] h-[53px] rounded-sm' />
        <Skeleton className='w-[100%] h-[53px] rounded-sm' />
      </div>
    </Transition>
  );
};

export default MoviesLoading;
