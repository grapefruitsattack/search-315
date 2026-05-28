'use client'
import { useState } from "react";
import type { Lyric,LyricData } from '@/data/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoaderIcon } from "lucide-react"

export default function LyricPage({ lyric, lyricIsLoading }: { lyric: Lyric, lyricIsLoading: boolean }) {

  const [isOpen, setISopen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  if(lyricIsLoading===false&&lyric.version===0) return(<></>);

  const lyricList: JSX.Element[] = [];
  let rowList:LyricData[] = [];

  lyric.data.forEach((data, index) => {
    rowList.push(data);

    const nextData = lyric.data[index + 1];
    const isLast =
      !nextData || (nextData.row_seq !== data.row_seq);

    if(isLast){
      if(rowList.length<=1&&rowList[0]?.lyric==='') {
        lyricList.push(
          <div key={rowList[0]?.row_seq} className={`flex h-[20px] `}>
          </div>
        )
      }else{
        lyricList.push(
          <Popover key={rowList[0]?.row_seq}>
            <PopoverTrigger asChild>
            <div 
              key={rowList[0]?.row_seq} 
              className={`flex text-gray-500 mt-auto cursor-pointer hover:bg-green-100/50 rounded`}
              >
              {rowList.map((rowListData, rowListIndex) => {
              if(rowListData.ruby===undefined){
                return(
                  <p className="mt-auto" key={rowListIndex}>{rowListData.lyric}</p>
                )
              }else{
                return(
                  <ruby key={rowListIndex} className="mt-auto">{rowListData.lyric} 
                    <rp>(</rp>
                    <rt>{rowListData.ruby}</rt>
                    <rp>)</rp>
                  </ruby>
                )
              }
              })}
            </div>
            </PopoverTrigger>
            <PopoverContent align="start">
              Set the dimensions for the layer.
            </PopoverContent>
          </Popover>
        );
    }
      rowList=[];
    }

    
  })

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

      {isOpen||lyricIsLoading
      ?<svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path></svg>
      :<svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path></svg>
      }
      <svg className="fill-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M20 3V17C20 19.2091 18.2091 21 16 21C13.7909 21 12 19.2091 12 17C12 14.7909 13.7909 13 16 13C16.7286 13 17.4117 13.1948 18 13.5351V5H9V17C9 19.2091 7.20914 21 5 21C2.79086 21 1 19.2091 1 17C1 14.7909 2.79086 13 5 13C5.72857 13 6.41165 13.1948 7 13.5351V3H20ZM5 19C6.10457 19 7 18.1046 7 17C7 15.8954 6.10457 15 5 15C3.89543 15 3 15.8954 3 17C3 18.1046 3.89543 19 5 19ZM16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z"></path></svg>
          {'歌詞'}
  </a>
  {lyricIsLoading
    ?<div className="my-6 mx-auto"><LoaderIcon size={32} color="#a8a8a8" className="animate-pulse animate-spin" /></div>
    :
    <section className={`${isOpen ? '' : 'hidden'} select-none print:hidden`}>
      <div
        className={`
          relative overflow-hidden transition-all duration-500
          ${isExpanded ? 'max-h-[9999px]' : 'max-h-64'}
        `}
      >
        <div className="flex flex-col gap-0">
          {lyricList}
        </div>

        {/* 下部フェード */}
        {!isExpanded && (
          <div
            className="
              absolute inset-x-0 bottom-0 h-24
              bg-gradient-to-t
              from-white
              to-transparent
              pointer-events-none
            "
          />
        )}
      </div>

      {/* ボタン */}
      {lyricList.length > 8 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="
            mt-3 w-full rounded-lg
            border border-neutral-300
            py-2 text-sm font-medium
            hover:bg-neutral-100
            transition-colors
          "
        >
          {isExpanded ? '閉じる' : 'もっと見る'}
        </button>
      )}
    </section>
  }
  </>
  )
}