'use client'
import albumMaster from '@/data/albumMaster.json';
import type { Albums } from '@/data/types';
import AlbumBlock from "@/features/common/components/AlbumBlock";

export default function AlbumSeries({ albumId, seriesId }: { albumId: string, seriesId: string }) {

  const results : Albums[] | undefined 
      = albumMaster.filter(data => data.albumId !== albumId && data.sereisId === seriesId)||[];

  const resultsSort : Albums[]
      = results.filter(data => data.subscFlg === 1).concat(results.filter(data => data.subscFlg !== 1));

  return(
    <>

      <div 
        className="
          mobileL:text-2xl text-xl font-mono flex items-center w-full
          after:h-[0.5px] after:grow after:bg-indigo-800/50 after:ml-[1rem] 
          text-indigo-900 font-bold"
      >
          <svg className="fill-indigo-700 mr-px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 16C14.2133 16 16 14.2133 16 12C16 9.78667 14.2133 8 12 8C9.78667 8 8 9.78667 8 12C8 14.2133 9.78667 16 12 16ZM12 11C12.55 11 13 11.45 13 12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11Z"></path></svg>
          {'アルバムシリーズ'}
      </div>

      <div className={`
      flex flex-row flex-nowrap
      gap-4 lg:px-8  p-4
      overflow-x-scroll overflow-y-hidden
      `}
      >
          {resultsSort.map((result, index) => (
          <div className='tablet:min-w-[230px] mobileL:min-w-[200px] min-w-[170px]' key={index}>
            <AlbumBlock 
                key={index} 
                albumId={result.albumId}
            />
          </div>
          ))}
      </div>

    </>
  )
}