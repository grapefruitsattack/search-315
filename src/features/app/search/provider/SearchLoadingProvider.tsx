'use client';

import {
  createContext,
  useContext,
  useState,
} from 'react';

const Context = createContext({
  loading: false,
  setLoading: (v:boolean) => {},
});

export default function SearchLoadingProvider({
  children
}:{
  children:React.ReactNode
}) {

  const [loading,setLoading]
    = useState(false);

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function UseSearchLoading() {
  return useContext(Context);
}