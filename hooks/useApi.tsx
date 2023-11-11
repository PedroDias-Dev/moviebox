'use client';

import { createContext, useContext } from 'react';
import axios from 'axios';

interface ApiContextProps {
  api: any;
}

const ApiContext = createContext<ApiContextProps>({
  api: null
});

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }: any) => {
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json',
      ...(typeof window !== 'undefined' &&
        localStorage.getItem('token') && {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        })
    }
  });

  const contextValue = {
    api
  };

  return <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>;
};
