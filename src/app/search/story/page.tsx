import { Metadata } from 'next'
import { headers } from "next/headers";
import { notFound } from 'next/navigation'
import React from "react"
import { Suspense } from "react";
import { cache } from 'react'
import dynamic from "next/dynamic";
import { createClient } from '@supabase/supabase-js'
import type { StorySearchResult } from '../../../data/types';
import CommonPage from "../../../features/common/components/CommonPage";
import SearchStoryPage from "../../../features/app/search/SearchStoryPage";

export const revalidate = 600; // 10分ごとに再検証する

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    dk?: string;
  }>;
};

const getData = cache(async (
  infoIdArray: string[],
  mediaArray: number[],
  voiceType: number,
  SortedAsc: number
  ) => {
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
  const {data, error} = await supabase.rpc(
    'search_story',
    {info_id_array: infoIdArray,media_array:mediaArray,voicetype:voiceType,andor:'and',sortedasc:SortedAsc});
    console.log(error)
  const storySearchResult: StorySearchResult[] = data;
  return {storySearchResult};
})


const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?: string; f?: string; }>;
}) => {
  const {q} = await searchParams || '';
  const {f} = await searchParams || '';
  const infoIdArray: string[] = q?.split(' ') || [];
  //const fparm = await searchParams.f;
  const post = await getData(infoIdArray,[],0,0);
    return (
    <Suspense>
    <CommonPage>
    
      {/* @ts-expect-error Server Component */}
      <SearchStoryPage data={post.storySearchResult}/>
      {"テスト"}
      {q}
    </CommonPage>
    </Suspense>
  );
}

export default Page;