'use client'
import albumMaster from '@/data/albumMaster.json';
import type { Albums } from '@/data/types';
import AlbumBlock from "@/features/common/components/AlbumBlock";
import { Disc } from "lucide-react";

export default function TopPageAlbum({ }: { }) {
  const displayAlbumData: Albums[] = albumMaster.toReversed().slice(0,10);

  return(<>
    <div 
      className="
          mobileL:text-2xl text-xl font-mono flex items-center w-full
          after:h-[0.5px] after:grow after:bg-indigo-800/50 after:ml-[1rem] 
          text-indigo-900 font-bold
      "
    >
      <Disc className="mr-1 text-indigo-700" />{'最新リリースCD'}
    </div>
    <div 
      className=" h-fit w-full rounded-md border overflow-x-scroll overflow-y-hidden"
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
  </>)
}