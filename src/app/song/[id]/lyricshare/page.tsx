
import { Metadata } from 'next'
import CommonPage from "@/features/common/components/common/CommonPage";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { SongMaster,Albums,Lyric } from '@/data/types';
import songMaster from '@/data/songMaster.json';
import albumMaster from '@/data/albumMaster.json';
import GetArtWorkSrc from '@/features/common/utils/GetArtWorkSrc';

const LyricShareResultPage = dynamic(() => import("@/features/app/song/LyricShareResultPage"), { ssr: true });

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }>}): Promise<Metadata> => {

  const { id } = await params;
  const song : SongMaster
    = songMaster.find(data => data.songId === id) as SongMaster;
  const album : Albums
    = albumMaster.find(data => song.albumId === data.albumId) as Albums;

  const workParam: URLSearchParams = new URLSearchParams();
  workParam.set('songTitle',song.songTitle);
  workParam.set('displayArtist',song.displayArtist);
  workParam.set('albumTitle',song.albumTitle);
  workParam.set('artwork',GetArtWorkSrc(album.sereisId||'',album.isSoloColle,album.isUnitColle));

  const ogUrl =
    `${process.env.NEXT_PUBLIC_HOME_URL}/api/og/song/lyricshare?${workParam.toString()}`;

  return {
    title: `「${song.songTitle}」この歌詞がスキ！ ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`,
    openGraph: {
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export function generateStaticParams() {
  // return [
  //   { id: "SL01_1" },
  //   { id: "SL01_3" },
  //   { id: "SL01_5" },
  //   { id: "SL02_1" },
  // ];
  return songMaster.map((e)=>{
    return {id: e.songId}
  });
}

const Songs = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <Suspense>
    <CommonPage>
    <LyricShareResultPage songId={id} />
    </CommonPage>
    </Suspense>
  );
}
export default Songs;