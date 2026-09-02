'use client'
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Albums } from '@/data/types';
import albumMaster from '@/data/albumMaster.json';
import subscAlbums from '@/data/subscAlbums.json';
import GetArtWorkSrc from '@/features/common/utils/GetArtWorkSrc';
import {GetArtistBadgeInfo} from '@/features/common/utils/ArtistUtils';
import IdolBadge from '@/features/common/components/IdolBadge';
import YoutubeButton from "@/features/common/components/video/YoutubeButton";
const SubscButton = dynamic(() => import("@/features/common/components/SubscButton"), {ssr: false,});

export default function AlbumBlock(
  { albumId }: { albumId: String}
) {
  const results: Albums = albumMaster.find((data=>data.albumId===albumId)) as Albums;

  const router = useRouter();
  const imgSrc: string = GetArtWorkSrc(results.sereisId||'',results.isSoloColle,results.isUnitColle);

  const artistArray: string[] = GetArtistBadgeInfo(results.artist);

  //リリース日
  const releaseDate: string 
    = new Date(
      Number(results.releaseDate.substring(0,4))
      ,Number(results.releaseDate.substring(4,6))-1
      ,Number(results.releaseDate.substring(6,8))).toLocaleDateString("ja-JP");

  //サブスクURL一覧取得
  const youtubeId: string
    = results.subscFlg===1
      ?subscAlbums.find(data=>results.albumId===data.id)?.youtubeId || ''
      :'';
      
  return (
    <section className={`flex flex-col font-sans 
      group rounded-md cursor-pointer
      ${youtubeId === ''
      ?'bg-purple-50  outline-purple-400/30 outline-none hover:outline-offset-1 hover:outline-purple-300/80 hover:outline-4'
      :'bg-white outline-zinc-600/30 outline-none hover:outline-offset-1 hover:outline-green-300 hover:outline-4'}
      `}
      onClick={() => router.push(`/album/` + results.albumId)}
    >
      <Link 
        className ='flex flex-col w-full h-full'
        href={`/album/` + results.albumId}
      >
      <div className="flex flex-col">
        <div
          className ="mx-px mobileL:mx-px my-1 mobileL:my-1 "
          >
          <div className ='flex flex-wrap relative text-sm gap-0.5  font-sans'>
              {artistArray.length <= 0
                ?<p className="text-sm font-bold leading-tight text-zinc-700 mx-1 line-clamp-2">{results.displayArtist}</p>
                :artistArray.map(
                  (result, index) => (<div key={index} className=""><IdolBadge id={result} useShortName={1} size={'block'}/></div>))
              }
          </div>
        </div>
      </div>
        <div className="flex flex-row ">
          {imgSrc===''
            ?
            <Image 
              className={`
                object-cover object-center rounded
                h-[60px] w-[59px] 
                mobileM:h-[70px] mobileM:w-[69px] 
                mobileL:h-[100px] mobileL:w-[99px] 
                bg-white outline outline-2 outline-zinc-100 
                ${youtubeId === ''?'group-hover:outline-purple-300 ':'group-hover:outline-green-300 '}
              `}
              src="https://placehold.jp/bdbdbd/ffffff/150x150.png?text=no%20image"
              alt="アートワーク"
              width={100}
              height={100}
            />
            :
            <Image
            className={`
              object-cover object-center rounded
              h-[50px] w-[49px] 
              mobileL:h-[70px] mobileL:w-[69px] 
              bg-white outline outline-2 outline-zinc-100 
              ${youtubeId === ''?'group-hover:outline-purple-300 ':'group-hover:outline-green-300 '}
            `}
              src={`/artwork/${imgSrc}.png`}
              alt="アートワーク"
              width={100}
              height={100}
            />
          }

          <div 
            className ={`flex flex-col w-full
              m-0  mb-2 gap-0 px-2 
            `}
          >
            <div className={`px-0 text-xs text-gray-500`}>
              {releaseDate}
            </div>
            <div
              className ={`
              w-full h-full
              row-span-1 
              inline-block
              tablet:text-lg mobileL:text-base text-sm
              leading-tight
              text-zinc-800
              ease-out
              underline underline-offset-2 
              decoration-1 group-hover:decoration-4 decoration-zinc-500
              ${youtubeId === ''
              ?'group-hover:decoration-purple-300'
              :'group-hover:decoration-green-300'}
            `}
            >
                {results.albumTitle}
            </div>
          </div>
        </div>
      </Link>
        
      {/* ボタンエリア */}
      <div className="mt-auto pt-1">
      {results?.subscFlg!==1
            ?results?.trialYoutubeId===''
              ?<div className = 'hidden'></div>
              :
              <div className="grid grid-cols-5 h-[36px]">
              <div className = 'flex col-span-5 h-[36px] max-w-[280px]'>
              <YoutubeButton youtubeId={''} trialYoutubeId={results?.trialYoutubeId}/>
              </div></div>
            :
            <div className="grid grid-cols-5 h-[36px]">
            <div className = 'flex col-span-5 h-[36px] max-w-[280px]'>
            <SubscButton songId={''} albumId={results?.albumId} />
            </div>
            </div>
      }
      </div>
    </section>
  )
}