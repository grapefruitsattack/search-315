'use client'
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import {Tooltip} from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { SongMaster } from '@/data/types';
import subscSongs from '@/data/subscSongs.json';
import albumMasters from '@/data/albumMaster.json';
import {ShareYoutubeModal} from "@/features/app/shareModal/ShareYoutubeModal";
import GetArtWorkSrc from '@/features/common/utils/GetArtWorkSrc';
import YoutubeButton from "@/features/common/components/YoutubeButton";
import {GetArtistBadgeInfo} from '@/features/common/utils/ArtistUtils';
import IdolBadge from '@/features/common/components/IdolBadge';
const SubscButton = dynamic(() => import("@/features/common/components/SubscButton"), {ssr: false,});

export default function SongBlock(
  { albumId,trackNo,song,existsButton,diplayAlbum }
  : { albumId: string, trackNo: number, song: SongMaster, existsButton: boolean, diplayAlbum?: boolean }
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
      {existsButton
      ?
      <div className="grid grid-cols-5 gap-x-2 h-[36px]">
      {song?.subscFlg!==1
            ?song?.trialYoutubeId===''
              ?<div className = 'inline-block col-span-3'></div>
              :
              <div className = 'flex col-span-3 h-[36px]'>
              <YoutubeButton youtubeId={''} trialYoutubeId={song?.trialYoutubeId}/>
              </div>
            :
            <div className = 'flex col-span-3 h-[36px]'>
            <SubscButton songId={song?.songId} albumId=""/>
            </div>
      }

      <ShareYoutubeModal 
        youtubeUrl ={song?.subscFlg!==1?'':`https://youtu.be/`+ youtubeId}
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
      }


    </section>
    
    )}
