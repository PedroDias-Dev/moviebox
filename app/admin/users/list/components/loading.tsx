'use client';

import Transition from '@/components/motion/Transition';
import { Skeleton } from '@/components/ui/skeleton';

const UsersLoading = () => {
  return (
    <Transition duration={0.3}>
      <div className='col-span-1 p-5 flex flex-col gap-3'>
        <Skeleton className='w-[100%] h-[53px] rounded-md' />
        <Skeleton className='w-[100%] h-[53px] rounded-md' />
        <Skeleton className='w-[100%] h-[53px] rounded-md' />
        <Skeleton className='w-[100%] h-[53px] rounded-md' />
      </div>
    </Transition>
  );
};

export default UsersLoading;
