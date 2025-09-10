
import { cache } from 'react'
import { Suspense } from "react";
import React from "react"
//import Redis from 'ioredis';
import { createClient } from '@supabase/supabase-js'
import { auth } from "../../../../auth";
import { notFound } from 'next/navigation'
import type { Story } from '../../../data/types';
import CommonPage from "../../../features/common/components/CommonPage";
import StoryDetailedPage from "../../../features/app/story/StoryDetailedPage";

export const revalidate = 600; // 10分ごとに再検証する

type Post = {
	storyId: string 
};

type Props = {
  params: { id: string }
};

const getData = cache(async (id: string) => {
  const session = await auth();
  const supabaseAccessToken = session?.supabaseAccessToken;
  const login: boolean = session?.user?true:false;
  const supabase = login
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
  //ストーリー情報取得
  //const client = new Redis(process.env.REDIS_URL||'');
  let cached: string | null;
  let storyData: Story;
  // try {
  //   cached = await client.get('story_'+id);
  // } catch (error) {
  //   cached = null;
  // };
  // if (cached) {
  //   storyData = JSON.parse(cached);
  // }else{
    const {data, error} = (await supabase.from('m_story_json_data').select(`
    story_id,
    json_data,
    created_at
    `).eq('story_id',id).single());
    if (!data) notFound()
    storyData = data?.json_data;
    
    //if (storyData) await client.setex('story_'+id, 600, JSON.stringify(storyData));
  //}

  if (!storyData) notFound()

  let isRead: boolean = false;
  let isReadLeater: boolean = false;
 
  if(login){
    const userId: string
      = session?.user
        ?session.user.id||''
        :'';
    const userReadingData: {
        id: any;
        story_id: any;
        reading_date: any;
        read_later: any;
    } | null
    = (await supabase.from("user_reading")
      .select("id,story_id,reading_date,read_later")
      .eq('story_id',storyData.storyId).eq('id',userId).single()).data
      ||null;
    isRead = userReadingData!==null&&userReadingData?.read_later!==null&&userReadingData.read_later===0;
    isReadLeater = userReadingData!==null&&userReadingData?.read_later!==null&&userReadingData.read_later===1;
  }
  return {storyData,login,isRead,isReadLeater};
});

// ページコンポーネント
const Post = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const post = await getData(id);

  return (
    <Suspense>
    <CommonPage>
      <article className="pt-32 pb-96 px-2 mobileS:px-4 mobileM:px-8 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
      {/* @ts-ignore Server Component */}
      <StoryDetailedPage resultData={post}/>
      </article>
    </CommonPage>
    </Suspense>
  );
}
export default Post;