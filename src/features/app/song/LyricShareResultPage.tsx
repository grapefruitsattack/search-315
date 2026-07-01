'use client'
import { useRouter,useSearchParams } from 'next/navigation'
import useSWR from 'swr';
import CommonPage from "@/features/common/components/CommonPage";
import songMaster from '@/data/songMaster.json';
import albumMaster from '@/data/albumMaster.json';
import type { SongMaster,Albums,Lyric } from '@/data/types';
import SongContent from "./components/SongContent";
import LyricShareResult from "./components/LyricShareResult";
import { useEffect } from 'react';

const fetcher = async (url: string) => {
  const response = await fetch(url,{cache:'force-cache'});

  if (!response.ok) {
    throw new Error('failed fetch');
  }

  return response.json();
};

export default function SearchPage({ songId }: { songId: string }) {

  const router = useRouter();
  const result : SongMaster | undefined 
    = songMaster.find(data => data.songId === songId);
  const album : Albums | undefined 
    = albumMaster.find(data => data.albumId === result?.albumId);

  const shouldFetch = result?.lyric !== '';
  const { data, error, isLoading } = useSWR(
    shouldFetch ? `/api/lyric/${result?.lyric}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: Infinity,
    }
  );

  const lyricVer0: Lyric = { version: 0, data: [] };
  let lyric: Lyric = lyricVer0;

  if (data?.lyric && data.lyric !== 'not found') {
    lyric = JSON.parse(data.lyric);
  };

  useEffect(() => {
    if (!shouldFetch) {
      router.push("/song/"+songId);
    }
  }, [shouldFetch, result]);

  useEffect(() => {
    if (isLoading===false&&lyric.version===0) {
      router.push("/song/"+songId);
    }
  }, [isLoading, lyric]);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const startRow :number = Number(searchParams.get('startrow')) || 1;
  let endRow :number = Number(searchParams.get('endrow')) || startRow;
  endRow = startRow>endRow?startRow:endRow
  const startChar :number = Number(searchParams.get('startchar')) || 0;
  const endChar :number = Number(searchParams.get('endchar')) || startRow;

  
  return (
    <>
      <title>{  `${result?.songTitle} ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
        {result === undefined || album === undefined
        ?<div>結果なし</div>
        :<LyricShareResult 
          result={result} albumResult={album} lyric={lyric} lyricIsLoading={isLoading} 
          startRow={startRow} endRow={endRow}
          startChar={startRow===endRow?startChar:0} endChar={startRow===endRow?endChar:0}
        />
        }
    </>
  );
}