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

export default function SongBlock(
  { albumId,trackNo,song,diplayAlbum }
  : { albumId: string, trackNo: number, song: SongMaster, diplayAlbum?: boolean }
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
      
    <section 
      className={`
        group w-full rounded-md cursor-pointer
        font-sans shadow-lg
        ${youtubeId === ''
        ?'bg-purple-50  outline-purple-400/30 outline-none hover:outline-offset-1 hover:outline-purple-300/80 hover:outline-4'
        :'bg-white outline-cyan-600/30 outline-none hover:outline-offset-1 hover:outline-blue-300 hover:outline-4'}
      `}
      onClick={() => router.push(`/song/` + song?.songId)}
      >

      <div 
        className ={`
          grid 
          mobileM:grid-cols-song grid-cols-songMobileS 
          auto-rows-auto
          m-0
         `}
        >
          <div className ="row-span-2">
          {imgSrc===''
            ?
            <Image 
              className={` object-cover object-center rounded 
                h-[60px] w-[59px] 
              `}
              src={`/artwork/dummy.png`}
              alt="アートワーク"
              width={60}
              height={60}
            />
            :<Image
              className={` object-cover object-center rounded 
              h-[60px] w-[59px] 
              `}
              src={`/artwork/${imgSrc}.png`}
              alt="アートワーク"
              width={60}
              height={60}
            />
            }
          </div>
          <div
            className ={`
              inline-block p-0.5 rounded-md px-1 pt-1 
              tablet:text-xl text-base
              underline underline-offset-2 
              leading-tight
              font-sans
              row-span-1 col-span-2 
              text-zinc-800
              decoration-1 group-hover:decoration-4 decoration-zinc-500
              ${youtubeId === ''
              ?'group-hover:decoration-purple-300'
              :'group-hover:decoration-blue-300'}
              `}
              >
              <Link href={`/song/` + song?.songId}>
                {song?.songTitle}
              </Link>
          </div>
          <div className ='flex flex-wrap relative text-sm gap-0.5 mb-1 mx-1 '>
              {artistArray.length <= 0
                ?<p className="text-sm leading-tight text-zinc-700 font-bold">{song?.displayArtist}</p>
                :artistArray.map(
                  (result, index) => (<div key={index} className=""><IdolBadge id={result} useShortName={1} size={'block'}/></div>))
              }
          </div>
          {/* <div className ="
            row-span-1 col-span-2 
            text-sm leading-tight text-zinc-700
            pt-1 pl-1
          ">
          {song?.displayArtist}
          </div> */}

          {/* アルバム */}
          {diplayAlbum===false
          ?<></>
          :<div className ="
            row-span-1 col-span-3 leading-none
            hidden lg:flex 
             mb-1"
          >
            <a 
              className ={`truncate text-sm text-gray-500 hover:underline hover:font-bold`}
              href={`/album/` + song.albumId}
            >{albam?.albumTitle}</a>
          </div>}

      </div>

      {/* ボタンエリア */}
      <div className="">
      {song?.subscFlg!==1
            ?song?.trialYoutubeId===''
              ?<div className = 'hidden'></div>
              :
              <div className="grid grid-cols-5 h-[36px]">
              <div className = 'flex col-span-5 h-[36px] max-w-[280px]'>
              <YoutubeButton youtubeId={''} trialYoutubeId={song?.trialYoutubeId}/>
              </div></div>
            :
            <div className="grid grid-cols-5 h-[36px]">
            <div className = 'flex col-span-5 h-[36px] max-w-[280px]'>
            <SubscButton songId={song?.songId} albumId="" />
            </div>
            </div>
      }
      </div>


    </section>
    
    )}
