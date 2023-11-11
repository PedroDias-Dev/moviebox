'use client';

import PageTransition from '@/components/motion/PageTransition';
import Sidebar from '@/components/admin/sidebar';

import AuthRoute from '@/components/routes/AuthRoute';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <AuthRoute type='admin'>
      <PageTransition>
        <div className='flex h-screen w-screen bg-secondary-900'>
          <Sidebar profile={user} />

          <div className='overflow-y-auto w-full'>{children}</div>
        </div>
      </PageTransition>
    </AuthRoute>
  );
}
