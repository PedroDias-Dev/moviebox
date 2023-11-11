'use client';

import { Separator } from '@/components/ui/separator';
import { animate, AnimatePresence, motion, useCycle } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';

import { variants } from './variants';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Clapperboard, LogOut, Popcorn, StarHalf, User } from 'lucide-react';

const Path = (props: any) => (
  <path fill='transparent' strokeWidth='3' stroke='white' strokeLinecap='round' {...props} />
);

function Sidebar({ profile, logout }: any) {
  const router = useRouter();
  const [open, cycleOpen] = useCycle(false, true);

  useEffect(() => {
    animate([
      ['path.top', { d: open ? 'M 3 16.5 L 17 2.5' : 'M 2 2.5 L 20 2.5' }, { at: '<' }],
      ['path.middle', { opacity: open ? 0 : 1 }, { at: '<' }],
      ['path.bottom', { d: open ? 'M 3 2.5 L 17 16.346' : 'M 2 16.346 L 20 16.346' }, { at: '<' }]
    ]);
  }, [open]);

  const items = [
    {
      title: 'Filmes',
      icon: <Clapperboard size={24} />,
      href: '/app/movies'
    },
    {
      title: 'Séries',
      icon: <Popcorn size={24} />,
      href: '/app/shows'
    },
    {
      title: 'Suas Avaliações',
      icon: <StarHalf size={24} />,
      href: '/app/reviews'
    },
    {
      title: 'Perfil',
      icon: <User size={24} />,
      href: '/app/profile'
    }
  ];

  return (
    <div className='col-span-1 bg-neutral-600 p-5 flex flex-col gap-5 h-full drop-shadow-lg tablet:!h-[58px] tablet:!p-0 tablet:!gap-0 tablet:!relative tablet:!z-20'>
      <div className='btn-container tablet:!p-5 flex items-center'>
        <button title='a' onClick={cycleOpen as any}>
          <svg width='23' height='18' viewBox='0 0 23 18'>
            <Path
              d='M 2 2.5 L 20 2.5'
              className='top'
              variants={{
                closed: { d: 'M 2 2.5 L 20 2.5' },
                open: { d: 'M 3 16.5 L 17 2.5' }
              }}
            />
            <Path d='M 2 9.423 L 20 9.423' opacity='1' className='middle' />
            <Path
              d='M 2 16.346 L 20 16.346'
              className='bottom'
              variants={{
                closed: { d: 'M 2 16.346 L 20 16.346' },
                open: { d: 'M 3 2.5 L 17 16.346' }
              }}
            />
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.aside
            className='h-full'
            initial={{ width: 20 }}
            animate={{
              width: 300,
              transition: { duration: 0.4 }
            }}
            exit={{
              width: 0,
              transition: { duration: 0.4 }
            }}
          >
            <motion.div
              className='h-full flex flex-col justify-between tablet:!w-screen tablet:h-[calc(100vh-58px)] tablet:!bg-neutral-600 tablet:!p-[15px]'
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1,
                transition: { duration: 0.4 }
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.1 }
              }}
              variants={variants.sideVariants}
            >
              <div className='col-span-1 flex flex-col gap-5'>
                <div className='flex flex-col gap-1'>
                  <h2 className='text-xl font-bold'>
                    {!profile?.full_name ? <Skeleton className='w-[100%] h-[23px] rounded-md' /> : profile?.full_name}
                  </h2>
                  <h3 className='text-sm text-neutral-300'>
                    {!profile?.group ? <Skeleton className='w-[100%] h-[23px] rounded-md' /> : profile?.group}
                  </h3>
                </div>

                <Separator />

                <div className='flex flex-col gap-6'>
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className='border border-neutral-500
                      rounded-md p-2 transition-all hover:pl-2 cursor-pointer hover:bg-neutral-700'
                      onClick={cycleOpen as any}
                    >
                      <Link passHref={true} prefetch={false} href={item.href}>
                        <div className='flex gap-2 items-center'>
                          {item.icon}
                          <h2 className='text-xl font-bold'>{item.title}</h2>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div
                onClick={async () => {
                  logout();
                  router.refresh();
                }}
                className='border border-neutral-500 rounded-md p-2
                    transition-all hover:pl-2 cursor-pointer hover:bg-neutral-700'
              >
                <div className='flex gap-2 items-center'>
                  <LogOut size={24} />
                  <h2 className='text-xl font-bold'>Logout</h2>
                </div>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Sidebar;
