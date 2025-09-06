import { Metadata } from 'next'
import singingMaster from '../../../data/singingMaster.json';
import CommonPage from "../../../features/common/components/CommonPage";
import dynamic from "next/dynamic";
import { Suspense, cache } from "react";
import { auth } from "../../../../auth";
import { createClient } from '@supabase/supabase-js';
import type { StorySearchResult } from '../../../data/types';

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
  console.log(error)
  const storySearchResult: StorySearchResult[] = data[0]?.json_data;
  const totalCnt: number = data[0]?.total_cnt;
  return {result:storySearchResult, totalCnt:totalCnt, login:session?.user?true:false};
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
    let storyData = 0;
    if(type==='story') storyData = (await getData([id],[],0,0,'or',1,1,'')).totalCnt;


    return (
      <Suspense>
      <CommonPage>
      <UnitPage unitId={id} type={type} storyData={storyData}/>
      </CommonPage>
      </Suspense>
    );
  }
  export default Units;