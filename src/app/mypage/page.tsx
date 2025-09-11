
import { cache } from 'react'
import { Suspense } from "react";
import React from "react"
import { createClient } from '@supabase/supabase-js'
import { auth } from "@/auth";
import { notFound, redirect } from 'next/navigation'
import type { StoryCntData } from '@/data/types';
import CommonPage from "@/features/common/components/CommonPage";
import MypageChart from "@/features/app/mypage/MypageChart";

export default async function Page() {
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
        info_id:''
      }
  );
  const storyCntData: StoryCntData = data[0];
  return (
    <Suspense>
    <CommonPage>
    <title>{ `${'マイページ'} ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
      <article className="pt-32 pb-96 px-2 mobileS:px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
      
      {'マイページ'}
      <div>
      <MypageChart storyCntData={storyCntData} />
      </div>
      </article>
    </CommonPage>
    </Suspense>
  );
}