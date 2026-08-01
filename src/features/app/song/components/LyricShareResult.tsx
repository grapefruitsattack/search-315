'use client'
import React from "react";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import type { SongMaster,Albums,Lyric,LyricData } from '@/data/types';
import subscSongs from '@/data/subscSongs.json';
import GetArtWorkSrc from '@/features/common/utils/GetArtWorkSrc';
import GetSongOtherVersion from '@/features/common/utils/GetSongOtherVersion';
import {GetArtistJsx,GetArtistBadgeInfo} from '@/features/common/utils/ArtistUtils';
import IdolBadge from '@/features/common/components/IdolBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';

const SubscButton = dynamic(() => import("@/features/common/components/SubscButton"), {ssr: false,});

function getTargetLyric(lyric: Lyric, maxRowSeq:number, startRow: number, endRow: number, displayRowCnt: number): LyricData[] {
  const emptyRowSeqs: number[] = lyric.data.filter((data)=>data.lyric==='').map((data)=>data.row_seq);

  const upperRowSeq = startRow<=displayRowCnt ?1 :startRow-displayRowCnt;
  const lowerRowSeq = endRow>=(maxRowSeq-displayRowCnt+1) ?maxRowSeq :endRow+displayRowCnt;

  const targetLyricData: LyricData[] = [];
  targetLyricData.push(...lyric.data.filter(data => data.row_seq >= upperRowSeq && data.row_seq <= lowerRowSeq));
  
  if(emptyRowSeqs.includes(upperRowSeq)) {
    targetLyricData.push(...lyric.data.filter(data => data.row_seq === upperRowSeq-1));
  };
  if(emptyRowSeqs.includes(lowerRowSeq)) {
    targetLyricData.push(...lyric.data.filter(data => data.row_seq === lowerRowSeq+1));
  };

  targetLyricData.sort((i,j) => i.seq - j.seq);

  return targetLyricData;
};

function getLyricJsx(
  lyricData: LyricData[],
  startRow: number,
  endRow: number,
  startChar: number,
  endChar: number
): JSX.Element[] {
  const lyricList: JSX.Element[] = [];
  let rowList:LyricData[] = [];

  const enableCharHighlight =
    startRow === endRow &&
    startChar !== 0 && endChar !== 0;
  lyricData.forEach((data, index) => {
    rowList.push(data);
    const currentRowSeq = rowList[0]?.row_seq;
    const nextData = lyricData[index + 1];
    const isLast =
      !nextData || (nextData.row_seq !== data.row_seq);


    if(isLast){
      if(rowList.length<=1&&rowList[0]?.lyric==='') {
        lyricList.push(
          <div key={rowList[0]?.row_seq} className={`flex h-[20px] `}>
          </div>
        )
    }else if(enableCharHighlight&&currentRowSeq===startRow){
      type SelectableUnit = {
        index: number;
        text: string;
        ruby?: string;
      };
      const units: SelectableUnit[] = [];
      let unitIndex = 1;
      rowList.forEach(item => {
        if (item.ruby) {
          units.push({
            index: unitIndex++,
            text: item.lyric,
            ruby: item.ruby,
          });
          return;
        }
        item.lyric.split('').forEach(char => {
          units.push({
            index: unitIndex++,
            text: char,
          });
        });
      });
      const lyricCharList: JSX.Element[] = [];
      units.forEach(unit => {
        const currentCharSeq = unit.index;
        lyricCharList.push(
          <div
            key={currentCharSeq}
            className={`
              mt-auto 
              ${startChar < currentCharSeq && currentCharSeq < endChar
                && 'bg-green-200 text-gray-800 font-bold'}
              ${startChar === currentCharSeq
                && 'bg-green-200 rounded-l-md text-gray-800 font-bold'}
              ${endChar === currentCharSeq
                && 'bg-green-200 rounded-r-md text-gray-800 font-bold '}
              ${startChar > currentCharSeq && currentCharSeq > endChar
                && 'text-gray-400'}
            `}
          >
            {unit.ruby
              ? (
                <ruby>
                  {unit.text}
                  <rp>(</rp>
                  <rt>{unit.ruby}</rt>
                  <rp>)</rp>
                </ruby>
              )
              :unit.text===' '
                ?'\u00A0'
                :unit.text
            }
          </div>
        );
      })
      lyricList.push(<div key={currentRowSeq} className="flex flex-wrap gap-y-2">{lyricCharList}</div>)
    }else{
      lyricList.push(
        <div 
          key={currentRowSeq} 
          className={`align-baseline w-fit pointer-events-none 
          ${currentRowSeq>=startRow&&currentRowSeq<=endRow
              ?'text-gray-800 font-bold bg-green-200'
              :'text-gray-400'
            }
          `}
          >
          {rowList.map((rowListData, rowListIndex) => {
          if(rowListData.ruby===undefined){
            return(
              <React.Fragment key={rowListIndex}>{rowListData.lyric}</React.Fragment>
            )
          }else{
            return(
              <span key={rowListIndex} className="inline-flex items-end">
                <ruby key={rowListIndex} className="mt-auto">{rowListData.lyric}
                  <rp>(</rp>
                  <rt>{rowListData.ruby}</rt>
                  <rp>)</rp>
                </ruby>
              </span>
            )
          }
          })}
        </div>
      );
    }
      rowList=[];
    }
  })

  return lyricList;
}

export default function LyricShareResult(
  { result, albumResult, lyric, lyricIsLoading, startRow, endRow, startChar, endChar }
  : { result: SongMaster, albumResult: Albums, lyric: Lyric, lyricIsLoading: boolean, 
    startRow: number, endRow: number, startChar: number, endChar: number }
) {

  // アーティスト
  const artistArray: string[] = GetArtistBadgeInfo(result.artist);
  //アートワーク
  const imgSrc: string = GetArtWorkSrc(albumResult.sereisId||'',albumResult.isSoloColle,albumResult.isUnitColle);
  //リリース日
  const releaseDate: string 
      = new Date(
          Number(result.releaseDate.substring(0,4))
          ,Number(result.releaseDate.substring(4,6))-1
          ,Number(result.releaseDate.substring(6,8))).toLocaleDateString("ja-JP");

  //YoutubeURL取得
  const youtubeId: string
    = result.subscFlg===1
      ?subscSongs.find(data=>result.songId===data.id)?.youtubeId || ''
      :'';
  // 他バージョン曲取得
  const otherVersionSongs : SongMaster[] = GetSongOtherVersion(result.songId,result.commonSong);

  //雪を積もらせる
  //ローカルストレージ
  //const jsonStr = localStorage.getItem('snowParam');
  // const currentSnowParam: {snowIsValid: string, noticeCheckedYear: string} 
  //     = jsonStr===null?{snowIsValid:'1',noticeCheckedYear:''}:JSON.parse(jsonStr);
  const currentSnowParam: {snowIsValid: string, noticeCheckedYear: string}  = {snowIsValid:'0',noticeCheckedYear:''};
  //const snowImgSrc: string ='/snow/artworksnow'+String(Math.floor(Math.random() * 3)+1)+'.png';
  const snowImgSrc: string ='/snow/artworksnow1.png';

  const displayRowCnt: number = startRow===endRow?4:3;
  const maxRowSeq: number = lyric.data.reduce((max, data) => Math.max(max, data.row_seq), 0);
  const targetLyricData: LyricData[] = getTargetLyric(lyric, maxRowSeq, startRow, endRow, displayRowCnt);
  const lyricList: JSX.Element[] = getLyricJsx(targetLyricData, startRow, endRow, startChar, endChar);

  return(
    <div className=" pb-96 px-2 mobileS:px-2 mobileM:px-4 bg-white lg:max-w-[1000px] lg:m-auto font-mono">

      <div className="mb-2 bg-gradient-to-r from-zinc-500 tablet:from-60% from-90% rounded">
        <div 
          className="
            flex items-center w-full ml-2
            text-2xl font-mono
            text-white
            cursor-pointer lg:cursor-auto 
              gap-2">
            <svg className="fill-white mr-1 " xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M80-80v-720q0-33 23.5-56.5T160-880h440q33 0 56.5 23.5T680-800v17q-24 11-44 27t-36 36v-80H160v527l47-47h393v-160q16 20 36 36t44 27v97q0 33-23.5 56.5T600-240H240L80-80Zm160-320h160v-80H240v80Zm520-80q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 21 2t19 5v-207h160v80h-80v240q0 50-35 85t-85 35Zm-520-40h280v-80H240v80Zm0-120h280v-80H240v80Zm-80 320v-480 480Z"/>
            </svg>
          <p className="pr-6">{'この歌詞がスキ！'}</p>
        </div>
      </div>

      <div className="mb-2 text-start align-middle gap-x-5">
        <div className='flex '>
          {/* アートワーク */}
          <div className={`row-span-6 w-[60px] inline-block relative`}>
            <Image
              className={`object-cover object-center h-[60px] max-w-[60px]  aspect-square rounded-lg`}
              src={`/artwork/${imgSrc}.png`}
              alt="アートワーク"
              width={400}
              height={400}
            />
            <Image
              className={currentSnowParam.snowIsValid==='0'||result.colleFlg===1
                  ?'hidden':` absolute left-[-7px] top-[-9px] h-auto w-[130px] `}
              src={snowImgSrc}
              alt="snow"
              width={130}
              height={130}
            />
          </div>
          {/* 情報 */}
          <div className={`lg:w-auto inline-block row-span-4 px-2`}>

            <div className="tablet:text-base text-sm text-base font-sans leading-tight lg:leading-normal">

            </div>
            <div className="text-3xl mobileL:text-4xl tablet:text-5xl font-mono font-bold inline-block">
              {result.songTitle}
            </div>

            {artistArray.length <= 0
              ?<div className="tablet:text-xl text-base font-sans text-blue-800/80">
                  <GetArtistJsx artist={result.artist}></GetArtistJsx>
              </div>
              :<div 
                  className ='
                    flex flex-wrap relative text-sm mt-0 mb-1 mx-1 font-sans
                    gap-y-2 gap-x-1 tablet:gap-y-1 tablet:gap-x-2'
                >
                  {artistArray.map(
                      (result, index) => (<div key={index} className=""><IdolBadge id={result} useShortName={0} size={'normal'} linkType='music' /></div>))}
              </div>
            }
          </div>
        </div>
      </div>

      
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
      <>
        <div className={`select-none print:hidden`}>
          <div
          className={`
            relative overflow-hidden 
            whitespace-pre-wrap
          `}
        >
          <div
            className={`
              absolute inset-x-0 top-0 h-12
              bg-gradient-to-b
              from-white
              to-transparent
              pointer-events-none
              ${startRow<=displayRowCnt+1&&'hidden'}
            `}
          />
          <div className="flex flex-col gap-0 text-xl mobileL:text-2xl tablet:text-3xl">
            {lyricList}
          </div>
          <div
            className={`
              absolute inset-x-0 bottom-0 h-12
              bg-gradient-to-t
              from-white
              to-transparent
              pointer-events-none
              ${endRow>=maxRowSeq-displayRowCnt&&'hidden'}
            `}
          />
          </div>
        </div>
        {/* ボタン */}
        <div className='flex  flex-col gap-4 my-6'>
          <div className={`
            grid gap-y-[5px]
            ${result.subscFlg!==1 && result.trialYoutubeId===''?' hideen':''}
            ${result.subscFlg!==1
              ?' grid-cols-1 w-2/3 tablet:w-1/3 w-full'
              :' grid-cols-[3fr_2fr] tablet:w-1/2 w-full'}
            `}>
            {/* サブスク */}
            <div className={`
              lg:w-auto inline-block row-span-1 h-10 
              ${result.subscFlg!==1?' hidden':''}
              `}>
              <SubscButton songId={result.songId} albumId=""/>
            </div>
          </div>
          <Link
            className='flex z-10  w-fit h-fit gap-1 items-stretch
            border-2 border-zinc-700 text-zinc-800 bg-white
            text-sm tablet:text-lg font-bold 
            '
            href={{pathname:`/song/${result.songId}`}}
            onClick={()=>{
              if(typeof window !== 'undefined'){
                sessionStorage.setItem(
                  "lyricOpen",
                  String('1')
                );
              }
            }}
          >
            <div className='px-1  my-auto'>
              <div>{'歌詞をすべて見る'}</div>
            </div>
            <div className=' bg-zinc-700 flex items-center px-1 '>
              <ArrowRight 
                className='text-white my-auto mx-auto bg-zinc-700 w-[16px] tablet:w-[20px]'
              />
            </div>
            
          </Link>
        </div>
      </>
      }
      

    </div>
  )
}
