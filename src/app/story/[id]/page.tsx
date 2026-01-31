
import { cache } from 'react'
import { Suspense } from "react";
import React from "react";
import { headers } from "next/headers";
//import Redis from 'ioredis';
import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
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
  const session = await auth.api.getSession({
      headers: await headers(),
  });
  const login: boolean = session?.user?true:false;
  const supabase = login
    ?await createSupabaseClientWithLogin(session)
    :await createSupabaseClient()
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
      <div className="justify-start pb-96 px-2 mobileS:px-4 mobileM:px-8 bg-white lg:max-w-[1000px] lg:m-auto font-mono">
        {/* @ts-ignore Server Component */}
        <StoryDetailedPage resultData={post}/>
      </div>
    </CommonPage>
    </Suspense>
  );
}
export default Post;