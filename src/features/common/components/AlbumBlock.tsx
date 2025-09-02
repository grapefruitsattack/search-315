'use client'
import Image from 'next/image';
import type { Albums } from '../../../data/types';
import subscAlbums from '../../../data/subscAlbums.json';
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import GetArtWorkSrc from '../utils/GetArtWorkSrc';
import {ShareYoutubeModal} from "../../app/shareModal/ShareYoutubeModal";
import {Tooltip} from "@chakra-ui/react";
import Link from 'next/link';

export default function AlbumBlock(
  { results, existsButton }: { results: Albums, existsButton: boolean}
) {

  const imgSrc: string = GetArtWorkSrc(results.sereisId||'',results.isSoloColle,results.isUnitColle);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [tooltipOn, setTooltipOn] = useState<boolean>(false);

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
              />
              }
          </Link>
          </div>
        <div 
          className ={`flex flex-col w-full
            m-0 
          `}
        >
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
                rounded-md px-1 pt-1 
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

          <div
            className ="px-1 mb-2"
            >
            <a 
              className ="inline-block font-sans
              tablet:text-sm text-xs
              leading-tight text-zinc-700
              pl-1 h-fit
            ">
            {results.displayArtist}
            </a>
          </div>


          {/* ボタンエリア */}
          {existsButton
          ?
          <div className="hidden tablet:grid grid-cols-3 gap-x-1 mt-auto">
            <div className='lg:relative static w-full '>
              {youtubeId===''
                ?<div className='inline-block lg:relative static lg:w-full'></div>
                :
                <a className="w-full"
                  href={`https://youtube.com/playlist?list=${youtubeId}`}
                target="_blank" rel="noopener noreferrer">
                <motion.button
                  className='rounded-lg 
                    font-sans leading-tight
                    text-red-500 hover:text-red-100 
                    border-2 border-red-500
                    hover:bg-red-500
                    fill-red-500 hover:fill-red-100 
                    transition-all duration-500 ease-out
                    text-xs mobileL:text-sm tablet:text-base
                    min-h-[30px] w-full  bottom-0
                    '
                  type="button"
                  aria-controls="contents"
                  aria-expanded={isOpen}
                  onClick={() => setIsOpen(!isOpen)}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.05 }}
                  >
                  <div className='flex flex-wrap justify-center items-center font-sans font-black '>
                    {'YouTube'}
                    <span className="">
                    <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                    </span>
                    </div>
                  </motion.button>
                  </a>
              }
            </div>

          
            <div className='inline-block relative w-full'>
              <div className='h-[30px] w-full absolute bottom-0'>
                <ShareYoutubeModal 
                  youtubeUrl={youtubeId===''?'':`https://youtube.com/playlist?list=`+ youtubeId}
                  title={results.albumTitleFull} 
                  artistName={results.displayArtist}
                  pass={'album/'+results.albumId}
                />
              </div>
            </div>

            <div className='inline-block relative w-full'>
              <Tooltip className = 'hidden tablet:block' placement='top' label='アルバム名をコピーしました' isOpen = {tooltipOn}>
                <motion.button className='rounded-lg border-2 border-green-500 
                    text-green-500 text-sm font-sans leading-tight
                    hover:bg-green-500 hover:text-green-100 
                    fill-green-500 hover:fill-green-100 
                    transition-all duration-500 ease-out w-full h-[30px] absolute bottom-0
                    '
                  onClick={() => copyTextToClipboard(results.albumTitleFull)}
                  whileTap={{ scale: 0.87 }}
                  transition={{ duration: 0.05 }}
                >
                  <div
                    className='flex flex-wrap justify-center items-center'>
                  <svg 
                  className="flex icon icon-tabler icon-tabler-copy justify-center items-center" 
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>
                    {/* <div className="">コピー</div> */}
                  </div>
                </motion.button>
              </Tooltip>

            </div>

          </div>
          :<></>
          }

          </div>
        </div>
        <div>
          
        {existsButton
          ?
          <div className="grid tablet:hidden grid-cols-3 gap-x-1 mt-auto">
            <div className='lg:relative static w-full '>
              {youtubeId===''
                ?<div className='inline-block lg:relative static lg:w-full'></div>
                :
                <a className="w-full"
                  href={`https://youtube.com/playlist?list=${youtubeId}`}
                target="_blank" rel="noopener noreferrer">
                <motion.button
                  className='rounded-lg font-sans leading-tight
                    text-red-500 hover:text-red-100 
                    border-2 border-red-500
                    hover:bg-red-500
                    fill-red-500 hover:fill-red-100 
                    transition-all duration-500 ease-out
                    text-xs mobileL:text-sm tablet:text-base
                    min-h-[30px] w-full  bottom-0
                    '
                  type="button"
                  aria-controls="contents"
                  aria-expanded={isOpen}
                  onClick={() => setIsOpen(!isOpen)}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.05 }}
                  >
                  <div className='flex flex-wrap justify-center items-center font-sans font-black '>
                    {'YouTube'}
                    <span className="">
                    <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                    </span>
                    </div>
                  </motion.button>
                  </a>
              }
            </div>

          
            <div className='inline-block relative w-full'>
              <div className='h-[30px] w-full absolute bottom-0'>
                <ShareYoutubeModal 
                  youtubeUrl={youtubeId===''?'':`https://youtube.com/playlist?list=`+ youtubeId}
                  title={results.albumTitleFull} 
                  artistName={results.displayArtist}
                  pass={'album/'+results.albumId}
                />
              </div>
            </div>

            <div className='inline-block relative w-full'>
              <Tooltip className = 'block tablet:hidden' placement='top' label='アルバム名をコピーしました' isOpen = {tooltipOn}>
                <motion.button className='rounded-lg border-2 border-green-500 
                    text-green-500 text-sm font-sans leading-tight
                    hover:bg-green-500 hover:text-green-100 
                    fill-green-500 hover:fill-green-100 
                    transition-all duration-500 ease-out w-full h-[30px] absolute bottom-0
                    '
                  onClick={() => copyTextToClipboard(results.albumTitleFull)}
                  whileTap={{ scale: 0.87 }}
                  transition={{ duration: 0.05 }}
                >
                  <div
                    className='flex flex-wrap justify-center items-center'>
                  <svg 
                  className="flex icon icon-tabler icon-tabler-copy justify-center items-center" 
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>
                    {/* <div className="">コピー</div> */}
                  </div>
                </motion.button>
              </Tooltip>

            </div>

          </div>
          :<></>
          }
        </div>
     </section>
  )
}