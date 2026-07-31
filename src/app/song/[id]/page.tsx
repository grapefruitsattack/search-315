
import { Suspense } from "react";
import { Metadata } from 'next';
import dynamic from "next/dynamic";
import type { SongMaster,Albums,Lyric } from '@/data/types';
import songMaster from '@/data/songMaster.json';
import CommonPage from "@/features/common/components/CommonPage";
import SongContent from "@/features/app/song/components/SongContent";
import StoryWithSong from "@/features/app/song/components/StoryWithSong";



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
  const song : SongMaster
    = songMaster.find(data => data.songId === id) as SongMaster;
  return (
    <Suspense>
    <CommonPage>
      <title>{`${song.songTitle} ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
      <div className=" pb-96 px-2 mobileS:px-4 mobileM:px-8 bg-white lg:max-w-[1000px] lg:m-auto font-mono">
        <SongContent result={song}/>
        <Suspense fallback={<></>}>
          <StoryWithSong songId={id}/>
        </Suspense>
      </div>
    </CommonPage>
    </Suspense>
  );
}
export default Songs;