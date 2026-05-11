'use client';

import { createContext, useContext } from 'react';
import useSWR from 'swr';

type UserReadingData = {
  story_id: string;
  read_later: number;
};

type ContextType = {
  login: boolean;
  userReadingData: UserReadingData[] | null;
  isLoading: boolean;
};

const UserReadingContext = createContext<ContextType>({
  login: false,
  userReadingData: null,
  isLoading: true,
});

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('failed fetch');
  }

  return response.json();
};

export default function UserReadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const { data, isLoading } = useSWR(
    '/api/user-reading',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: Infinity,
    }
  );

  return (
    <UserReadingContext.Provider
      value={{
        login: data?.login ?? false,
        userReadingData: data?.userReadingData ?? null,
        isLoading,
      }}
    >
      {children}
    </UserReadingContext.Provider>
  );
}

export function useUserReading() {
  return useContext(UserReadingContext);
}