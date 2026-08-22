'use client'
import type { LiveMaster } from '@/data/types';
import LiveBlock from "@/features/common/components/LiveBlock";
import { MicVocal } from "lucide-react";

export default function Live({ results }: { results: LiveMaster[] }) {

    return(
        <>
            <div className="flex items-start">
            <a 
                className="
                  mobileL:text-2xl text-xl font-mono flex items-center w-full
                  after:h-[0.5px] after:grow after:bg-indigo-800/50 after:ml-[1rem] 
                  text-indigo-900 font-bold
                "
            >
            <MicVocal className="mr-1 text-indigo-700" />
            {'ライブ'}
                 {/* 注釈　PC版 */}
                <div className="ml-2 hidden lg:flex flex-wrap fill-red-600
                text-sm font-sans text-gray-900 bg-gray-200
                ">
                <span className="pr-1 text-red-500">
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 2 24 24" width="18" height="18"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path></svg>
                </span>
                </span>
                    <p className="w-fit">
                        {'映像商品化されたライブイベントのみ掲載'}
                    </p>
                </div>
            </a>
            </div>
        <section className={`
            lg:grid flex flex-col      
        `}>
        {/* 注釈　スマホ版 */}
        <div className="ml-2 lg:hidden flex flex-wrap fill-red-600
        text-sm font-sans text-gray-900 bg-gray-200
        ">
            <p className="w-fit bg-gray-200">
            <span className="pr-1 text-red-500">
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 2 24 24" width="18" height="18"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path></svg>
                </span>
            </span>
                {'映像商品化されたライブイベントのみ掲載'}
            </p>
        </div>
        <div className={`grid
            grid-cols-2 lg:grid-cols-4 lg:gap-4 gap-2 pt-4
        `}>
        {results.map((result, index) => (
          <div key={index} className='mb-auto'>
            <LiveBlock liveId={result.liveId} livePerId={result.livePerId} />
          </div>
        ))}
        </div>
        </section>
        </>
)
}