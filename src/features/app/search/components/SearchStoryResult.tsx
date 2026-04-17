
import { headers } from "next/headers";
import React from "react"
import { Suspense } from "react";
import { cache } from 'react'
import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
import CommonPage from "@/features/common/components/CommonPage";
import SearchStoryPage from "@/features/app/search/SearchStoryPage";
import {CheckSingingInfoParm,CheckStoryCategoryParm} from "@/features/common/utils/CheckSearchParm";
import type { StorySearchResult } from '@/data/types';
import SearchStoryController from "./SearchStoryController";
import SortButton from "./SortButton";
import StoryBlock from "../../../common/components/story/StoryBlock";
import Pagination from "../../../common/components/Pagination";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton"
import { Toaster } from 'sonner';

async function getData(
  searchParam:{infoIdArray: string[]; categoryArray: string[]; voiceType: number; howtoviewType: number; ppType: number; andor: string; SortedAsc: number; page: number; readLater: string;}
  ):Promise<{
    result: StorySearchResult[],totalCnt: number,login:boolean
  }>
{
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
        info_id_array: searchParam.infoIdArray,
        category_array:searchParam.categoryArray,
        voice_type:searchParam.voiceType,
        howtoview_type:searchParam.howtoviewType,
        andor:searchParam.andor,
        pp_type:searchParam.ppType,
        sorted_asc:searchParam.SortedAsc,
        page:searchParam.page,
        page_size:displayPageSize,
        user_id:userId,
        read_later:searchParam.readLater
      }
  );
  const storySearchResult: StorySearchResult[] = data!==null?data[0]?.json_data:[];
  const totalCnt: number = data!==null?data[0]?.total_cnt:0;
  //return {result:storySearchResult, totalCnt:totalCnt, login:session?.user?true:false};
  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve(
        {result:storySearchResult, totalCnt:totalCnt, login:session?.user?true:false}
      );
    }, 500); // ある程度の時間をローディング表示
  });
}

export default async function SearchStoryResult({ searchParam }: { searchParam:{infoIdArray: string[]; categoryArray: string[]; voiceType: number; howtoviewType: number; ppType: number; andor: string; SortedAsc: number; page: number; readLater: string;} }) {

  const post = await getData(searchParam);
  const resultData:StorySearchResult[] = post.result;
  const totalCnt:number = post.totalCnt;
  const login:boolean = post.login;

  // ページネーション
  const pageSize: number = 18;
  const maxPage: number = Math.ceil(totalCnt/pageSize);

  return (
  <>
    <div className="mx-auto  gap-4">
      <div className="mx-auto"><Pagination totalPage={maxPage}/></div>
    </div>
    {/* ストーリー一覧 */}
    <div className="lg:flex px-2 mobileM:px-8 tablet:px-4 w-full">
      <div className="grid grid-flow-row-dense items-start gap-4 grid-cols-1 w-full">
        <>
          {resultData === null || resultData.length===0 
          ?
          <div className="flex flex-col justify-center items-start ">
            {/* // TODO アラート化 */}
            <div>検索条件に該当するストーリーがありません</div>
            <div>検索条件を変更してください</div>
          </div>
          :resultData.map((data, index) => (
          <StoryBlock 
            key={index} 
            storyId={data.story_id}
            category={data.category}
            website={data.website}
            headTitle={data.head_title}
            infoStory={data.info_id}
            howtoviewStory={data.howtoview_story}
            media={data.media}
            storyTitle={data.story_title}
            url={data.url}
            pp={data.pp}
            login={login}
            userReadLater={data.user_read_later}
            displayLogin={true}
          />
          ))}
        </>
      </div>
    </div>
    <div className="lg:px-24 px-2 mobileS:px-8 pt-4 flex flex-wrap items-center gap-4">
      <Pagination totalPage={maxPage} scrollAreaElementId='storyScrollArea'/>
    </div>
  </>
  );
}