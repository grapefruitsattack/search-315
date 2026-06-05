'use client'
import { useEffect, useState } from "react";
import type { Lyric,LyricData } from '@/data/types';
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

export default function LyricPage({ lyric, lyricIsLoading }: { lyric: Lyric, lyricIsLoading: boolean }) {

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
          <Popover key={currentRowSeq}>
            <PopoverTrigger asChild>
            <div 
              key={currentRowSeq} 
              className={`flex text-gray-500 mt-auto w-fit ${isExpanded ? 'cursor-pointer hover:bg-green-100/50 rounded' : 'pointer-events-none'} `}
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
            <PopoverContent align="start" className={`${isExpanded ? '' : ''}`}>
              <button
                onClick={() => {
                  setSelectedRowSeq(currentRowSeq);
                  disclosure.onOpen();
                  console.log(selectedRowSeq);
                }}
                className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
              >
                {'この歌詞を共有'}
              </button>
            </PopoverContent>
          </Popover>
        );
    }
      rowList=[];
    }
  })

  return(
  <>
  <LyricShareModal disclosure={disclosure} targetRows={{ startRow: selectedRowSeq||1, endRow: 0 }} lyric={lyric} />
  {/* 見出し */}
  <a 
      className="
          mobileL:text-2xl text-xl font-mono flex items-center w-full
          after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
          mb-4
      "
  >
      <svg className="fill-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M20 3V17C20 19.2091 18.2091 21 16 21C13.7909 21 12 19.2091 12 17C12 14.7909 13.7909 13 16 13C16.7286 13 17.4117 13.1948 18 13.5351V5H9V17C9 19.2091 7.20914 21 5 21C2.79086 21 1 19.2091 1 17C1 14.7909 2.79086 13 5 13C5.72857 13 6.41165 13.1948 7 13.5351V3H20ZM5 19C6.10457 19 7 18.1046 7 17C7 15.8954 6.10457 15 5 15C3.89543 15 3 15.8954 3 17C3 18.1046 3.89543 19 5 19ZM16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z"></path></svg>
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
    <section className={`select-none print:hidden`}>
      <div
        className={`
          relative overflow-hidden transition-all duration-200
          ${isExpanded ? 'max-h-[9999px]' : 'max-h-32 cursor-pointer'}
        `}
        onClick={(e) => {
          if(!isExpanded) setIsExpanded(!isExpanded);
        }}
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