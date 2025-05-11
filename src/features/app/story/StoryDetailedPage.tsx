"use server"
import React from "react"
import CommonPage from "../../common/components/CommonPage";
import { auth } from "../../../../auth";
import {SignIn,SignOut} from "../../management/auth/SignIn";
import { createClient } from '@supabase/supabase-js'
import type { Story,RelationStory } from '../../../data/types';
import { GetStoryMediaName,GetStoryCategoryName,GetStoryWebsiteName } from '../../common/utils/GetStoryInfomation';
import IdolLabel from '../../common/components/IdolLabel';
import StoryReadingButton from "./components/StoryReadingButton";
import { Suspense } from "react";
import StoryBlock from "../../common/components/story/StoryBlock";

export default async function StoryPage(
  { data }: { data: {storyData: Story; relationStoryData: RelationStory[];} }): Promise<JSX.Element> 
{


    return (
        <>
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
        <section className='flex flex-wrap relative text-sm tablet:text-xl font-mono text-white gap-1 mb-2'>
          <div className="justify-center bg-teal-500 rounded-lg p-1">{GetStoryMediaName(data.storyData.media)}</div>
          <div className="justify-center bg-sky-400 rounded-lg p-1">{GetStoryCategoryName(data.storyData.category)}</div>
        </section>
        <section className='mb-2 flex flex-col'>
          <div className="text-xl tablet:text-2xl font-mono font-bold inline-block">
              {data.storyData.headTitle}
          </div>
          <div className="text-3xl tablet:text-4xl font-mono font-bold inline-block">
              {data.storyData.storyTitle}
          </div>
        </section>
        <section className='flex flex-wrap relative text-sm font-mono gap-1 mb-2'>
          {data.storyData.info_story.length === 0
            ?<></>
            :data.storyData.info_story.filter(data=>data.personFlg===1).map((result, index) => (<div key={index}><IdolLabel singingInfoId={result.infoId}/></div>))}
        </section>
        <Suspense>
        <section className='flex flex-wrap relative text-sm font-mono gap-1 mb-2'>
          {/* @ts-expect-error Server Component */}
          <StoryReadingButton storyId={data.storyData.storyId}/>
        </section>
        </Suspense>

        {/* 関連ストーリー */}
        <div 
            className="
                mobileL:text-2xl text-xl font-mono flex items-center w-full
                after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
                
            "
        >
            <svg className="fill-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M20 3V17C20 19.2091 18.2091 21 16 21C13.7909 21 12 19.2091 12 17C12 14.7909 13.7909 13 16 13C16.7286 13 17.4117 13.1948 18 13.5351V5H9V17C9 19.2091 7.20914 21 5 21C2.79086 21 1 19.2091 1 17C1 14.7909 2.79086 13 5 13C5.72857 13 6.41165 13.1948 7 13.5351V3H20ZM5 19C6.10457 19 7 18.1046 7 17C7 15.8954 6.10457 15 5 15C3.89543 15 3 15.8954 3 17C3 18.1046 3.89543 19 5 19ZM16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z"></path></svg>
            {'別のバージョン'}
        </div>
        <section className={`
            items-start gap-4 grid-cols-1 lg:grid-cols-3 mt-5
            lg:grid grid       
        `}>
        {data.relationStoryData.map((result, index) => (
        <StoryBlock 
          key={index} 
          storyId={result.m_story.storyId}
          media={result.m_story.media}
          category={result.m_story.category}
          storyTitle={result.m_story.storyTitle}
          url={result.m_story.url}
        />
        ))}
        </section>
        </>
      );
  }