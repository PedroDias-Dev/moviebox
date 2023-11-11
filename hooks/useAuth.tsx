'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useApi } from './useApi';
import { useLoading } from '@/components/global/loading/loading';

interface AuthContextProps {
  session: any;
  user: any;
  loading: boolean;
  refresh: (newUser: any) => void;
  signIn: (email: any, password: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  loading: true,
  refresh: () => {},
  signIn: () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const router = useRouter();

  const { api } = useApi();
  const { toast } = useToast();
  const { setLoading } = useLoading();

  const [userData, setUserData] = useState<any>(null);
  const [session, setSession] = useState<any>(
    typeof window !== 'undefined' && {
      accessToken: localStorage.getItem('token')
    }
  ) as any;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSession({
        accessToken: localStorage.getItem('token')
      });
    }
  }, []);

  useEffect(() => {
    if (session) {
      getData(false);
    }
  }, []);

  const getData = async (newUser: any) => {
    if (newUser) return setUserData(newUser);
    try {
      api.get('/api/v1/profile').then((res: any) => {
        console.log(res);
        setUserData(res.data);
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Atenção!',
        description: 'Houve um erro ao processar suas informações. Por favor, tente novamente mais tarde.'
      });

      // logout();
    }
  };

  const signIn = async (accessToken: any) => {
    setLoading(true);

    if (accessToken) {
      localStorage.setItem('token', accessToken);
      setSession({
        valid: true,
        accessToken
      });
      router.push('/app/movies');
      window.location.reload();
    }
  };

  const logout = async () => {
    setUserData(null);
    setSession(null);
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  const contextValue = {
    session,
    user: userData,
    loading: false,
    refresh: (newUser: any) => getData(newUser),
    signIn,
    logout
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
