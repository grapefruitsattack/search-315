
import React from "react"
import CommonPage from "../../common/components/CommonPage";
import { auth } from "../../../../auth";
import {SignIn,SignOut} from "../../management/auth/SignIn";
import { createClient } from '@supabase/supabase-js'

export default async function StoryPage(): Promise<JSX.Element> {
    
    const session = await auth();
    const supabaseAccessToken = session?.supabaseAccessToken;
    const supabase = createClient(
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
    const { data, error } = await supabase.from("users").select("*");
    console.log(data)
    console.log(error)
    const post = data||[];
 

    return (
        <CommonPage>
        <title>{ `サイトについて${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
        <article className="pt-32 pb-48 px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
        <section className="pb-20">
          <div className="">
          {session?.user
              ?<><SignOut></SignOut>{session.user.id} : {session.user.email} {post[0].id} </>
              :<SignIn></SignIn>}
      </div>
        <h1 className="text-3xl pb-8 font-bold">テスト</h1>
        {/* <h2 className="text-2xl pb-2 font-bold">
        {prismares.map((res) => (
          <div key={res.storyId} className="text-sm text-gray-500">
            {res.storyTitle}{}
          </div>
        ))}</h2> */}
       
        </section>
        </article>
        </CommonPage>
      );
  }