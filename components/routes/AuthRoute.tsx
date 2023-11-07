'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface AuthRouteProps {
  type: 'admin' | 'common' | 'no-auth';
  children: React.ReactNode;
}

let ROUTES = {
  admin: '/admin/dashboard',
  common: '/app/dashboard',
  noAuth: '/auth/login'
};

function AuthRoute({ type, children }: AuthRouteProps) {
  const { user, session } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!session && type !== 'no-auth') {
      router.push(ROUTES.noAuth);
      setLoading(false);
      return;
    }

    if (session && user) {
      const isAdmin = ['admin'].includes(user?.profile_type);
      if (type === 'admin' && !isAdmin) {
        router.push(ROUTES.common);
        setLoading(false);
        return;
      }

      if (type === 'admin' && isAdmin) return setLoading(false);

      if (type === 'common') return setLoading(false);

      // router.push(ROUTES.common);
    }

    setLoading(false);
  }, [session]);

  return <>{!loading && children}</>;
}

export default AuthRoute;
