"use server"
import React from "react"
import CommonPage from "../../common/components/CommonPage";
import { auth } from "../../../../auth";
import {SignIn,SignOut} from "../../management/auth/SignIn";
import { createClient } from '@supabase/supabase-js'
import type { Story } from '../../../data/types';
import { GetStoryMediaName,GetStoryCategoryName,GetStoryWebsiteName } from '../../common/utils/GetStoryInfomation';
import IdolLabel from '../../common/components/IdolLabel';
import StoryReadingButton from "./components/StoryReadingButton";
import { Suspense } from "react";

export default async function StoryPage({ data }: { data: Story }): Promise<JSX.Element> {
    


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
          <div className="justify-center bg-teal-500 rounded-lg p-1">{GetStoryMediaName(data.media)}</div>
          <div className="justify-center bg-sky-400 rounded-lg p-1">{GetStoryCategoryName(data.category)}</div>
        </section>
        <section className='mb-2 flex flex-col'>
          <div className="text-xl tablet:text-2xl font-mono font-bold inline-block">
              {data.headTitle}
          </div>
          <div className="text-3xl tablet:text-4xl font-mono font-bold inline-block">
              {data.storyTitle}
          </div>
        </section>
        <section className='flex flex-wrap relative text-sm font-mono gap-1 mb-2'>
          {data.info_story.length === 0
            ?<></>
            :data.info_story.filter(data=>data.personFlg===1).map((result, index) => (<div key={index}><IdolLabel singingInfoId={result.infoId}/></div>))}
        </section>
        <Suspense>
        <section className='flex flex-wrap relative text-sm font-mono gap-1 mb-2'>
          {/* @ts-expect-error Server Component */}
          <StoryReadingButton storyId={data.storyId}/>
        </section>
        </Suspense>
        </>
      );
  }