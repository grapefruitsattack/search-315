'use client'
import { useState } from "react";
import albumMaster from '../../../../data/albumMaster.json';
import type { Albums } from '../../../../data/types';
import AlbumBlock from "../../../common/components/AlbumBlock";

export default function AlbumSeries({ albumId, seriesId }: { albumId: string, seriesId: string }) {

    const results : Albums[] | undefined 
        = albumMaster.filter(data => data.albumId !== albumId && data.sereisId === seriesId)||[];

    const resultsSort : Albums[]
        = results.filter(data => data.subscFlg === 1).concat(results.filter(data => data.subscFlg !== 1));

    const [isOpen, setISopen] = useState(resultsSort.length < 20);

    return(
        <>

        <a 
            className="
            mobileM:text-2xl text-xl font-mono flex items-center w-full
            after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
            cursor-pointer lg:cursor-auto 
        "
            onClick={()=>setISopen(!isOpen)}
        >
            {isOpen
            ?<svg className="lg:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path></svg>
            :<svg className="lg:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path></svg>
            }
            <svg className="fill-orange-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 16C14.2133 16 16 14.2133 16 12C16 9.78667 14.2133 8 12 8C9.78667 8 8 9.78667 8 12C8 14.2133 9.78667 16 12 16ZM12 11C12.55 11 13 11.45 13 12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11Z"></path></svg>
            {'アルバムシリーズ'}
        </a>

        <section className={`
        grid items-start lg:px-32 gap-4 grid-cols-1 lg:grid-cols-2 
        mt-5
        ${isOpen?'lg:grid grid':'lg:grid hidden'}
        `}
        >
            {resultsSort.map((result, index) => (
            <AlbumBlock 
                key={index} 
                results={result}
                existsButton={false}
            />
            ))}
        </section>

        </>
    )
}