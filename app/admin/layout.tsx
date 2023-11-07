'use client';

import PageTransition from '@/components/motion/PageTransition';
import Sidebar from '@/components/admin/sidebar';

import AuthRoute from '@/components/routes/AuthRoute';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<any>(null);

  return (
    <AuthRoute type='admin'>
      <PageTransition>
        <div className='flex h-screen w-screen bg-secondary-900'>
          <Sidebar profile={profile} />

          <div className='overflow-y-auto w-full'>{children}</div>
        </div>
      </PageTransition>
    </AuthRoute>
  );
}
