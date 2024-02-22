'use client'
import { useState } from "react";
import songMaster from '../../../../data/songMaster.json';
import type { SongMaster } from '../../../../data/types';
import SongBlock from "../../../common/components/SongBlock";
import GetSongOtherVersion from '../../../common/utils/GetSongOtherVersion';

export default function OtherVersion({ id ,commonSongId }: { id: string, commonSongId: string }) {

    const result : SongMaster[] = GetSongOtherVersion(id,commonSongId);
    const resultSort : SongMaster[] | undefined 
        = result.filter(data => data.subscFlg === 1).concat(result.filter(data => data.subscFlg !== 1));

    const [isOpen, setISopen] = useState(result.length < 10);

    return(
            <>
            <a 
                className="
                    mobileL:text-2xl text-xl font-mono flex items-center w-full
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
                <svg className="fill-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M20 3V17C20 19.2091 18.2091 21 16 21C13.7909 21 12 19.2091 12 17C12 14.7909 13.7909 13 16 13C16.7286 13 17.4117 13.1948 18 13.5351V5H9V17C9 19.2091 7.20914 21 5 21C2.79086 21 1 19.2091 1 17C1 14.7909 2.79086 13 5 13C5.72857 13 6.41165 13.1948 7 13.5351V3H20ZM5 19C6.10457 19 7 18.1046 7 17C7 15.8954 6.10457 15 5 15C3.89543 15 3 15.8954 3 17C3 18.1046 3.89543 19 5 19ZM16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z"></path></svg>
                {'別のバージョン'}
            </a>
            <section className={`
                 items-start gap-4 grid-cols-1 lg:grid-cols-3 mt-5
                ${isOpen?'lg:grid grid':'lg:grid hidden'}            
            `}>
            {resultSort.map((result, index) => (
            <SongBlock 
              key={index} 
              albumId={result.albumId} 
              trackNo={result.trackNo} 
              song={result}
              existsButton={false}
            />
            ))}
            </section>
            </>
    )
}