'use client'
import m_video from '@/data/m_video.json';
import {VideoCarousel} from "@/features/common/components/video/VideoCarousel";
import UnitBlock from "@/features/common/components/UnitBlock";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SquarePlay } from "lucide-react";

export default function TopPageVideo({ }: { }) {

  const videoIdArray: string[] = m_video.map(data=>data.videoId).slice(0,20);

  return(
  <Card className="shadow-lg ">
    <CardHeader>
      <div 
        className="flex items-center w-full py-2 pl-4
          bg-gray-100 text-gray-700 mobileL:text-2xl mobileS:text-xl text-lg font-bold
          border-b "
      > 
        <SquarePlay className="mr-1 text-red-500" />
        {'最新動画'}
      </div>
    </CardHeader>
    <CardContent className='py-4'>
      <VideoCarousel videoIdArray={videoIdArray} loop={true}/>
    </CardContent>
  </Card>
  )
}