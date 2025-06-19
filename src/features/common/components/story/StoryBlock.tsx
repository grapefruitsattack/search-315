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
import { GetStoryMediaName,GetStoryCategoryName,GetStoryWebsiteName } from '../../utils/GetStoryInfomation';
import IdolBadge from '../IdolBadge';

export default function StoryBlock(
  { storyId,media,category,headTitle,storyTitle,infoStory }
  :{ storyId: string, media: number, category: string, headTitle: string, storyTitle: string, infoStory: InfoStory[], }
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
    <section className='flex flex-wrap relative text-xs tablet:text-sm font-mono text-white gap-1'>
      <div className="justify-center bg-teal-500 rounded-lg px-1 py-0.5">{GetStoryMediaName(media)}</div>
      <div className="justify-center bg-sky-400 rounded-lg px-1 py-0.5">{GetStoryCategoryName(category)}</div>
    </section>
    <div className ="
      row-span-1 col-span-2 
      text-sm leading-tight
      pt-0.5 pl-1
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
    </section>
    
    )}
