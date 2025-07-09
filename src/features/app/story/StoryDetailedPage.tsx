"use server"
import React from "react"
import CommonPage from "../../common/components/CommonPage";
import CopyButton from "../../common/components/CopyButton";
import GetUnitIdolName from "../../common/utils/GetUnitIdolName";
import {ShareModal} from "../../app/shareModal/ShareModal";
import { auth } from "../../../../auth";
import {SignIn,SignOut} from "../../management/auth/SignIn";
import { createClient } from '@supabase/supabase-js'
import type { Story } from '../../../data/types';
import { GetStoryMediaName,GetStoryCategoryName,GetStoryWebsiteName,GetVoiceStateName,GetStoryHowtoviewName } from '../../common/utils/Story/GetStoryInfomation';
import IdolBadge from '../../common/components/IdolBadge';
import StoryReadingButton from "./components/StoryReadingButton";
import { Suspense } from "react";
import StoryBlock from "../../common/components/story/StoryBlock";
import { motion } from "framer-motion";

export default async function StoryDetailedPage(
  { data }: { data: Story;}): Promise<JSX.Element> 
{
  const websiteName: string = GetStoryWebsiteName(data.website);
  const voiceStateName: string = GetVoiceStateName(data.voice,data.voiceAtRelease);
  const mediaName: string = GetStoryMediaName(data.media);
  const categoryName: string = GetStoryCategoryName(data.category);
  data.howtoviewStory
    return (
        <>
        <title>{  `${data.storyTitle} ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
        <section className="mb-2 bg-gradient-to-r from-green-500/70 from-50% rounded">
            <div 
                className="
                    flex items-center w-full ml-2
                    text-2xl font-mono
                    text-white
                    cursor-pointer lg:cursor-auto 
                     gap-2
                ">
              <svg className="fill-green-500 bg-white rounded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path></svg>
              <p className="pr-2">
                {'ストーリー'}
              </p>
            </div>
        </section>
        <section className='flex flex-wrap relative text-sm tablet:text-xl font-mono font-bold text-white gap-1 mb-1'>
          <div className="justify-center bg-sky-400 rounded-lg p-1">{categoryName}</div>
          <div className="justify-center bg-teal-500 rounded-lg p-1">{mediaName}</div>
        </section>

        <section className='flex flex-wrap relative text-xs tablet:text-sm font-mono text-white gap-1 mb-1'>
        {voiceStateName===''
        ?<></>
        :<div className="justify-center text-red-500 border border-red-500 rounded-sm p-1">{voiceStateName}</div>
        }
        {data.still===0
        ?<></>
        :<div className="justify-center text-red-500 border border-red-500 rounded-sm p-1">{'スチル'+data.still+'枚'}</div>
        }
        </section>

        {data.website!=='asb' || data.howtoviewStory===null || data.howtoviewStory.length===0
        ?<></>
        :<section className='w-fit rounded-sm text-xs tablet:text-sm font-mono text-black gap-1 mb-2 bg-orange-200'>
          <a className=" text-black p-1">{'視聴方法：'}</a>
          {data.howtoviewStory.map((result, index) => (
          <a key={index} className="text-orange-800 p-1">{GetStoryHowtoviewName(result)}</a>
          ))}
        {/* {data.howtoviewStory.length===0
        ?<a className=" text-orange-800 p-1">{'ログイン不要'}</a>
        :<>
        {data.howtoviewStory.map((result, index) => (
        <a key={index} className="text-orange-800 p-1">{GetStoryHowtoviewName(result)}</a>
        ))}</>
        } */}
        </section>
        }
        

        <section className='mb-2 flex flex-col'>
          <div className="text-base mobileM:text-xl tablet:text-2xl font-mono font-bold inline-block">
              {data.headTitle}
          </div>
          <div className="text-2xl mobileM:text-3xl tablet:text-4xl font-mono font-bold inline-block">
              {data.storyTitle}
          </div>
        </section>

        {/* ボタン */}
        <div className='
            grid grid-cols-2 mt-4 gap-y-[5px] 
            lg:w-1/2 
        '>
          <CopyButton 
              copyText={data.storyTitle} 
              buttonText={'タイトルコピー'}
              tootipText={'タイトルをコピーしました'}
              placement='bottom'
          />
        </div>
        {data.url===null || data.url===''
        ?<></>
        :
        <section className=''>
        <a className="w-full transition-opacity duration-300 hover:opacity-20"
      href={data.url}
      target="_blank" rel="noopener noreferrer">
          <div className='
              flex flex-wrap justify-center items-center font-sans font-black 
              mobileM:my-0.5 my-1
          '>
              {websiteName+'で読む'}
              <span className="">
              <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
              </span>

          </div>
    </a>
        </section>
        }

      <div 
        className="
            mobileL:text-2xl text-xl font-mono flex items-center w-full
            after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
            mt-5
        "
        >{'登場アイドル'}
        </div>
        <section className='flex flex-wrap relative text-sm font-mono gap-1 mb-2'>
          {data.infoStory.length === 0
            ?<></>
            :data.infoStory.filter(data=>data.personFlg===1).map(
              (result, index) => (<div key={index}><IdolBadge id={result.infoId} useShortName={0} size={'normal'}/></div>))
            }
        </section>


        <Suspense>
        <section className='flex flex-wrap relative text-sm font-mono gap-1 mb-2'>
          {/* @ts-expect-error Server Component */}
          <StoryReadingButton storyId={data.storyId}/>
        </section>
        </Suspense>

        
        {/* サブストーリー */}
        {data.mSubStory===null || data.mSubStory.length===0
        ?<></>
        :<>
        <div 
          className="
              mobileL:text-2xl text-xl font-mono flex items-center w-full
              after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
              mt-5
          "
        >
          <svg className="fill-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
          <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path></svg>
          {''}
        </div>
          <section className={`
              items-start gap-2 grid-cols-1 mt-2
              grid max-w-[700px]
          `}>
            {data.mSubStory.map((result, index) => (
            <div key={Number(result.subStoryNo)} className="bg-white border-orange-700/30 border-t-4 border-l-4 bg-orange-50/50 text-xl">
              <div className=" text-xl ">
              {/* モバエム雑誌のときのみアイドル名を表示 */}
              {data.media === 1 && ['comicn','comics'].includes(data.category) && !(result.infoSubStory===null || result.infoSubStory.length===0)
              &&
                <div className={`w-fit`}>
                <IdolBadge id={result.infoSubStory[0].infoId} useShortName={0} size={'block'}/>
                </div>
              }
                {result.subStoryTitle}
              </div>
              {/* サブストーリーボタン部  */}
              <div className='
                  grid grid-cols-5 mt-1 gap-[5px] 
                  
              '>
                <div className='col-span-3'>
                    <a className=""
                    href={result.url}
                    target="_blank" rel="noopener noreferrer">
                        <button
                            className='rounded-lg border-2 border-red-500 w-full h-full
                            text-red-500 font-sans leading-tight
                            hover:bg-red-500 hover:text-red-100 
                            transition-all duration-500 ease-out
                            fill-red-500 hover:fill-red-50 
                            text-sm mobileL:text-base lg:text-lg
                            '
                        >
                            <div className='
                              flex flex-wrap justify-center items-center font-sans font-black 
                              mobileM:my-0.5 my-1 
                            '>
                                {websiteName}
                                <span className="">
                                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                                </span>
                            </div>
                        </button>
                    </a>
                </div>
                <div>
                  <ShareModal 
                    shareUrl={result.url}
                    shareSiteTitle={websiteName}
                    shareText={`${data.media === 1&&data.category==='dof'?'':'【'+categoryName+'】'}${data.storyTitle}${
                      data.media === 1 && ['comicn','comics'].includes(data.category) && !(result.infoSubStory===null || result.infoSubStory.length===0)
                      ?'　'+GetUnitIdolName(result.infoSubStory[0].infoId,0,1):''
                    }「${result.subStoryTitle}」`}
                    buttonText=""
                    pass={'story/'+data.storyId}
                  />
                </div>
                <CopyButton 
                    copyText={result.subStoryTitle} 
                    buttonText={''}
                    tootipText={'タイトルをコピーしました'}
                    placement='bottom'
                />
              </div>
            </div>
            ))}

          </section>

        </>}

        {/* 関連ストーリー */}
        {data.relationStory===null || data.relationStory.length===0
        ?<></>
        :<>
          <div 
            className="
                mobileL:text-2xl text-xl font-mono flex items-center w-full
                after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
                mt-5
            "
          >
            <svg className="fill-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
            <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path></svg>
            {'関連ストーリー'}
          </div>
          <section className={`
              items-start gap-4 grid-cols-1 lg:grid-cols-2 mt-2
              lg:grid grid       
          `}>
            {data.relationStory.map((result, index) => (
            <StoryBlock 
              key={index} 
              storyId={result.storyId} 
              media={result.media} 
              category={result.category} 
              headTitle={result.headTitle} 
              storyTitle={result.storyTitle} 
              infoStory={result.infoStory} 
              url={result.url} 
            />
            ))}

          </section>
        </>
        }

        </>
      );
  }