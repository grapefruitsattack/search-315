
import { cache } from 'react'
import { Suspense } from "react";
import React from "react"
import { createClient } from '@supabase/supabase-js'
import { auth } from "@/auth";
import { notFound, redirect } from 'next/navigation'
import type { StoryCntData } from '@/data/types';
import CommonPage from "@/features/common/components/CommonPage";
import Mypage from "@/features/app/mypage/Mypage";
import MypageTabs from "@/features/app/mypage/components/MypageTabs";
import MypageChart from "@/features/app/mypage/MypageChart";
import {CheckSingingInfoParm} from "@/features/common/utils/CheckSearchParm";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?:string; }>;
}) => {
  const {q} = await searchParams || '';
  const infoIdCheckResult = CheckSingingInfoParm([q||'']);
  const infoId: string = infoIdCheckResult.length<=0?'':infoIdCheckResult[0];

  const session = await auth();
  const supabaseAccessToken = session?.supabaseAccessToken;
  const login: boolean = session?.user?true:false;
  if (!login) redirect('/auth/signin?callbackUrl=/mypage');
  const userId: string | null
    = session?.user
      ?session.user.id||null
      :null;

  const supabase = 
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
    );
    //ストーリー情報取得
    const {data, error} = await supabase.rpc(
        'get_user_reading_cnt',
        {
          user_id:userId,
          info_id:infoId
        }
    );
  const storyCntData: StoryCntData = data[0];
  {all_story_cnt: 1338;
    read_all_story_cnt: 1338;free_story_cnt: 1286; read_free_story_cnt: 1286;res_info_id: '';}
  return (
    <Suspense>
    <CommonPage>
      <title>{ `${'マイページ'} ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
      <article className="pt-32 pb-96 px-2 mobileM:px-8 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
      <Mypage/>
      <MypageTabs type='chart'/>
      <div>
      <MypageChart storyCntData={storyCntData} />
      {/* <MypageChart storyCntData={{all_story_cnt: 1338,read_all_story_cnt: 1330,free_story_cnt: 1286,read_free_story_cnt: 1286,res_info_id: ''}} /> */}
      </div>
      </article>
    </CommonPage>
    </Suspense>
  );
}
export default Page;