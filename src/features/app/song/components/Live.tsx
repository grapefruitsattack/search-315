'use client'
import { useState } from "react";
import type { SongMaster,Albums,MvInfo,LiveMaster } from '../../../../data/types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

export default function Live({ results }: { results: LiveMaster[] }) {

    const [isOpen, setISopen] = useState(false);

    return(
        <>
            <div className="flex items-start">
            <a 
                className="
                    text-2xl font-mono flex items-center w-full
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
            <svg className="fill-orange-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M10.6144 17.7956C10.277 18.5682 9.20776 18.5682 8.8704 17.7956L7.99275 15.7854C7.21171 13.9966 5.80589 12.5726 4.0523 11.7942L1.63658 10.7219C.868536 10.381.868537 9.26368 1.63658 8.92276L3.97685 7.88394C5.77553 7.08552 7.20657 5.60881 7.97427 3.75892L8.8633 1.61673C9.19319.821767 10.2916.821765 10.6215 1.61673L11.5105 3.75894C12.2782 5.60881 13.7092 7.08552 15.5079 7.88394L17.8482 8.92276C18.6162 9.26368 18.6162 10.381 17.8482 10.7219L15.4325 11.7942C13.6789 12.5726 12.2731 13.9966 11.492 15.7854L10.6144 17.7956ZM4.53956 9.82234C6.8254 10.837 8.68402 12.5048 9.74238 14.7996 10.8008 12.5048 12.6594 10.837 14.9452 9.82234 12.6321 8.79557 10.7676 7.04647 9.74239 4.71088 8.71719 7.04648 6.85267 8.79557 4.53956 9.82234ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899ZM18.3745 19.0469 18.937 18.4883 19.4878 19.0469 18.937 19.5898 18.3745 19.0469Z"></path></svg>
            {'ライブ'}
                 {/* 注釈　PC版 */}
                <div className="ml-2 hidden lg:flex flex-wrap fill-red-600
                text-sm font-sans text-gray-900 bg-gray-200
                ">
                <span className="pr-1 text-red-500">
                <FontAwesomeIcon icon={faCircleExclamation} />
                </span>
                    <p className="w-fit">
                        {'ナンバリングライブ(1st～7th)、3Dライブ(ファンコンライブ)のみ対応。'}
                    </p>
                    <p className="w-max-[calc(100%_-_20px)]">
                        {'そのほかのライブは後日実装予定です'}
                    </p>
                </div>
            </a>
            </div>
        <section className={`
            ${isOpen?'lg:flex flex flex-col':'lg:flex hidden'}            
        `}>
        {/* 注釈　スマホ版 */}
        <div className="ml-2 lg:hidden flex flex-wrap fill-red-600
        text-sm font-sans text-gray-900 bg-gray-200
        ">
            <p className="w-fit bg-gray-200">
            <span className="pr-1 text-red-500">
            <FontAwesomeIcon icon={faCircleExclamation} />
            </span>
                {'ナンバリングライブ(1st～7th)、3Dライブ(ファンコンライブ)のみ対応。'}
                {'そのほかのライブは後日実装予定です'}
            </p>
        </div>
        <div className={`grid
            grid-cols-2 lg:grid-cols-4 lg:gap-4 gap-2 pt-4
        `}>
        {results.map((result, index) => (
            <a
            key={index} 
            className ="
            rounded-md
            bg-white border-cyan-600/40 border-2
            py-1 w-full
            grid
            place-items-center
            lg:text-base text-sm p-0.5
            underline
            leading-tight
            font-sans
            rounded-md px-1 pt-1 
            from-cyan-100/30 to-violet-200/30
            text-cyan-900
            hover:bg-gradient-to-tl
            hover:text-cyan-700 
            duration-500 ease-out
            w-fit
            "
            href={`/live/` + result.livePerId}
            >
                <div className="flex flex-wrap place-content-center">
                <p className ='after:content-["\00A0"] text-center'>{result.displayLiveName+''}</p>
                <p className ="text-center">{result.displayPerName}</p>
                </div>
            </a>
        ))}
        </div>
        </section>
        </>
)
}