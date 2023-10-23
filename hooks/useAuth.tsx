'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth, firestore } from '@/libs/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

interface AuthContextProps {
  user: any;
  loading: boolean;
  refresh: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  refresh: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [user, loading] = useAuthState(auth) as any;
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    getData();
  }, [user, loading]);

  const getData = () => {
    if (user) {
      const userRef = query(collection(firestore, 'users'), where('uid', '==', user.uid));
      getDocs(userRef).then((snapshot: any) => {
        const data = snapshot?.docs[0]?.data();
        // console.log(user)
        // console.log(data)

        setUserData({ data, ...user });
      });
    } else {
      setUserData(null);
    }
  };

  const contextValue = {
    user: userData,
    loading,
    refresh: getData
  };

  return <AuthContext.Provider value={contextValue}>{!loading && children}</AuthContext.Provider>;
};
