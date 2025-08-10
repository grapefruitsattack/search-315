
import { auth } from "../../../../auth";
import React from "react"
import { Suspense } from "react";
import { cache } from 'react'
import { createClient } from '@supabase/supabase-js'
import type { StorySearchResult } from '../../../data/types';
import CommonPage from "../../../features/common/components/CommonPage";
import SearchStoryPage from "../../../features/app/search/SearchStoryPage";
import Loading from '../../loading'

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
  SortedAsc: number,
  page: number,
  ) => {
  const session = await auth();
  const supabaseAccessToken = session?.supabaseAccessToken;
  const supabase = session?.user
    ?
      createClient(
        process.env.SUPABASE_URL||'',
        process.env.SUPABASE_ANON_KEY||'',
        {
          global: {
            headers: {
              Authorization: `Bearer ${supabaseAccessToken}`,
            },
          },
        }
      )
    :
      createClient(
        process.env.SUPABASE_URL||'',
        process.env.SUPABASE_ANON_KEY||'',
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      )
  ;
  const userId: string | null
    = session?.user
      ?session.user.id||null
      :null;
  //ストーリー情報取得
  const displayPageSize: number = 18;
  const {data, error} = await supabase.rpc(
      'search_story_login',
      {
        info_id_array: infoIdArray,
        category_array:categoryArray,
        voice_type:voiceType,
        howtoview_type:howtoviewType,
        andor:andor,
        sorted_asc:SortedAsc,
        page:page,
        page_size:displayPageSize,
        user_id:userId
      }
  );
  const storySearchResult: StorySearchResult[] = data[0]?.json_data;
  return {result:storySearchResult, login:session?.user?true:false};
})


const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?: string; m?: string; c?: string; v?: number; htv?: number; andor?: string; order?: string; page?: string; }>;
}) => {
  // パラメータ取得
  const {q} = await searchParams || '';
  const {m} = await searchParams || '';
  const {c} = await searchParams || '';
  const {v} = await searchParams || '';
  const {htv} = await searchParams || '';
  const {andor} = await searchParams || '';
  const {order} = await searchParams || '';
  const {page} = await searchParams || '';
  // パラメータ編集
  const infoIdArray: string[] = q===undefined?[]:q.split(' ').filter(s => s !== '');
  const mediaArray: number[] = m===undefined?[]:m.split(' ').map(Number).filter(s => s !== 0);
  const categoryArray: string[] = c===undefined?[]:c.split(' ').filter(s => s !== '');
  const SortedAsc: number = order==='asc'?1:0;
  const pageNum: number = Number(page)||1;
  //TODO パラメータ確認

  // 検索結果取得
  const post = await getData(infoIdArray,mediaArray,categoryArray,v||0,htv||0,andor||'or',SortedAsc,pageNum);

    return (
    <Suspense fallback={<Loading />}>
    <CommonPage>
      {/* @ts-expect-error Server Component */}
      <SearchStoryPage data={post}/>
    </CommonPage>
    </Suspense>
  );
}

export default Page;