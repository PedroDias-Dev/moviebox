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
  const [session, setSession] = useState<any>(typeof window !== 'undefined' && localStorage.getItem('token')) as any;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSession(localStorage.getItem('token'));
    }
  }, []);

  useEffect(() => {
    getData(false);
  }, [session]);

  const getData = async (newUser: any) => {
    if (session?.valid) {
      if (newUser) return setUserData(newUser);
      try {
        // setUserData({
        //   ...users,
        //   user_group_id: user_group?.id,
        //   group: groups[0]?.groups?.name,
        //   championships: groups.map((group: any) => group.championships)
        // });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Atenção!',
          description: 'Houve um erro ao processar suas informações. Por favor, tente novamente mais tarde.'
        });

        logout();
      }
    }
  };

  const signIn = async (email: any, password: any) => {
    setLoading(true);

    const { data } = await api
      .post('/api/v1/auth/login', {
        email,
        password
      })
      .catch(() => {
        setLoading(false);
        toast({
          variant: 'destructive',
          title: 'Atenção!',
          description: 'As credenciais informadas estão incorretas. Por favor, tente novamente.'
        });
      });

    if (data?.accessToken) {
      localStorage.setItem('token', data.accessToken);
      setSession(data.accessToken);
      router.push('/app/movies');
      setLoading(false);
    }
  };

  const logout = async () => {
    setUserData(null);
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
