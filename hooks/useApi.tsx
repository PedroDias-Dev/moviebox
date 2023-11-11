'use client';

import { createContext, useContext, useEffect, useState } from 'react';
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
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const contextValue = {
    api
  };

  return <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>;
};
