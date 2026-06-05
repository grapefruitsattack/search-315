'use client'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr';
import CommonPage from "@/features/common/components/CommonPage";
import songMaster from '@/data/songMaster.json';
import albumMaster from '@/data/albumMaster.json';
import type { SongMaster,Albums,Lyric } from '@/data/types';
import SongContent from "./components/SongContent";
import LyricShareResult from "./components/LyricShareResult";

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('failed fetch');
  }

  return response.json();
};

export default function SearchPage({ songId }: { songId: string }) {

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
  }

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const type :string = searchParams.get('t') || '';
  const rowStart :number = Number(searchParams.get('rowstart')) || 0;
  const rowEnd :number = Number(searchParams.get('rowend')) || 0;
  
  return (
    <>
      <title>{  `${result?.songTitle} ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
        {result === undefined || album === undefined
        ?<div>結果なし</div>
        :type === 'lyricshare' && lyric.data.length > 0 && rowStart !== 0
        ?<LyricShareResult result={result} albumResult={album} lyric={lyric} lyricIsLoading={isLoading} rowStart={rowStart} rowEnd={rowEnd}/>
        :<SongContent result={result} albumResult={album} lyric={lyric===undefined ? lyricVer0 : lyric} lyricIsLoading={isLoading}/>
        }
    </>
  );
}