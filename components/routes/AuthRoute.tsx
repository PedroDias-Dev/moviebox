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
  common: '/app/movies',
  noAuth: '/auth/login'
};

function AuthRoute({ type, children }: AuthRouteProps) {
  const { user, session } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log(session, user);
    if (!session && type !== 'no-auth') {
      console.log('invalid user');
      router.push(ROUTES.noAuth);
      setLoading(false);
      return;
    }

    if (session?.accessToken && user) {
      const isAdmin = user?.role === 'ADMIN';

      if (type === 'no-auth') {
        router.push(isAdmin ? ROUTES.admin : ROUTES.common);
        setLoading(false);
        return;
      }

      if (type === 'admin' && !isAdmin) {
        router.push(ROUTES.common);
        setLoading(false);
        return;
      }

      if (type === 'common' && isAdmin) {
        router.push(ROUTES.admin);
        setLoading(false);
        return;
      }

      if (type === 'admin' && isAdmin) return setLoading(false);

      if (type === 'common') return setLoading(false);
    }

    setLoading(false);
  }, [session]);

  return <>{!loading && children}</>;
}

export default AuthRoute;
