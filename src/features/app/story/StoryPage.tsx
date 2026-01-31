
import React from "react"
import CommonPage from "../../common/components/CommonPage";
import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
import { headers } from "next/headers";
import {SignIn,SignOut} from "../../management/auth/SignIn";

export default async function StoryPage(): Promise<JSX.Element> {
  const h = await headers();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const supabaseAccessToken = session?.session.token;
  const supabase = session?.user
    ?await createSupabaseClientWithLogin(session)
    :await createSupabaseClient()
  ;
  const { data, error } = await supabase.from("users").select("*");

    const post = data||[];
 

    return (
        <CommonPage>
        <title>{ `サイトについて${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
        <article className=" pb-48 px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
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