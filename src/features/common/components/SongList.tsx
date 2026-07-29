'use client'
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { SongMaster } from '@/data/types';
import subscSongs from '@/data/subscSongs.json';
import songMaster from '@/data/songMaster.json';
import albumMasters from '@/data/albumMaster.json';
import GetArtWorkSrc from '@/features/common/utils/GetArtWorkSrc';
import YoutubeButton from "@/features/common/components/video/YoutubeButton";
import {GetArtistBadgeInfo} from '@/features/common/utils/ArtistUtils';
import IdolBadge from '@/features/common/components/IdolBadge';
import { ExternalLink } from 'lucide-react';

const SubscButton = dynamic(() => import("@/features/common/components/SubscButton"), {ssr: false,});

export default function SongList(
  { songId,index,displayArtist,useArtistBadge,displayArtwork,displayReleaseDate }
  : { songId: string, index: number, displayArtist: boolean, useArtistBadge: boolean, displayArtwork: boolean, displayReleaseDate:boolean }
) {
  const song: SongMaster = songMaster.find((data=>data.songId===songId)) as SongMaster;

  const router = useRouter();
  const albam = albumMasters.find(data => data.albumId === song?.albumId);
  const imgSrc: string = GetArtWorkSrc(albam?.sereisId||'',albam?.isSoloColle||0,albam?.isUnitColle||0);

  const artistArray: string[] = GetArtistBadgeInfo(song.artist);

  const releaseDate: string 
    = new Date(
      Number(song.releaseDate.substring(0,4))
      ,Number(song.releaseDate.substring(4,6))-1
      ,Number(song.releaseDate.substring(6,8))).toLocaleDateString("ja-JP");
 
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
    className="flex w-full min-h-[50px] cursor-pointer group "
  >
    {/* アートワーク */}
    <Link 
      className ={`
        ${displayArtwork?'h-fit rounded outline outline-2 outline-green-200/0 hover:opacity-[.67] hover:outline-green-400 ':'hidden'}`}
      href={`/album/` + song.albumId}
    >
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
    </Link>
    <div 
      className={`rounded
        grid grid-cols-[2fr_1fr] w-full
        font-sans 
        ${index%2===1?'bg-white':'bg-zinc-50'} 
        group-hover:bg-green-100
        group/songtitle
        `}
      onClick={() => router.push(`/song/` + song?.songId)}
    >
      <Link 
        className="flex flex-col my-auto mx-2 text-xs mobileS:text-sm tablet:text-base truncate"
        href={`/song/` + song.songId}
      >
        <div>
          <div className={`${displayReleaseDate?'text-xs text-gray-500':'hidden'}`}>
            {releaseDate}
          </div>
          <div className="group-hover/songtitle:underline truncate font-semibold" >
            {song.songTitle}
          </div>
        </div>
        {/* アーティスト */}
        <div className={`${displayArtist?' mobileM:text-base text-sm':'hidden'}`}>
          <div className ='flex flex-wrap relative text-sm gap-0.5 mb-1 mx-1 '>
            {artistArray.length <= 0 || useArtistBadge===false
              ?<p className="text-sm leading-tight text-zinc-700 truncate">{song?.displayArtist}</p>
              :artistArray.map(
                (result, index) => (<div key={index} className=""><IdolBadge id={result} useShortName={0} size={'block'}/></div>))
            }
          </div>
        </div>
      </Link>
      {/* サブスク */}
      <div className={`
        lg:w-auto inline-block row-span-1 h-10 my-auto 
        `}>
        {song.subscFlg!==1
        ?song.trialYoutubeId!==''
        ?<a className="w-full h-full"
            href={`https://youtu.be/${song.trialYoutubeId}`}
            onClick={(e) => e.stopPropagation()}
            target="_blank" rel="noopener noreferrer"
          >
            <button
                className='rounded-lg border-2 border-red-500 w-full h-full
                text-red-500 font-sans leading-tight
                hover:bg-red-500 hover:text-red-100 
                transition-all duration-500 ease-out
                fill-red-500 hover:fill-red-100 
                text-xs mobileM:text-sm lg:text-base
                '
                type="button"
                aria-controls="contents"
            >
                <div className={`
                    mobileL:flex hidden flex-wrap justify-center items-center font-sans font-black 
                    mobileM:my-1 my-2 mx-4
                `}>
                {'試聴動画'}
                    <ExternalLink className="tablet:w-[18px] tablet:h-[18px] w-[14px] h-[14px]" />
                </div>
                <div className={`
                    flex mobileL:hidden flex-wrap justify-center items-center font-sans font-black 
                    mobileM:my-1 my-2 mx-4
                `}>
                {'試聴'}
                    <ExternalLink className="tablet:w-[18px] tablet:h-[18px] mobileM:w-[14px] mobileM:h-[14px] w-[10px] h-[10px]" />
                </div>
            </button>
        </a>
        :<></>
        :<SubscButton songId={song.songId} albumId={''} />
        }
      </div>
    </div>
  </div>
  )}
