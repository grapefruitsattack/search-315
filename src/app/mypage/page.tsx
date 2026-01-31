
import { cache } from 'react'
import { Suspense } from "react";
import React from "react"
import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
import { headers } from "next/headers";
import { notFound, redirect } from 'next/navigation'
import type { UserChartData } from '@/data/types';
import CommonPage from "@/features/common/components/CommonPage";
import Mypage from "@/features/app/mypage/Mypage";
import MypageTabs from "@/features/app/mypage/components/MypageTabs";
import MypageChart from "@/features/app/mypage/MypageChart";
import { conversionUserChartData } from "@/features/common/utils/mypage/conversionDataUtils";

export default async function Page() {
  const session = await auth.api.getSession({
      headers: await headers(),
  });
  const login: boolean = session?.user?true:false;
  if (!login) redirect('/auth/signin?callbackUrl=/mypage');
  const userId: string | null
    = session?.user
      ?session.user.id||null
      :null;
  const supabase = await createSupabaseClientWithLogin(session);
  //ストーリー情報取得
  const {data, error} = await supabase.rpc(
      'get_user_chart_data',
      {
        user_id:userId
      }
  );
  const userChartData: UserChartData[] = data;

  return (
    <Suspense>
    <CommonPage>
    <title>{ `${'マイページ'} ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
      <article className=" pb-96 px-2 mobileS:px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
      <Mypage/>
      <MypageTabs type='chart'/>
      <div>
      <MypageChart userChartData={conversionUserChartData(userChartData)} />
      </div>
      </article>
    </CommonPage>
    </Suspense>
  );
}