
import { headers } from "next/headers";
import dynamic from "next/dynamic";
import React from "react"
import { Suspense } from "react";
import { cache } from 'react'
import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
import type { StorySearchResult } from '@/data/types';
import CommonPage from "@/features/common/components/CommonPage";
import SearchStoryPage from "@/features/app/search/SearchStoryPage";
import {CheckSingingInfoParm,CheckStoryCategoryParm} from "@/features/common/utils/CheckSearchParm";

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
  categoryArray: string[],
  voiceType: number,
  howtoviewType: number,
  andor: string,
  SortedAsc: number,
  page: number,
  readLater: string
  ) => {
  const session = await auth.api.getSession({
      headers: await headers(),
  });
  const supabase = session?.user
    ?await createSupabaseClientWithLogin(session)
    :await createSupabaseClient()
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
        user_id:userId,
        read_later:readLater
      }
  );
  const storySearchResult: StorySearchResult[] = data[0]?.json_data;
  const totalCnt: number = data[0]?.total_cnt;
  return {result:storySearchResult, totalCnt:totalCnt, login:session?.user?true:false};
})


const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?:string; c?:string; v?:number; htv?:string; andor?:string; rl?:string; order?:string; page?:string; }>;
}) => {
  // パラメータ取得
  const {q} = await searchParams || '';
  const {c} = await searchParams || '';
  const {v} = await searchParams || '';
  const {htv} = await searchParams || '';
  const {andor} = await searchParams || '';
  const {order} = await searchParams || '';
  const {rl} = await searchParams || '';
  const {page} = await searchParams || '';
  // パラメータ編集
  const infoIdArray: string[] = q===undefined?[]:CheckSingingInfoParm((q).split(' ').filter(s => s !== ''));
  const categoryArray: string[] = c===undefined?[]:CheckStoryCategoryParm(c.split(' ').filter(s => s !== ''));
  const SortedAsc: number = order==='asc'?1:0;
  const pageNum: number = Number(page)||1;

  // 検索結果取得
  const post = await getData(infoIdArray,categoryArray,v||0,Number(htv)||0,andor||'or',SortedAsc,pageNum,rl||'');

  // ページネーション
  const pageSize: number = 18;
  const maxPage: number = Math.ceil(post.totalCnt/pageSize);

    return (
    <Suspense>
    <CommonPage>
      <title>{ 'ストーリー検索結果 | サーチサイコー'}</title>
      <Suspense fallback={<>{'story loading'}</>}>
      <section className="justify-start pb-96 px-2 mobileS:px-4 mobileM:px-8 bg-white lg:max-w-[1500px] lg:m-auto font-mono">

      {/* @ts-ignore Server Component */}
      <SearchStoryPage data={post}/>
      </section>
    </Suspense>
    </CommonPage>
    </Suspense>
  );
}

export default Page;