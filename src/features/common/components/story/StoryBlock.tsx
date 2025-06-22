'use client'
import SubscButton from "./../SubscButton";
import type { Story,InfoStory } from '../../../../data/types';
import subscSongs from '../../../../data/subscSongs.json';
import singingMaster from '../../../../data/singingMaster.json';
import {ShareYoutubeModal} from "../../../app/shareModal/ShareYoutubeModal";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {Tooltip} from "@chakra-ui/react";
import Link from 'next/link';
import GetArtWorkSrc from '../../utils/GetArtWorkSrc';
import { GetStoryMediaName,GetStoryCategoryName,GetStoryWebsiteName } from '../../utils/Story/GetStoryInfomation';
import IdolBadge from '../IdolBadge';

export default function StoryBlock(
  { storyId,media,category,headTitle,storyTitle,infoStory, url }
  :{ storyId: string, media: number, category: string, headTitle: string, storyTitle: string, infoStory: InfoStory[], url: string }
) {
  const member: string  
    = infoStory
      .filter(data=>data.personFlg===1)
      .map((result, index) => (singingMaster.find(data => data.singingInfoId === result.infoId)?.singingInfoName||''))
      .join("、");

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
      group w-full
      rounded-md
      font-sans 
      bg-white border-green-600/30 border-t-4 border-l-4
    `}
    >
    <section className='flex flex-wrap relative text-xs mobileS:text-sm font-mono text-white gap-1'>
      <div className="justify-center bg-teal-500 rounded-lg px-1 py-0.5">{GetStoryMediaName(media)}</div>
      <div className="justify-center bg-sky-400 rounded-lg px-1 py-0.5">{GetStoryCategoryName(category)}</div>
    </section>
    <div className ="
      row-span-1 col-span-2 
      leading-tight
      pl-1
    ">
    {headTitle}
    </div>
    <Link
      className ="
        inline-block
        tablet:text-xl text-base
        rounded-md
        underline
        leading-tight
        font-sans
        row-span-1 col-span-2 
        rounded-md px-1 
        from-cyan-100/30 to-violet-200/30
        text-zinc-800
        hover:bg-gradient-to-tl
        hover:text-cyan-900 
        duration-500 ease-out
      "
      href={`/story/` + storyId}
      >
          {storyTitle}
    </Link>
    <div className ='flex flex-wrap relative text-sm font-mono gap-0.5 mb-1 mx-1'>
        {infoStory.length === 0
          ?<></>
          :infoStory.filter(data=>data.personFlg===1).map(
            (result, index) => (<div key={index}><IdolBadge id={result.infoId} useShortName={1} size={'block'}/></div>))
        }
    </div>
    
    {url===null || url===''
        ?<></>
        :
    <div>
    <a className="w-full"
      href={url}
      target="_blank" rel="noopener noreferrer">
      <motion.button
          className='rounded-lg border-2 border-red-500 w-full h-full
          text-red-500 font-sans leading-tight
          hover:bg-red-500 hover:text-red-100 
          transition-all duration-500 ease-out
          fill-red-500 hover:fill-red-100 
          text-xs mobileS:text-sm lg:text-lg
          '
          type="button"
          aria-controls="contents"
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.05 }}
      >
          <div className='
              flex flex-wrap justify-center items-center font-sans font-black 
              mobileM:my-0.5 my-1
          '>
              {'アソビストーリーで読む'}
              <span className="">
              <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
              </span>

          </div>
      </motion.button>
    </a>
    </div>
    }
    </section>
    
    )}
