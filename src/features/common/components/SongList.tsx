'use client'
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { SongMaster } from '@/data/types';
import subscSongs from '@/data/subscSongs.json';
import albumMasters from '@/data/albumMaster.json';
import GetArtWorkSrc from '@/features/common/utils/GetArtWorkSrc';
import YoutubeButton from "@/features/common/components/YoutubeButton";
import {GetArtistBadgeInfo} from '@/features/common/utils/ArtistUtils';
import IdolBadge from '@/features/common/components/IdolBadge';
const SubscButton = dynamic(() => import("@/features/common/components/SubscButton"), {ssr: false,});

export default function SongList(
  { song,index,displayArtist,displayArtwork }
  : { song: SongMaster, index: number, displayArtist: boolean, displayArtwork: boolean }
) {
  
  const router = useRouter();
  const albam = albumMasters.find(data => data.albumId === song?.albumId);
  const imgSrc: string = GetArtWorkSrc(albam?.sereisId||'',albam?.isSoloColle||0,albam?.isUnitColle||0);

  const artistArray: string[] = GetArtistBadgeInfo(song.artist);
 
  //YoutubeURL取得
  const youtubeId: string
    = song.subscFlg===1
      ?subscSongs.find(data=>song.songId===data.id)?.youtubeId || ''
      :'';

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [tooltipOn, setTooltipOn] = useState<boolean>(false);

  function copyTextToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    .then(function() {
      setTooltipOn(true);
      window.setTimeout(function(){setTooltipOn(false);}, 1500);
    }, function(err) {
    });
  };

  return (
  <div 
    className={`
      grid grid-cols-[2fr_1fr]
      font-sans cursor-pointer min-h-[50px] 
      ${index%2===1?'bg-white':'bg-zinc-50'} 
      hover:bg-zinc-200 group
      `}
    onClick={() => router.push(`/song/` + song?.songId)}
  >
    {/* アートワーク */}
    {/* <div className ={`${displayArtwork?' ':'hidden'}`}>
    {imgSrc===''
      ?
      <Image 
        className={` object-cover object-center rounded 
          min-h-[48px] min-w-[48px] 
        `}
        src={`/artwork/dummy.png`}
        alt="アートワーク"
        width={48}
        height={48}
      />
      :<Image
        className={` object-cover object-center rounded 
        min-h-[48px] min-w-[48px] 
        `}
        src={`/artwork/${imgSrc}.png`}
        alt="アートワーク"
        width={48}
        height={48}
      />
      }
    </div> */}
    <div className="flex flex-col my-auto mx-2 text-xs mobileS:text-sm tablet:text-base truncate">

      <div className="group-hover:underline truncate">{song.songTitle}</div>
      {/* アーティスト */}
      <div className={`${displayArtist?' mobileM:text-base text-sm':'hidden'}`}>
        <div className ='flex flex-wrap relative text-sm gap-0.5 mb-1 mx-1 '>
          {artistArray.length <= 0
            ?<p className="text-sm leading-tight text-zinc-700 font-bold">{song?.displayArtist}</p>
            :artistArray.map(
              (result, index) => (<div key={index} className=""><IdolBadge id={result} useShortName={0} size={'block'}/></div>))
          }
        </div>
      </div>
    </div>
    {/* サブスク */}
    <div className={`
      lg:w-auto inline-block row-span-1 h-10 my-auto 
      ${song.subscFlg!==1?' hidden':''}
      `}>
      <SubscButton songId={song.songId} albumId={''} />
    </div>
  </div>
  
  )}
