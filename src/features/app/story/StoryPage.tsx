
import React from "react"
import { GetStaticProps } from "next"
import CommonPage from "../../common/components/CommonPage";
import prisma from '../../../../lib/prisma';
import { auth } from "../../../../auth";
import SignIn from "../../management/auth/SignIn";

export default async function StoryPage(): Promise<JSX.Element> {
    const prismares = await prisma.m_story.findMany();

    return (
        <CommonPage>
        <title>{ `サイトについて${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
        <article className="pt-32 pb-48 px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
        <section className="pb-20">
          <SignIn></SignIn>
        <h1 className="text-3xl pb-8 font-bold">テスト</h1>
        <h2 className="text-2xl pb-2 font-bold">
        {prismares.map((res) => (
          <div key={res.storyId} className="text-sm text-gray-500">
            {res.storyTitle}{}
          </div>
        ))}</h2>
       
        </section>
        </article>
        </CommonPage>
      );
  }