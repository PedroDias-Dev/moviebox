'use client';

import Transition from '@/components/motion/Transition';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className='col-span-1 flex flex-col'>
      <div className='p-5'>
        <Skeleton className='w-[300px] h-[40px] rounded-md' />
      </div>

      <div className='w-full h-[calc(100vh-80px)] rounded-t-lg bg-primary-800 p-5'>
        <Transition duration={0.3}>
          <div className='col-span-1 p-5 flex flex-col gap-3'>
            <Skeleton className='w-[100%] h-[53px] rounded-md' />
            <Skeleton className='w-[100%] h-[53px] rounded-md' />
            <Skeleton className='w-[100%] h-[53px] rounded-md' />
            <Skeleton className='w-[100%] h-[53px] rounded-md' />
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default Loading;
