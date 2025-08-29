
import { cache } from 'react'
import { Suspense } from "react";
import React from "react"
import { createClient } from '@supabase/supabase-js'
import { auth } from "../../../auth";
import { notFound, redirect } from 'next/navigation'
import CommonPage from "@/features/common/components/CommonPage";
import MyPage from "@/features/app/mypage/MyPage";

export default async function Page() {
  const session = await auth();
  const supabaseAccessToken = session?.supabaseAccessToken;
  const login: boolean = session?.user?true:false;
  if (!login) redirect('/auth/signin?callbackUrl=/mypage');

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
  const storyCount = 
    await supabase.from('m_story')
    .select('*', {count: 'exact', head: true})
    .not('url', 'is', null);
  const readStoryCount = 
    await supabase.from('user_reading')
    .select('*', {count: 'exact', head: true})
    .eq('id',session?.user?.id||'')
    .eq('read_later',1);
  // console.log(storyCount.count);
  // console.log(readStoryCount.count);
  const storyCnt: number = storyCount.count||0;
  const readStoryCnt: number = readStoryCount.count||0;

  return (
    <Suspense>
    <CommonPage>
      <article className="pt-32 pb-96 px-2 mobileS:px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
      
      {'マイページ'}
      <div>
      <MyPage storyCnt={storyCnt} readStoryCnt={readStoryCnt}/>
      </div>
      </article>
    </CommonPage>
    </Suspense>
  );
}