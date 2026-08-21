'use client'
import albumMaster from '@/data/albumMaster.json';
import type { Albums } from '@/data/types';
import AlbumBlock from "@/features/common/components/AlbumBlock";

export default function TopPageAlbum({ }: { }) {
  const displayAlbumData: Albums[] = albumMaster.toReversed().slice(0,10);

  return(<>
    <div 
      className=" h-fit w-full rounded-md border overflow-x-scroll overflow-y-hidden"
    >
      <div className={`
      flex flex-row flex-nowrap
      gap-4 lg:px-4 px-2 pt-2 pb-6
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