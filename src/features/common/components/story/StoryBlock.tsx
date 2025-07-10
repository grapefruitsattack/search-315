
import type { Story,InfoStory } from '../../../../data/types';
import singingMaster from '../../../../data/singingMaster.json';
import React from "react";
import Link from 'next/link';
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

    return (
      
    <section 
    className={`
      group w-full
      rounded-md
      font-sans 
      bg-white border-green-600/30 border-t-4 border-l-4
    `}
    >
    <Link
      className ="
        inline-block
        rounded-md
        row-span-1 col-span-2 
        rounded-md
        from-cyan-100/30 to-violet-200/30
        hover:bg-gradient-to-tl
        hover:text-cyan-900 
        duration-500 ease-out
        w-full
      "
      href={`/story/` + storyId}
      >
      <section className='flex flex-wrap relative text-xs mobileS:text-sm font-mono text-white gap-1'>
        <div className="justify-center bg-teal-500 rounded-lg px-1 py-0.5">{GetStoryCategoryName(category)}</div>
        <div className="justify-center bg-sky-400 rounded-lg px-1 py-0.5">{GetStoryMediaName(media)}</div>
      </section>
      <section className='px-1 '>
      <div className ="
        row-span-1 col-span-2 
        leading-tight
        pl-1
      ">
      {headTitle}
      </div>
      <div className ="
        tablet:text-xl text-base
        underline
        leading-tight
        font-sans
        text-zinc-800
      ">
          {storyTitle}
      </div>
      </section>
      <section className ='flex flex-wrap relative text-sm font-mono gap-0.5 mb-1 mx-1'>
          {infoStory.length === 0
            ?<></>
            :infoStory.filter(data=>data.personFlg===1).map(
              (result, index) => (<div key={index}><IdolBadge id={result.infoId} useShortName={1} size={'block'}/></div>))
          }
      </section>
    </Link>
    
    {url===null || url===''
        ?<></>
        :
    <div className='grid grid-cols-6 grid-rows-1 gap-1'>
    <div className="w-full col-span-1">
      {'未読'}
    </div>
    <div className="w-full col-span-2 ">
      <button
          className='rounded-lg border-2 border-blue-500 w-full h-full
          text-blue-500 font-sans leading-tight
          hover:bg-blue-500 hover:text-blue-100 
          transition-all duration-500 ease-out
          fill-blue-500 hover:fill-blue-100 
          text-xs mobileS:text-sm lg:text-lg
          font-sans font-black 
          '
      >
      <span className="">
      <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="2 2 22 24" width="18" height="18"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path></svg>
      </span>
      <span>{'後で読む'}</span>
      </button>
    </div>
    <a className="w-full col-span-3"
      href={url}
      target="_blank" rel="noopener noreferrer">
      <button
          className='rounded-lg border-2 border-red-500 w-full h-full
          text-red-500 font-sans leading-tight
          hover:bg-red-500 hover:text-red-100 
          transition-all duration-500 ease-out
          fill-red-500 hover:fill-red-100 
          text-xs mobileS:text-sm lg:text-lg
          '
      >
          <div className='
              flex flex-wrap justify-center items-center font-sans font-black 
              mobileM:my-0.5 my-1
          '>
              {'アソビストーリー'}
              <span className="">
              <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
              </span>

          </div>
      </button>
    </a>
    </div>
    }
    </section>
    
    )}
