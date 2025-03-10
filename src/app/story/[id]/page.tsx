
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
  const { data, error } = await supabase.from('m_story').select('storyId,storyTitle').eq('storyId',id);
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
  //const { id } = await params;
  const { id } = await params
  const post = await getData(id)

  return (
    <article>
      <h1>{post[0].storyTitle}</h1>
      <p>{post[0].storyId}</p>
    </article>
  );
}
export default Post;