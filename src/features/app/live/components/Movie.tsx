'use client'
import type { LiveMovie } from '../../../../data/types';
import {YoutubeModal} from "../../../common/components/YoutubeModal";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Movie({ results }: { results: LiveMovie[] }) {

    const [isOpen, setISopen] = useState(true);

    
    return(
    <>
    {/* 見出し */}
    <a 
        className="
            mobileL:text-2xl text-xl font-mono flex items-center w-full
            after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
            cursor-pointer mb-4
        "
        onClick={()=>setISopen(!isOpen)}
    >
        {isOpen
        ?<svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path></svg>
        :<svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path></svg>
        }
        <svg className="mr-1 fill-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM4 5V19H20V5H4ZM10.6219 8.41459L15.5008 11.6672C15.6846 11.7897 15.7343 12.0381 15.6117 12.2219C15.5824 12.2658 15.5447 12.3035 15.5008 12.3328L10.6219 15.5854C10.4381 15.708 10.1897 15.6583 10.0672 15.4745C10.0234 15.4088 10 15.3316 10 15.2526V8.74741C10 8.52649 10.1791 8.34741 10.4 8.34741C10.479 8.34741 10.5562 8.37078 10.6219 8.41459Z"></path></svg>
        {'ダイジェスト'}
    </a>

    <section className={`${isOpen?'':'hidden'}`}>
    <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-10" >
        {results.map((result, index) => (
            <div className='max-w-[310px]' key={index} >
            <div className=''>
                <YoutubeModal 
                    title={result.title} 
                    embedUrl={"https://www.youtube-nocookie.com/embed/"+result.youtubeId+"?mute=1&modestbranding=1"} 
                    thumbnailUrl={"http://img.youtube.com/vi/"+result.youtubeId+"/mqdefault.jpg"} 
                ></YoutubeModal>
            </div>
            <p className='flex flex-wrap justify-start items-center font-sans font-black lg:text-base text-sm w-fit'>
                {result.title}
            </p>
            </div>
        ))}
    </div>
    </div>
    </section>
    </>
    )
}