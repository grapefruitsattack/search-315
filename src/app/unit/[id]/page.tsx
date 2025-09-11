import { Metadata } from 'next'
import singingMaster from '../../../data/singingMaster.json';
import CommonPage from "../../../features/common/components/CommonPage";
import dynamic from "next/dynamic";
import { Suspense, cache } from "react";
import { auth } from "@/auth";
import { createClient } from '@supabase/supabase-js';
import type { StorySearchResult } from '../../../data/types';
import { MEDIA, CATEGORY, getCategoryByMedia } from '@/features/common/const/StoryInfoConst';

export function generateStaticParams() {
  const idols = singingMaster.filter(data=>data.personFlg===0);
  return idols.map((e)=>{
    return {id: e.singingInfoId}
  });
}

const UnitPage = dynamic(() => import("../../../features/app/unit/UnitPage"), { ssr: true });

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
  const displayPageSize: number = 3;
  const storySearchResult: StorySearchResult[] = [];
  const recentStoryResult: StorySearchResult[] = (await supabase.rpc(
      'search_story_login',
      {
        info_id_array: infoIdArray,
        category_array:getCategoryByMedia(MEDIA.proe.id).map((res)=>res.categoryId),
        voice_type:0,
        howtoview_type:0,
        andor:'or',
        sorted_asc:0,
        page:1,
        page_size:displayPageSize,
        user_id:userId,
        read_later:''
      }
  )).data[0]?.json_data;
  const randStoryResult: StorySearchResult[] = (await supabase.rpc(
      'search_story_login',
      {
        info_id_array: infoIdArray,
        category_array:getCategoryByMedia(MEDIA.moba.id).map((res)=>res.categoryId).concat(getCategoryByMedia(MEDIA.gs.id).map((res)=>res.categoryId)),
        voice_type:0,
        howtoview_type:0,
        andor:'or',
        sorted_asc:2,
        page:1,
        page_size:displayPageSize,
        user_id:userId,
        read_later:''
      }
  )).data[0]?.json_data;
  
  return {result:[{type:'recent',storyData:recentStoryResult},{type:'random',storyData:randStoryResult}], login:session?.user?true:false};
});

  const Units = async ({
    params,
    searchParams,
  }: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ t?:string; }>;
  }) => {
    const { id } = await params;
    const {t} = await searchParams;
    const type: string = t || 'music';
    let result: {type: string; storyData: StorySearchResult[];}[] = [];
    let login: boolean = false;

    // if(type==='story') {
    //   const post = await getData([id],getCategoryByMedia(MEDIA.proe.id).map((res)=>res.categoryId),0,0,'or',0,1,'');
    //   result = post.result;
    //   login = post.login;
    // };

    return (
      <Suspense>
      <CommonPage>
      <UnitPage unitId={id} type={type} result={result} login={login}/>
      </CommonPage>
      </Suspense>
    );
  }
  export default Units;