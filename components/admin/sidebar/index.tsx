'use client';

import { Separator } from '@/components/ui/separator';
import { animate, AnimatePresence, motion, useCycle } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';

import { variants } from './variants';
import { useAuth } from '@/hooks/useAuth';

const Path = (props: any) => (
  <path fill='transparent' strokeWidth='3' stroke='white' strokeLinecap='round' {...props} />
);

function Sidebar({ profile }: any) {
  const { logout } = useAuth();
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
      title: 'Dashboard',
      href: '/admin/dashboard'
    },
    {
      title: 'Usuários',
      href: '/admin/users/list'
    },
    {
      title: 'Filmes',
      href: '/admin/movies/list'
    },
    {
      title: 'Séries',
      href: '/admin/shows/list'
    },
    {
      title: 'Reviews',
      href: '/admin/reviews/list'
    }
  ];

  return (
    <div className='col-span-1 bg-neutral-600 p-5 flex flex-col gap-5 h-full drop-shadow-lg'>
      <div className='btn-container'>
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
            initial={{ width: 20, height: '100%' }}
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
              <div className='col-span-1 flex flex-col gap-5 h-full'>
                <div className='flex flex-col gap-1'>
                  <h2 className='text-xl font-bold'>{profile?.fullName}</h2>
                  <p className='text-sm'>Moviebox Admin</p>
                </div>

                <Separator />

                <div className='flex flex-col gap-6'>
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className='border border-neutral-500
                      rounded-sm p-2 transition-all hover:pl-2 cursor-pointer hover:bg-neutral-700'
                    >
                      <Link passHref={true} prefetch={false} href={item.href}>
                        <h2 className='text-xl font-bold'>{item.title}</h2>
                      </Link>
                    </div>
                  ))}

                  <div
                    onClick={async () => {
                      logout();
                    }}
                    className='border border-neutral-500 rounded-sm p-2
                    transition-all hover:pl-2 cursor-pointer hover:bg-neutral-700'
                  >
                    <h2 className='text-xl font-bold'>Logout</h2>
                  </div>
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
