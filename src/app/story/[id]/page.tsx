
import { Metadata } from 'next'
import { cache } from 'react'
import dynamic from "next/dynamic";
import { Suspense } from "react";
import React from "react"
import { GetStaticProps, GetStaticPaths } from "next"
//import StoryPage from "../../features/app/story/StoryPage";
//import prisma from '../../../lib/prisma';
import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Story, RelationStory } from '../../../data/types';
import CommonPage from "../../../features/common/components/CommonPage";
import StoryPage from "../../../features/app/story/StoryDetailedPage";

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
  const storyData: Story|null = (await supabase.from('m_story').select(`
    storyId,
    media,
    category,
    website,
    headTitle,
    storyTitle,
    releaseDate,
    subCnt,
    voiceAtRelease,
    voice,
    still,
    url,
    relationExists,
    info_story(infoId,personFlg),
    howtoview_story(howToView),
    m_sub_story(
      subStoryId,
      subStoryNo,
      media,
      category,
      subStoryTitle,
      releaseDate,
      voiceAtRelease,
      url,
      info_sub_story(infoId,personFlg)
      )
  `).eq('storyId',id).eq('isValid',1).single()).data;
  if (!storyData) notFound()
  //関連ストーリーが存在するときのみ関連ストーリー情報を取得
  let relationStoryData: RelationStory[]|null = []
  if(storyData.relationExists == 1){
    relationStoryData = (await supabase.from('relation_story').select(`
      storyId,
      m_story!relationStoryId(
        storyId,
        media,
        category,
        website,
        headTitle,
        storyTitle,
        releaseDate,
        subCnt,
        voiceAtRelease,
        voice,
        still,
        url,
        relationExists,
        info_story(infoId,personFlg),
        howtoview_story(howToView),
        m_sub_story(
          subStoryId,
          subStoryNo,
          media,
          category,
          subStoryTitle,
          releaseDate,
          voiceAtRelease,
          url,
          info_sub_story(infoId,personFlg)
          )
      )
    `).eq('storyId',id)).data;
    if (!relationStoryData) notFound()
  }
  return {storyData,relationStoryData};
})

// 動的ルートのパラメータを生成して、デプロイ時にファイルを生成する
// export async function generateStaticParams() {

//   const data = await getData('id')||[];

//   return data.map((post) => ({
//     id: post.storyId.toString(),
//   }));
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: { id: string };
// }): Promise<Metadata> {
//   const res = await fetch('https://api.example.com/posts/${id}');
//   const posts: Post[] = await res.json();

//   return {
//     // メタデータ
//   };
// }

// ページコンポーネント
const Post = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const post :{ storyData: Story; relationStoryData: RelationStory[] } = await getData(id);
  return (
    <Suspense>
    <CommonPage>
      <article className="pt-32 pb-96 px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">

      {/* @ts-expect-error Server Component */}
      <StoryPage data={post.storyData}/>
      </article>
    </CommonPage>
    </Suspense>
  );
}
export default Post;