'use client'
import { useState } from "react";
import type { LiveMovie } from '@/data/types';
import {VideoBlock} from "@/features/common/components/video/VideoBlock";
import {VideoCarousel} from "@/features/common/components/video/VideoCarousel";
import { SquarePlay } from "lucide-react";

export default function Movie({ results }: { results: LiveMovie[] }) {

    const [isOpen, setISopen] = useState(true);

    
    return(
    <>
    {/* 見出し */}
    <a 
        className="
          mobileL:text-2xl text-xl font-mono flex items-center w-full
          after:h-[0.5px] after:grow after:bg-indigo-800/50 after:ml-[1rem] 
          text-indigo-900 font-bold
          cursor-pointer 
        "
        onClick={()=>setISopen(!isOpen)}
    >
        {isOpen
        ?<svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path></svg>
        :<svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path></svg>
        }
        <SquarePlay  className="mr-1 text-red-500"/>
        {'関連映像'}
    </a>

    <section className={`${isOpen?'':'hidden'}`}>
      {results.length<=1
        ?(
          <div className={`max-w-[400px]
          `}>
            <VideoBlock videoId={results[0].youtubeId}/>
          </div>
        )
        :(
          <VideoCarousel videoIdArray={results.map(data=>data.youtubeId)}/>
        )
      }
    </section>
    </>
    )
}