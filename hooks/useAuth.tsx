'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

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

  const { toast } = useToast();
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
          title: 'Error',
          description: 'There was an error while processing your data, please try again later.'
        });

        logout();
      }
    }
  };

  const signIn = (email: any, password: any) => {
    console.log(email, password);
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
