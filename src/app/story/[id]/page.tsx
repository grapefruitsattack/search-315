
import { cache } from 'react'
import { Suspense } from "react";
import React from "react";
import { headers } from "next/headers";
//import Redis from 'ioredis';
import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
import { notFound } from 'next/navigation'
import m_story from '@/data/m_story.json';
import relation_story from '@/data/relation_story.json';
import type { StoryTemp,UserReadingData } from '@/data/types';
import CommonPage from "@/features/common/components/CommonPage";
import StoryDetailedPage from "@/features/app/story/StoryDetailedPage";

export const revalidate = 600; // 10分ごとに再検証する

type Post = {
	storyId: string 
};

const getData = cache(async (ids: string[]) => {
  const session = await auth.api.getSession({
      headers: await headers(),
  });
  const login: boolean = session?.user?true:false;
  const supabase = login
    ?await createSupabaseClientWithLogin(session)
    :await createSupabaseClient()
  ;

  let userReadingData: UserReadingData[] = [];
 
  if(login){
    const userId: string
      = session?.user
        ?session.user.id||''
        :'';
    userReadingData = (await supabase.rpc(
      'get_user_reading_from_storyid',
      {
        user_id:userId,story_id_array:ids
      }
    )).data||[];
  }

  return {userReadingData,login};
});

// ページコンポーネント
const Post = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const mainStory:StoryTemp = function(id){
    const mainStory = m_story.find((data)=>data.storyId===id);
    if (!mainStory) notFound()
    return mainStory;
  }(id);
  const relationStoryIds: string[] = relation_story.filter((data)=>data.storyId===mainStory.storyId).map((data)=>data.relationStoryId);
  const post = await getData(relationStoryIds.concat([id]));

  const relationStorysData: { story: StoryTemp; userReadingData: UserReadingData | null; }[] 
    = m_story.filter((data:StoryTemp)=>relationStoryIds.includes(data.storyId))
      .reverse()
      .map((story:StoryTemp)=>{
        return {story:story,userReadingData:post?.userReadingData.find((data)=>data.story_id===story.storyId)||null}
      })
      ;

  return (
    <Suspense>
    <CommonPage>
      <div className="justify-start pc:pt-6 pb-96 px-2 mobileS:px-4 mobileM:px-8 bg-white lg:max-w-[1000px] lg:m-auto font-mono">
        {/* @ts-ignore Server Component */}
        <StoryDetailedPage 
          mainStoryData={{story:mainStory,userReadingData:post?.userReadingData.find((data)=>data.story_id===id)||null}} 
          relationStorysData={relationStorysData} 
          login={post?.login||false}
        />
      </div>
    </CommonPage>
    </Suspense>
  );
}
export default Post;