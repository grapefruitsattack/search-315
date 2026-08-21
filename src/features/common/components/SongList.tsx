'use client'
import React from "react";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import type { SongMaster } from '@/data/types';
import subscSongs from '@/data/subscSongs.json';
import songMaster from '@/data/songMaster.json';
import albumMasters from '@/data/albumMaster.json';
import GetArtWorkSrc from '@/features/common/utils/GetArtWorkSrc';
import {GetArtistBadgeInfo} from '@/features/common/utils/ArtistUtils';
import IdolBadge from '@/features/common/components/IdolBadge';
import { ExternalLink } from 'lucide-react';

const SubscButton = dynamic(() => import("@/features/common/components/SubscButton"), {ssr: false,});

export default function SongList(
  { songId,index,displayArtist,useArtistBadge,displayArtwork,displayReleaseDate,useBadgeShortName=0 }
  : { songId: string, index: number, displayArtist: boolean, useArtistBadge: boolean, displayArtwork: boolean, displayReleaseDate:boolean, useBadgeShortName?:number, }
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

  return (
  <div 
    className={`flex w-full min-h-[50px] cursor-pointer group  hover:bg-green-100 ${index%2===1?'bg-white':'bg-zinc-50'} `}
  >
    {/* アートワーク */}
    <Link 
      className ={`h-fit rounded 
        bg-white group-hover:bg-white
        outline outline-2 outline-zinc-100 group-hover:outline-green-500 
        ${displayArtwork
          ?' '
          :' hidden '}`}
      href={`/song/` + song.songId}
    >
    {imgSrc===''
      ?
      <Image 
        className={` object-cover object-center rounded group-hover:opacity-[.67]
          min-h-[45px] min-w-[45px] 
        `}
        src={`/artwork/dummy.png`}
        alt="アートワーク"
        width={45}
        height={45}
      />
      :<Image
        className={` object-cover object-center rounded group-hover:opacity-[.67]
        min-h-[45px] min-w-[45px]
        `}
        src={`/artwork/${imgSrc}.png`}
        alt="アートワーク"
        width={45}
        height={45}
      />
      }
    </Link>
    <div 
      className={`rounded
        grid  ${song.subscFlg!==1&&song.trialYoutubeId===''?'grid-cols-1':'grid-cols-[2fr_1fr]'}
        w-full font-sans 
        group/songtitle
        `}
    >
      <Link 
        className="flex flex-col my-auto px-2 h-full text-xs mobileS:text-sm tablet:text-base truncate "
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
                (result, index) => (<div key={index} className=""><IdolBadge id={result} useShortName={useBadgeShortName} size={'block'}/></div>))
            }
          </div>
        </div>
      </Link>
      {/* サブスク・視聴動画 */}
      <div className={`flex h-full
        lg:w-auto  row-span-1  
        ${song.subscFlg!==1&&song.trialYoutubeId===''&&' hidden '}
        `}
        onClick={() => {
          router.push(`/song/` + song.songId);
        }}
      >
        <div className="flex my-auto w-full h-10">
          {song.subscFlg!==1
          ?song.trialYoutubeId!==''
            ?<a className="w-full h-full"
                href={`https://youtu.be/${song.trialYoutubeId}`}
                onClick={(e) => e.stopPropagation()}
                target="_blank" rel="noopener noreferrer"
              >
                <button
                    className='rounded-lg border-2 border-red-500 w-full h-full
                    font-sans leading-tight
                    text-white bg-red-500
                    text-xs mobileM:text-sm lg:text-base
                    transition-all duration-200 ease-out
                    hover:ring-2 hover:ring-red-500 hover:ring-offset-2
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
  </div>
  )}
