'use client'
import SubscButton from "./../SubscButton";
import type { Story,SongMaster } from '../../../../data/types';
import subscSongs from '../../../../data/subscSongs.json';
import singingMaster from '../../../../data/singingMaster.json';
import {ShareYoutubeModal} from "../../../app/shareModal/ShareYoutubeModal";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {Tooltip} from "@chakra-ui/react";
import Link from 'next/link';
import GetArtWorkSrc from '../../utils/GetArtWorkSrc';
import { GetStoryMediaName,GetStoryCategoryName,GetStoryWebsiteName } from '../../utils/GetStoryInfomation';

export default function StoryBlock(
  { data }:{ data: Story }
) {
  const member: string  
    = data.info_story
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
      <div className="justify-center bg-teal-500 rounded-lg px-1 py-0.5">{GetStoryMediaName(data.media)}</div>
      <div className="justify-center bg-sky-400 rounded-lg px-1 py-0.5">{GetStoryCategoryName(data.category)}</div>
    </section>
    <div className ="
      row-span-1 col-span-2 
      text-sm leading-tight
      pt-0.5 pl-1
    ">
    {data.headTitle}
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
      href={`/story/` + data.storyId}
      >
          {data.storyTitle}
    </Link>
    <div className ="
      row-span-1 col-span-2 
      text-sm leading-tight text-zinc-700
      pt-1 pl-1
    ">
    {member}
    </div>
    </section>
    
    )}
