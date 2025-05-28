import { Metadata } from 'next'
import { headers } from "next/headers";
import { notFound } from 'next/navigation'
import React from "react"
import { Suspense } from "react";
import { cache } from 'react'
import dynamic from "next/dynamic";
import { createClient } from '@supabase/supabase-js'
import type { Story } from '../../../data/types';
import CommonPage from "../../../features/common/components/CommonPage";
import StoryPage from "../../../features/app/story/StoryDetailedPage";

export const revalidate = 600; // 10分ごとに再検証する

const getData = cache(async (id: string) => {
  const supabase = createClient(
    process.env.SUPABASE_URL||'',
    process.env.SUPABASE_SERVICE_ROLE_KEY||'', 
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
  //ストーリー情報取得
  const storyData: Story|null = (await supabase.from('m_story').select(`
    storyId,
    media,
    category,
    website,
    headTitle,
    storyTitle,
    releaseDate,
    subCnt,
    voiceAtRelease,
    voice,
    still,
    url,
    relationExists,
    info_story(infoId,personFlg),
    howtoview_story(howToView),
    m_sub_story(
      subStoryId,
      subStoryNo,
      media,
      category,
      subStoryTitle,
      releaseDate,
      voiceAtRelease,
      url,
      info_sub_story(infoId,personFlg)
      )
  `).eq('storyId',id).eq('isValid',1).single()).data;
  if (!storyData) notFound()
  //関連ストーリーが存在するときのみ関連ストーリー情報を取得
  let relationStoryData;
  if(storyData.relationExists == 1){
    relationStoryData = (await supabase.from('relation_story').select(`
      storyId,
      m_story!relationStoryId(
        storyId,
        media,
        category,
        website,
        headTitle,
        storyTitle,
        releaseDate,
        subCnt,
        voiceAtRelease,
        voice,
        still,
        url,
        relationExists,
        info_story(infoId,personFlg),
        howtoview_story(howToView),
        m_sub_story(
          subStoryId,
          subStoryNo,
          media,
          category,
          subStoryTitle,
          releaseDate,
          voiceAtRelease,
          url,
          info_sub_story(infoId,personFlg)
          )
      )
    `).eq('storyId',id)).data;
    if (!relationStoryData) notFound()
  }
  return {storyData,relationStoryData};
})

const SearchStoryPage = dynamic(() => import("../../../features/app/search/SearchStoryPage"), { ssr: true });

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const qparm = searchParams.q;
  const fparm = searchParams.f;
    return (
    <Suspense>
    <CommonPage>
    
    <SearchStoryPage />
      {"テスト"}
      {qparm}
      {fparm}
    </CommonPage>
    </Suspense>
  );
}

export default Page;