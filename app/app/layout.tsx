'use client';

import PageTransition from '@/components/motion/PageTransition';

import AuthRoute from '@/components/routes/AuthRoute';
import Sidebar from '@/components/common/sidebar';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <AuthRoute type='common'>
      <PageTransition>
        <div className='flex h-screen w-screen bg-secondary-900'>
          <Sidebar profile={user?.data} />

          <div className='overflow-y-auto w-full'>{children}</div>
        </div>
      </PageTransition>
    </AuthRoute>
  );
}
