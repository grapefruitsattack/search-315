'use client'
import { useEffect, useState } from "react";
import type { Lyric,LyricData,SongMaster } from '@/data/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDisclosure, 
 } from "@chakra-ui/react";
import {LyricShareModal} from "@/features/app/song/components/LyricShareModal";
import { LoaderIcon } from "lucide-react"

export default function LyricPage({ song, lyric, lyricIsLoading }: { song: SongMaster, lyric: Lyric, lyricIsLoading: boolean, }) {

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRowSeq, setSelectedRowSeq] = useState<number | null>(null);
  useEffect(() => {
    if (selectedRowSeq) {
      disclosure.onOpen();
    }
  }, [selectedRowSeq]);
  //モーダル
  const disclosure = useDisclosure();

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
        const currentRowSeq = rowList[0]?.row_seq;
        lyricList.push(
          <div 
            key={currentRowSeq} 
            className={`flex text-gray-500 mt-auto w-fit ${isExpanded ? 'cursor-pointer hover:bg-green-100/50 rounded' : 'pointer-events-none'} `}
              onClick={() => {
                setSelectedRowSeq(currentRowSeq);
                disclosure.onOpen();
              }}
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
        );
    }
      rowList=[];
    }
  })

  function switchExpanded(isExpanded:boolean){
    const element = document.getElementById("lyricHeading");
    if(isExpanded===false){
      element?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsExpanded(isExpanded)
  }

  return(
  <>
  <LyricShareModal song={song} disclosure={disclosure} targetRows={{ startRow: selectedRowSeq||1, endRow: 0 }} lyric={lyric} />
  {/* 見出し */}
  <a 
    id="lyricHeading"
      className="
          mobileL:text-2xl text-xl font-mono flex items-center w-full
          after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
          mb-4
      "
  >
    <svg className="fill-pink-400 mr-1" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
    <path d="M80-80v-720q0-33 23.5-56.5T160-880h440q33 0 56.5 23.5T680-800v17q-24 11-44 27t-36 36v-80H160v527l47-47h393v-160q16 20 36 36t44 27v97q0 33-23.5 56.5T600-240H240L80-80Zm160-320h160v-80H240v80Zm520-80q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 21 2t19 5v-207h160v80h-80v240q0 50-35 85t-85 35Zm-520-40h280v-80H240v80Zm0-120h280v-80H240v80Zm-80 320v-480 480Z"/>
    </svg>
    {'歌詞'}
  </a>
  {lyricIsLoading
    ?<div className="flex flex-col gap-[4px]">
      <Skeleton className={`flex h-[20px] w-[60%] rounded`}>
      </Skeleton>
      <Skeleton className={`flex h-[20px] w-[80%] rounded`}>
      </Skeleton>
      <Skeleton className={`flex h-[20px] w-[50%] rounded`}>
      </Skeleton>
      <Skeleton className={`flex h-[20px] w-[95%] rounded`}>
      </Skeleton>
    </div>
    :
    <section 
      className={`select-none print:hidden`}
    >
      <div
        className={`
          relative overflow-hidden 
          ${isExpanded ? 'max-h-[9999px]' : 'max-h-32 cursor-pointer'}
        `}
        onClick={(e) => {
          if(!isExpanded) switchExpanded(!isExpanded);
        }}
      >
        <div id="lyricDisplayArea" className="flex flex-col gap-0 mb-4 font-sans">
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
          onClick={() => switchExpanded(!isExpanded)}
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