'use client'
import albumMaster from '@/data/albumMaster.json';
import songMaster from '@/data/songMaster.json';
import subscSongs from '@/data/subscSongs.json';
import type { Albums } from '@/data/types';
import AlbumBlock from "@/features/common/components/AlbumBlock";
import type { SongMaster } from '@/data/types';
import SongCarousel from "@/features/common/components/SongCarousel";

export default function TopPageSong({ }: { }) {

  const displaySongData = subscSongs.toReversed().slice(0,20).map((subscData=>songMaster.find(songData=>songData.songId===subscData.id))) as SongMaster[];

  return(<>
  <div className={`
    max-w-[700px] w-full
    px-0 tablet:px-2
  `}>
    <SongCarousel songArray={displaySongData} displaySongCnt={4} displayArtist={true} useArtistBadge={true} />
  </div>
  </>)
}