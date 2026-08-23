'use client'
import songMaster from '@/data/songMaster.json';
import subscSongs from '@/data/subscSongs.json';
import type { SongMaster } from '@/data/types';
import SongCarousel from "@/features/common/components/SongCarousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";

export default function TopPageSong({ }: { }) {

  const displaySongData = subscSongs.toReversed().slice(0,20).map((subscData=>songMaster.find(songData=>songData.songId===subscData.id))) as SongMaster[];

  return(<Card className="shadow-lg ">
    <CardHeader>
      <div 
        className="flex items-center w-full py-2 pl-4
          bg-gray-100 text-gray-700 mobileL:text-2xl mobileS:text-xl text-lg font-bold
          border-b "
      > 
        <Music className="mr-1 text-indigo-700" />
        {'サブスク新着楽曲'}
      </div>
    </CardHeader>
    <CardContent className='py-4'>
      <div className={`
        max-w-[700px] w-full
        px-0 tablet:px-2
      `}>
        <SongCarousel songArray={displaySongData} displaySongCnt={4} displayArtist={true} useArtistBadge={true} displayReleaseDate={true} useBadgeShortName={1} />
      </div>
    </CardContent>
  </Card>)
}