'use client'
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Albums } from '@/data/types';
import subscAlbums from '@/data/subscAlbums.json';
import GetArtWorkSrc from '@/features/common/utils/GetArtWorkSrc';
import {GetArtistBadgeInfo} from '@/features/common/utils/ArtistUtils';
import IdolBadge from '@/features/common/components/IdolBadge';
import YoutubeButton from "@/features/common/components/YoutubeButton";
const SubscButton = dynamic(() => import("@/features/common/components/SubscButton"), {ssr: false,});

export default function AlbumBlock(
  { results }: { results: Albums}
) {

  const router = useRouter();
  const imgSrc: string = GetArtWorkSrc(results.sereisId||'',results.isSoloColle,results.isUnitColle);

  const artistArray: string[] = GetArtistBadgeInfo(results.artist);

  //サブスクURL一覧取得
  const youtubeId: string
    = results.subscFlg===1
      ?subscAlbums.find(data=>results.albumId===data.id)?.youtubeId || ''
      :'';
      
  return (
    <section className={`
      group rounded-md cursor-pointer
      ${youtubeId === ''
      ?'bg-purple-50  outline-purple-400/30 outline-none hover:outline-offset-1 hover:outline-purple-300/80 hover:outline-4'
      :'bg-white outline-cyan-600/30 outline-none hover:outline-offset-1 hover:outline-blue-300 hover:outline-4'}
      `}
      onClick={() => router.push(`/album/` + results.albumId)}
    >
      <div className ='flex flex-row w-full
        '
      >
        <div className ={`lg:mb-0 mb-px 
          min-w-[60px] 
          mobileM:min-w-[70px] 
          mobileL:min-w-[100px] 
          `}
        >
          <Link
            className =""
            href={`/album/` + results.albumId}
          >
            {imgSrc===''
              ?
              <Image 
                className={`
                  object-cover object-center rounded
                  h-[60px] w-[59px] 
                  mobileM:h-[70px] mobileM:w-[69px] 
                  mobileL:h-[100px] mobileL:w-[99px] 
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
                h-[60px] w-[59px] 
                mobileM:h-[70px] mobileM:w-[69px] 
                mobileL:h-[100px] mobileL:w-[99px] 
              `}
                src={`/artwork/${imgSrc}.png`}
                alt="アートワーク"
                width={100}
                height={100}
              />
              }
          </Link>
          </div>
        <div 
          className ={`flex flex-col w-full
            m-0  mb-2 pt-1 
          `}
        >
          <div
            className ="px-1"
            >
            <div className ='flex flex-wrap relative text-sm gap-0.5 mx-1 font-sans'>
                {artistArray.length <= 0
                  ?<p className="text-sm leading-tight text-zinc-700">{results.displayArtist}</p>
                  :artistArray.map(
                    (result, index) => (<div key={index} className=""><IdolBadge id={result} useShortName={1} size={'block'}/></div>))
                }
            </div>
          </div>
          <div
            className ="px-1"
          >
              <Link
                className ={`
                w-full h-full
                row-span-1 px-1
                inline-block
                tablet:text-xl mobileM:text-base text-sm
                leading-tight
                p-0.5
                rounded-md
                font-sans
                rounded-md px-1
                text-zinc-800
                ease-out

                underline underline-offset-2 
                decoration-1 group-hover:decoration-4 decoration-zinc-500
                ${youtubeId === ''
                ?'group-hover:decoration-purple-300'
                :'group-hover:decoration-blue-300'}
              `}
                href={`/album/` + results.albumId}
              >
                  {results.albumTitleFull}
              </Link>
          </div>
          </div>
        </div>
        
        {/* ボタンエリア */}
        <div className="">
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