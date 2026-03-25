'use client'
import albumMaster from '@/data/albumMaster.json';
import type { Albums } from '@/data/types';
import AlbumBlock from "@/features//common/components/AlbumBlock";

export default function AlbumSeries({ albumId, seriesId }: { albumId: string, seriesId: string }) {

  const results : Albums[] | undefined 
      = albumMaster.filter(data => data.albumId !== albumId && data.sereisId === seriesId)||[];

  const resultsSort : Albums[]
      = results.filter(data => data.subscFlg === 1).concat(results.filter(data => data.subscFlg !== 1));

  return(
    <>

      <div 
          className="
          mobileM:text-2xl text-xl font-mono flex items-center w-full
          after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
      "
      >
          <svg className="fill-orange-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 16C14.2133 16 16 14.2133 16 12C16 9.78667 14.2133 8 12 8C9.78667 8 8 9.78667 8 12C8 14.2133 9.78667 16 12 16ZM12 11C12.55 11 13 11.45 13 12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11Z"></path></svg>
          {'アルバムシリーズ'}
      </div>

      <section className={`
      grid items-start lg:px-8 gap-4 grid-cols-1 lg:grid-cols-2 
      mt-5
      lg:grid grid
      `}
      >
          {resultsSort.map((result, index) => (
          <AlbumBlock 
              key={index} 
              results={result}
          />
          ))}
      </section>

    </>
  )
}