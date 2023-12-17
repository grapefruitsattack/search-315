'use client'
import SubscButton from "./SubscButton";
import type { SongMaster, Albums } from '../../../data/types';
import songMasters from '../../../data/songMaster.json';
import albumMasters from '../../../data/albumMaster.json';
import {YoutubeModal} from "./YoutubeModal";
import {ShareYoutubeModal} from "../../app/shareModal/ShareYoutubeModal";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Tooltip} from "@chakra-ui/react";
import Link from 'next/link';
import GetArtWorkSrc from '../utils/GetArtWorkSrc';

export default function SongBlock(
  { albumId,trackNo,results,existsButton }: { albumId: string, trackNo: number, results: SongMaster, existsButton: boolean}
) {
  const song = results;
  const albam = albumMasters.find(data => data.albumId === song?.albumId);
  const imgSrc: string = GetArtWorkSrc(albam?.sereisId||'',results.isSoloColle,results.isUnitColle);
  
  
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [tooltipOn, setTooltipOn] = useState<boolean>(false);

  function copyTextToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    .then(function() {
      setTooltipOn(true);
      window.setTimeout(function(){setTooltipOn(false);}, 1500);
    }, function(err) {
    });
  }
    return (
      
    <section 
    className={`
      group
      rounded-md
      font-sans 
      ${results.youtubeId === ''
      ?'bg-purple-50 border-purple-400/30 border-t border-l'
      :'bg-white border-cyan-600/30 border-t-4 border-l-4'}
    `}
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
            
          <Link
            className =""
                href={`/song/` + song?.songId}
                
          >
          {imgSrc===''
            ?
            <img 
              className={`object-cover object-center rounded 
                h-[50px] w-[49px] 
                mobileM:h-[60px] mobileM:w-[59px] 
              `}
              src={`/artwork/dummy.png`}
              alt="アートワーク"
            />
            :<img
            className={`object-cover object-center rounded 
              h-[50px] w-[49px] 
              mobileM:h-[60px] mobileM:w-[59px] 
            `}
              src={`/artwork/${imgSrc}.png`}
              alt="アートワーク"
            />
            }
          </Link>
          </div>
          <Link
            className ="
              inline-block
              tablet:text-xl text-base
              p-0.5
              rounded-md
              underline
              leading-tight
              font-sans
              row-span-1 col-span-2 
              rounded-md px-1 pt-1 
              from-cyan-100/30 to-violet-200/30
              text-zinc-800
              hover:bg-gradient-to-tl
              hover:text-cyan-900 
              duration-500 ease-out
            "
            href={`/song/` + song?.songId}
            >
                {song?.songTitle}
          </Link>
          
          <div className ="
            row-span-1 col-span-2 
            text-sm leading-tight text-zinc-700
            pt-1 pl-1
          ">
          {song?.displayArtist}
          </div>
          <div className ="
            row-span-1 col-span-3 leading-none
            hidden lg:flex 
            break-all mb-1
          ">
            <a 
              className ="text-xs text-gray-500 underline hover:text-gray-400"
              href={`/album/` + results.albumId}
            >{albam?.albumTitleFull}</a>
          </div>
      </div>

      {/* ボタンエリア */}
      {existsButton
      ?
      <div className="grid grid-cols-5 gap-x-2 h-[36px]">
      {song?.youtubeId===''
            ?<div className = 'inline-block col-span-3'></div>
            :
            <div className = 'flex col-span-3 h-[36px]'>
            <SubscButton songId={song?.songId} albumId="" youtubeId={song?.youtubeId}/>
            </div>
      }

      <ShareYoutubeModal 
        youtubeUrl ={song?.youtubeId===''?'':`https://youtu.be/`+ song?.youtubeId}
        title={song?.songTitle} 
        artistName={song?.displayArtist}
        pass={'song/'+song?.songId}
      />

      <Tooltip className = '' placement='top' label='曲名をコピーしました' isOpen = {tooltipOn}>
      <motion.button className='rounded-lg border-2 border-green-500 
          text-green-500 text-sm font-sans leading-tight
          hover:bg-green-500 hover:text-green-100 
          transition-all duration-500 ease-out 
          fill-green-500 hover:fill-green-100 
          '
        onClick={() => copyTextToClipboard(song?.songTitle)}
        whileTap={{ scale: 0.87 }}
        transition={{ duration: 0.05 }}
      >
        <div
          className='flex flex-wrap justify-center items-center '>
        <svg 
        className="flex icon icon-tabler icon-tabler-copy justify-center items-center" 
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>
          {/* <div className="">コピー</div> */}
        </div>
      </motion.button>
      </Tooltip>
      </div>
      :
      <div className="">
      {song?.youtubeId===''
            ?<div className = 'hidden'></div>
            :
            <div className="grid grid-cols-5 h-[36px]">
            <div className = 'flex col-span-5 h-[36px] max-w-[280px]'>
            <SubscButton songId={song?.songId} albumId="" youtubeId={song?.youtubeId}/>
            </div>
            </div>
      }
      </div>
      }


    </section>
    
    )}
