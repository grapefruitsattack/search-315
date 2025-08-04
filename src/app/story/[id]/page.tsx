
import { cache } from 'react'
import { Suspense } from "react";
import React from "react"
import { createClient } from '@supabase/supabase-js'
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
  const supabase = createClient(
    process.env.SUPABASE_URL||'',
    process.env.SUPABASE_ANON_KEY||'',
  )
  //ストーリー情報取得
  const {data, error} = (await supabase.from('m_story_json_data').select(`
  story_id,
  json_data
  `).eq('story_id',id).single());
  if (!data) notFound()
  const storyData: Story = data?.json_data;
  
  if (!storyData) notFound()
 
  return {storyData};
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
      <article className="pt-32 pb-96 px-2 mobileS:px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
      {/* @ts-expect-error Server Component */}
      <StoryDetailedPage storyData={post.storyData}/>
      </article>
    </CommonPage>
    </Suspense>
  );
}
export default Post;