'use client'
import SubscButton from "./../SubscButton";
import type { Story,SongMaster } from '../../../../data/types';
import subscSongs from '../../../../data/subscSongs.json';
import {ShareYoutubeModal} from "../../../app/shareModal/ShareYoutubeModal";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {Tooltip} from "@chakra-ui/react";
import Link from 'next/link';
import GetArtWorkSrc from '../../utils/GetArtWorkSrc';

export default function StoryBlock(
  { storyId, media, category, storyTitle, url }
  :{ storyId: string, media: number, category: string, storyTitle: string, url: string }
) {
  
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
      bg-white border-cyan-600/30 border-t-4 border-l-4
    `}
    >
      
      <div className ="
            row-span-1 col-span-3 leading-none
            lg:flex 
            break-all mb-1
          ">
            <a 
              className ="text-xs text-gray-500 underline hover:text-gray-400"
              href={`/story/` + storyId}
            >{storyTitle}</a>
          </div>

    </section>
    
    )}
