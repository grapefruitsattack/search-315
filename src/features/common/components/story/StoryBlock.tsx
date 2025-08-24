'use client'
import type { Story,InfoStory } from '../../../../data/types';
import singingMaster from '../../../../data/singingMaster.json';
import React, { useState } from "react";
import Link from 'next/link';
import { GetStoryMediaName,GetStoryCategoryName,GetStoryWebsiteName } from '../../utils/Story/GetStoryInfomation';
import IdolBadge from '../IdolBadge';
import MediaBadge from './MediaBadge';
import CategoryBadge from './CategoryBadge';
import {UpdateReadingData}  from "@/features/app/actions/UpdateReadingData";
import {DeleteReadingData}  from "@/features/app/actions/DeleteReadingData";
import { toast } from 'sonner';

export default function StoryBlock(
  { storyId,media,category,headTitle,storyTitle,infoStory,url,login,userReadLater,displayLogin }
  :{ 
    storyId: string,media: number, category: string,
    headTitle: string, storyTitle: string, infoStory: InfoStory[],
    url: string, login:boolean, userReadLater: number,
    displayLogin: boolean
  }
) {
  
  const infoStoryPerson: InfoStory[] = infoStory.filter(data=>data.personFlg===1);

  // 後で読むボタン用
  const [loading, setLoading] = useState<boolean>(false);

  async function addIsReading (storyId: string) {
    await UpdateReadingData(storyId,'',1)
    .then(() => {
      setLoading(true);
      return new Promise<void>((resolve) => {
        window.setTimeout(() => {
          setLoading(false);
          resolve();
        }, 1000);
      });
    })
    .then(() => {
      toast("「後で読む」リストに新規追加しました", {
        action: {
          label: "OK",
          onClick: () => console.log("Undo"),
        },
      });
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
    })
  };
  async function deleteIsReading (storyId: string) {
    await DeleteReadingData(storyId,1)
    .then(() => {
      setLoading(true);
      return new Promise<void>((resolve) => {
        window.setTimeout(() => {
          setLoading(false);
          resolve();
        }, 1000);
      });
    })
    .then(() => {
      toast("「後で読む」リストから削除しました", {
        action: {
          label: "OK",
          onClick: () => console.log("Undo"),
        },
      });
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
    })
  };
  

    return (
    <section 
    className={`
      group w-full
      rounded-md
      font-sans 
      bg-white border-green-600/30 border-2 shadow-lg
    `}
    >
    <Link
      className ="
        inline-block
        row-span-1 col-span-2 
        bg-white
        from-cyan-100/30 to-violet-200/30
        hover:bg-gradient-to-tl
        hover:text-cyan-900 
        duration-500 ease-out
        w-full
      "
      href={`/story/` + storyId}
      >
      <section className='flex flex-wrap relative text-xs mobileS:text-sm font-mono font-bold text-white gap-1'>
        <CategoryBadge id={category} size='block'/>
        <MediaBadge id={media} size='block'/>
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
        lg:text-2xl text-xl
        underline
        leading-tight
        font-sans font-black
        text-zinc-800
      ">
          {storyTitle}
      </div>
      </section>
      <section className ='flex flex-wrap relative text-sm font-mono gap-0.5 mb-1 mx-1'>
          {infoStoryPerson.length === 0
            ?<></>
            :infoStoryPerson.length === 49
              //参加アイドルが49人の場合、「315プロダクション」表記
              ?<div><IdolBadge id={'315pro'} useShortName={1} size={'block'}/></div>
              :infoStoryPerson.map(
                (result, index) => (<div key={index}><IdolBadge id={result.infoId} useShortName={1} size={'block'}/></div>))
          }
      </section>
    </Link>
    
    <section className ='bg-green-300/30'>
    {url===null || url===''
        ?<></>
        :
          displayLogin?
            <div className='grid grid-cols-4 grid-rows-1 gap-1'>
              {userReadLater===0
              ?
                <div className="w-full h-full col-span-2 ">
                  {'既読'}
                </div>
              :
              loading
              ?<div className="w-full h-full col-span-2 flex justify-center p-2">
                <div className="animate-spin h-5 w-5 border-4 border-blue-500 rounded-full border-t-transparent"></div>
              </div>
              :
            <div className="w-full h-full col-span-2 ">
              <form
                className='w-full h-full'
                action={async () => {
                  if(login){
                    if(userReadLater===1){
                      deleteIsReading(storyId);
                    }else if(userReadLater!==1&&userReadLater!==0){
                      addIsReading(storyId);
                    }
                  }
                }}
                >
                <button
                    className={`flex justify-center
                    rounded-lg border-2 border-amber-500 w-full h-full
                    text-amber-500 font-sans leading-tight
                    hover:text-amber-100 
                    bg-white hover:bg-amber-500
                    transition-all duration-500 ease-out
                    fill-amber-500 hover:fill-amber-100 
                    text-xs mobileS:text-sm 
                    ${userReadLater===1?' lg:text-base':' lg:text-lg'}
                    font-sans font-black 
                    `}
                >
                <span className={`flex items-center ${userReadLater===1?'hidden':''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" viewBox="0 -960 960 960">
                  <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </span>
                <span className='flex items-center'>{userReadLater===1?'「後で読む」追加済み':'後で読む'}</span>
                </button>
              </form>
            </div>
              }
            <a className="w-full col-span-2"
              href={url}
              target="_blank" rel="noopener noreferrer">
              <button
                  className={`rounded-lg border-2 border-red-500 w-full h-full
                  text-red-500 font-sans leading-tight
                  bg-white hover:bg-red-500 hover:text-red-100 
                  transition-all duration-500 ease-out
                  fill-red-500 hover:fill-red-100 
                  text-xs mobileS:text-sm lg:text-lg
                  `}
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
          :
            <div className='grid grid-cols-6 grid-rows-1 gap-1'>
            <a className="w-full col-span-6"
              href={url}
              target="_blank" rel="noopener noreferrer">
              <button
                  className='rounded-lg border-2 border-red-500 w-full h-full
                  text-red-500 font-sans leading-tight
                  bg-white hover:bg-red-500 hover:text-red-100 
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
    </section>
    )}
