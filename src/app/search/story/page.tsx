
import React from "react"
import { Suspense } from "react";
import { headers } from "next/headers";
import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
import CommonPage from "@/features/common/components/CommonPage";
import SearchStoryPage from "@/features/app/search/SearchStoryPage";
import {CheckSingingInfoParm,CheckStoryCategoryParm} from "@/features/common/utils/CheckSearchParm";



const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?:string; c?:string; v?:number; htv?:string; pp?:number; andor?:string; rl?:string; order?:string; page?:string; }>;
}) => {
  // パラメータ取得
  const {q} = await searchParams || '';
  const {c} = await searchParams || '';
  const {v} = await searchParams || '';
  const {htv} = await searchParams || '';
  const {pp} = await searchParams || '';
  const {andor} = await searchParams || '';
  const {order} = await searchParams || '';
  const {rl} = await searchParams || '';
  const {page} = await searchParams || '';
  // パラメータ編集
  const infoIdArray: string[] = q===undefined?[]:CheckSingingInfoParm((q).split(' ').filter(s => s !== ''));
  const categoryArray: string[] = c===undefined?[]:CheckStoryCategoryParm(c.split(' ').filter(s => s !== ''));
  const SortedAsc: number = order==='asc'?1:0;
  const pageNum: number = Number(page)||1;

    return (
    <Suspense>
    <CommonPage>
      <title>{ 'ストーリー検索結果 | サーチサイコー'}</title>
      <Suspense fallback={<>{'story loading'}</>}>
      <section className="justify-start px-4 pc:pl-2 pc:pr-12 bg-white lg:m-auto font-mono">

      {/* @ts-ignore Server Component */}
      <SearchStoryPage 
        searchParam={{infoIdArray:infoIdArray,categoryArray:categoryArray,voiceType:Number(v)||0,howtoviewType:Number(htv)||0,ppType:Number(pp)||0,andor:andor||'or',SortedAsc:SortedAsc,page:pageNum,readLaterType:rl||''}
      }/>
      </section>
    </Suspense>
    </CommonPage>
    </Suspense>
  );
}

export default Page;