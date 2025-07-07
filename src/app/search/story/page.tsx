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
  categoryArray: string[],
  voiceType: number,
  howtoviewType: number,
  andor: string,
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
      {
        info_id_array: infoIdArray,
        media_array:mediaArray,
        category_array:categoryArray,
        voice_type:voiceType,
        howtoview_type:howtoviewType,
        andor:andor,
        sortedasc:SortedAsc
      }
  );
  const storySearchResult: StorySearchResult[] = data;
  return {storySearchResult};
})


const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?: string; m?: string; c?: string; v?: number; htv?: number; andor?: string; order?: string; }>;
}) => {
  // パラメータ取得
  const {q} = await searchParams || '';
  const {m} = await searchParams || '';
  const {c} = await searchParams || '';
  const {v} = await searchParams || '';
  const {htv} = await searchParams || '';
  const {andor} = await searchParams || '';
  const {order} = await searchParams || '';
  // パラメータ編集
  const infoIdArray: string[] = q===undefined?[]:q.split(' ').filter(s => s !== '');
  const mediaArray: number[] = m===undefined?[]:m.split(' ').map(Number).filter(s => s !== 0);
  const categoryArray: string[] = c===undefined?[]:c.split(' ').filter(s => s !== '');
  const SortedAsc: number = order==='asc'?1:0;
  //TODO パラメータ確認

  // 検索結果取得
  const post = await getData(infoIdArray,mediaArray,categoryArray,v||0,htv||0,andor||'or',SortedAsc);

    return (
    <Suspense>
    <CommonPage>
      {/* @ts-expect-error Server Component */}
      <SearchStoryPage data={post.storySearchResult}/>
      {q}
    </CommonPage>
    </Suspense>
  );
}

export default Page;