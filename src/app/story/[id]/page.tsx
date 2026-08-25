
import { cache } from 'react'
import { Suspense } from "react";
import React from "react";
import { headers } from "next/headers";
//import Redis from 'ioredis';
import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
import { notFound } from 'next/navigation'
import m_story from '@/data/m_story.json';
import relation_story_other from '@/data/relation_story_other.json';
import type { Story,UserReadingData,RelationStoryOther } from '@/data/types';
import CommonPage from "@/features/common/components/common/CommonPage";
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
  const mainStory:Story = function(id){
    const mainStory = m_story.find((data)=>data.storyId===id);
    if (!mainStory) notFound()
    return mainStory;
  }(id);
  const relationStoryIds: string[] = mainStory.relation;
  const post = await getData(relationStoryIds.concat([id]));
  const relationStorysData: { story: Story; userReadingData: UserReadingData | null; }[] 
    = relationStoryIds.map(relationStoryId=>m_story.find(data=>data.storyId===relationStoryId))
    .map((story)=>{
      return {story:story,userReadingData:post?.userReadingData.find((data)=>data.story_id===story?.storyId)||null}
    }) as { story: Story; userReadingData: UserReadingData | null; }[] 
  ;
  const relationOther: RelationStoryOther[] = relation_story_other.filter(data=>data.storyId===mainStory.storyId&&data.storyPageDisplay===1);

  return (
    <Suspense>
    <CommonPage>
      <div className="justify-start pc:pt-6 pb-24 mb-24 tablet:mb-64 px-1 mobileS:px-2 mobileM:px-4 tablet:px-8 lg:px-8 bg-white lg:max-w-[1000px] lg:m-auto font-mono">
        {/* @ts-ignore Server Component */}
        <StoryDetailedPage 
          mainStoryData={{story:mainStory,userReadingData:post?.userReadingData.find((data)=>data.story_id===id)||null}} 
          relationStorysData={relationStorysData} 
          relationOtherData={relationOther}
          login={post?.login||false}
        />
      </div>
    </CommonPage>
    </Suspense>
  );
}
export default Post;