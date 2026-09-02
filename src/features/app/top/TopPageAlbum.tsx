'use client'
import albumMaster from '@/data/albumMaster.json';
import type { Albums } from '@/data/types';
import AlbumBlock from "@/features/common/components/AlbumBlock";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Disc } from "lucide-react";

export default function TopPageAlbum({ }: { }) {
  const displayAlbumData: Albums[] = albumMaster.toReversed().slice(0,30);

  return(
  <Card className="shadow-lg ">
    <CardHeader>
      <div 
        className="flex items-center w-full py-2 pl-4
          bg-gray-100 text-gray-700 mobileL:text-2xl mobileS:text-xl text-lg font-bold
          border-b "
      > 
        <Disc className="mr-1 text-indigo-700" />
        {'最新リリースCD'}
      </div>
    </CardHeader>
    <CardContent className='py-4'>

      <div 
        className="h-fit w-full rounded-md overflow-x-scroll overflow-y-hidden"
      >
        <div className={`
          flex flex-row flex-nowrap
          gap-4 lg:px-4 px-2 pt-3 pb-3
        `}
        >
            {displayAlbumData.map((result, index) => (
            <div className='tablet:min-w-[230px] mobileL:min-w-[200px] min-w-[170px]' key={index}>
              <AlbumBlock 
                  key={index} 
                  albumId={result.albumId}
              />
            </div>
            ))}
        </div>
      </div>
    </CardContent>
  </Card>
  )
}