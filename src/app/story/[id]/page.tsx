
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
import type { Story } from '../../../data/types';
import CommonPage from "../../../features/common/components/CommonPage";
import StoryPage from "../../../features/app/story/StoryPage";

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
  const { data, error } = await supabase.from('m_story').select(`
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
    info_story(infoId,personFlg)
  `).eq('storyId',id).single();
  if (!data) notFound()
  return data
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
  const post :Story = await getData(id);
  return (
    <Suspense>
    <CommonPage>
      <article className="pt-32 pb-96 px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">

      {/* @ts-expect-error Server Component */}
      <StoryPage data={post}/>
      </article>
    </CommonPage>
    </Suspense>
  );
}
export default Post;