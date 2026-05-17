'use client';

import { createContext, useContext } from 'react';
import useSWR from 'swr';

type UserReadingData = {
  story_id: string;
  read_later: number;
};

type ContextType = {
  userReadingData: string | null;
  isLoading: boolean;
};

const LyricContext = createContext<ContextType>({
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

export default function LyricProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const { data, isLoading } = useSWR(
    '/api/lyric/2A01_1',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: Infinity,
    }
  );

  return (
    <LyricContext.Provider
      value={{
        userReadingData: data?.toString() ?? null,
        isLoading,
      }}
    >
      {children}
    </LyricContext.Provider>
  );
}

export function UseLyric() {
  return useContext(LyricContext);
}