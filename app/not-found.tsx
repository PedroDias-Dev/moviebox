'use client';

import PageTransition from '@/components/motion/PageTransition';
import Image from 'next/image';

const FourOhFor = () => {
  return (
    <PageTransition>
      <div className='w-full h-screen'>
        <div className='w-[100%] h-[100%] flex items-center justify-center gap-3'>
          <Image src='/assets/film-reel.svg' alt='logo' width={30} height={30} />

          <span>
            Are you lost? The page you are looking for does not exist. <br />
            <a className='text-green-300 text-sm' href='/'>
              Go back home
            </a>
          </span>
        </div>
      </div>
    </PageTransition>
  );
};

export default FourOhFor;
