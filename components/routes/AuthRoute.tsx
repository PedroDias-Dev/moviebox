'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  React.useEffect(() => {
    console.log('AuthRoute', user);
    const userData = user?.data;

    if (!userData && type !== 'no-auth') {
      router.push(ROUTES.noAuth);
      setLoading(false);
      return;
    }

    if (userData) {
      const isAdmin = ['group_owner', 'admin'].includes(userData?.profile_type);
      if (type === 'admin' && !isAdmin) {
        router.push(ROUTES.common);
        setLoading(false);
        return;
      }

      if (type === 'admin' && isAdmin) return setLoading(false);

      router.push(ROUTES.common);
    }

    setLoading(false);
  }, [user]);

  return <>{!loading && children}</>;
}

export default AuthRoute;
