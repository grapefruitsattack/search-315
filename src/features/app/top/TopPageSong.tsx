'use client'
import songMaster from '@/data/songMaster.json';
import subscSongs from '@/data/subscSongs.json';
import type { SongMaster } from '@/data/types';
import SongCarousel from "@/features/common/components/SongCarousel";
import { Music } from "lucide-react";

export default function TopPageSong({ }: { }) {

  const displaySongData = subscSongs.toReversed().slice(0,20).map((subscData=>songMaster.find(songData=>songData.songId===subscData.id))) as SongMaster[];

  return(<>
  <div 
    className="
        mobileL:text-2xl text-xl font-mono flex items-center w-full
        after:h-[0.5px] after:grow after:bg-indigo-800/50 after:ml-[1rem] 
        text-indigo-900 font-bold
    "
  >
    <Music className="mr-1 text-indigo-700" />{'サブスク新着楽曲'}
  </div>
  <div className={`
    max-w-[700px] w-full
    px-0 tablet:px-2
  `}>
    <SongCarousel songArray={displaySongData} displaySongCnt={4} displayArtist={true} useArtistBadge={true} displayReleaseDate={true} useBadgeShortName={1} />
  </div>
  </>)
}