'use client';

import PageTransition from '@/components/motion/PageTransition';
import Sidebar from '@/components/admin/sidebar';

import AuthRoute from '@/components/routes/AuthRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/libs/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user] = useAuthState(auth) as any;
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (user?.uid) {
      const q = query(collection(firestore, 'users'), where('uid', '==', user.uid));
      getDocs(q).then(querySnapshot => {
        setProfile(querySnapshot?.docs[0]?.data());
      });
    }
  }, [user]);

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
