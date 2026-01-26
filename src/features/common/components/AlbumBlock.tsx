'use client'
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import {Tooltip} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import type { Albums } from '@/data/types';
import subscAlbums from '@/data/subscAlbums.json';
import GetArtWorkSrc from '@/features/common/utils/GetArtWorkSrc';
import {GetArtistBadgeInfo} from '@/features/common/utils/ArtistUtils';
import IdolBadge from '@/features/common/components/IdolBadge';
const SubscButton = dynamic(() => import("@/features/common/components/SubscButton"), {ssr: false,});


export default function AlbumBlock(
  { results }: { results: Albums}
) {

  const imgSrc: string = GetArtWorkSrc(results.sereisId||'',results.isSoloColle,results.isUnitColle);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [tooltipOn, setTooltipOn] = useState<boolean>(false);

  const artistArray: string[] = GetArtistBadgeInfo(results.artist);

  //サブスクURL一覧取得
  const youtubeId: string
    = results.subscFlg===1
      ?subscAlbums.find(data=>results.albumId===data.id)?.youtubeId || ''
      :'';

  function copyTextToClipboard(text: string) {
      navigator.clipboard.writeText(text)
      .then(function() {
        setTooltipOn(true);
        window.setTimeout(function(){setTooltipOn(false);}, 1500);
      }, function(err) {
      });
    }
      
  return (
      <section className={`
      rounded-md 
      ${youtubeId === ''
      ?'bg-purple-50 border-purple-400/30 border-t-2 border-l-2'
      :'bg-white border-cyan-600/30 border-t-[5px] border-l-[6px]'}
      `}>
        <div className ='flex flex-row w-full
          '
        >
          <div className ='lg:mb-0 mb-px 
            min-w-[60px] 
            mobileM:min-w-[70px] 
            mobileL:min-w-[100px] 
          '>
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
                className ="
                w-full h-full
                row-span-1 px-1
                inline-block
                tablet:text-xl mobileM:text-base text-sm
                leading-tight
                p-0.5
                rounded-md
                underline
                font-sans
                rounded-md px-1
                text-zinc-800
                hover:bg-gradient-to-tl hover:from-cyan-100/30 hover:to-violet-200/30
                hover:text-cyan-900 
                duration-500 ease-out
                "
                href={`/album/` + results.albumId}
              >
                  {results.albumTitleFull}
              </Link>
          </div>
          </div>
        </div>
        <div>
          

        </div>
     </section>
  )
}