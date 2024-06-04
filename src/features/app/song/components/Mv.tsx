'use client'
import { useState } from "react";
import type { MvInfo } from '../../../../data/types';
import {YoutubeModal} from "../../../common/components/YoutubeModal";

export default function Mv({ mvInfos }: { mvInfos: MvInfo[] }) {

    const [isOpen, setISopen] = useState(true);

    const youtubeMv: MvInfo[] = mvInfos.filter(data=>(data.siteType==='youtube'))||[];
    const otherMv: MvInfo[] = mvInfos.filter(data=>(data.siteType!=='youtube'))||[];

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
        <svg className="fill-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M20 3V17C20 19.2091 18.2091 21 16 21C13.7909 21 12 19.2091 12 17C12 14.7909 13.7909 13 16 13C16.7286 13 17.4117 13.1948 18 13.5351V5H9V17C9 19.2091 7.20914 21 5 21C2.79086 21 1 19.2091 1 17C1 14.7909 2.79086 13 5 13C5.72857 13 6.41165 13.1948 7 13.5351V3H20ZM5 19C6.10457 19 7 18.1046 7 17C7 15.8954 6.10457 15 5 15C3.89543 15 3 15.8954 3 17C3 18.1046 3.89543 19 5 19ZM16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z"></path></svg>
            {'関連動画'}
    </a>
    <section className={`${isOpen?'':'hidden'}`}>
    <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-10" >
            {/* Youtube動画 */}
            {youtubeMv.map((info, index) => (
                <div className='max-w-[310px]' key={index} >
                <div className=''>
                    <YoutubeModal title={info.title} embedUrl={info.embedUrl} thumbnailUrl={info.thumbnailUrl}></YoutubeModal>
                </div>
                <p className='flex flex-wrap justify-start items-center font-sans font-black lg:text-base text-sm w-fit'>
                    {info.title}
                </p>
                </div>
            ))}
        </div>
        {/* その他動画 */}
        {otherMv.map((info, index) => (
            <div key={index} >
                <a 
                    className =" rounded-lg 
                    underline text-teal-500 font-sans font-black hover:text-teal-700 fill-teal-500 hover:fill-teal-700 lg:text-lg text-sm transition-all duration-200 ease-out
                    "
                    href={info.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div  className='flex flex-wrap justify-start items-center font-sans font-black lg:text-base text-sm mt-8'>
                        {info.title}
                    </div>
                    <p
                        className ="rounded-lg 
                        underline text-teal-500 font-sans font-black hover:text-teal-700 fill-teal-500 hover:fill-teal-700 
                        lg:text-lg text-sm transition-all duration-200 ease-out
                        "
                    >
                        <span>
                        {info.url}
                        <span className="pl-0.5">
                        <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                        </span>
                        </span>
                    </p>
                </a>
            </div>
        ))}

    </div>
    </section>
    </>
    )
}