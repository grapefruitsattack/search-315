
import { cache } from 'react'
import { Suspense } from "react";
import React from "react"
import { createClient } from '@supabase/supabase-js'
import { auth } from "../../../auth";
import { notFound, redirect } from 'next/navigation'
import CommonPage from "@/features/common/components/CommonPage";

export default async function Page() {
  const session = await auth();
  const supabaseAccessToken = session?.supabaseAccessToken;
  const login: boolean = session?.user?true:false;
  if (!login) redirect('/auth/signin?callbackUrl=/mypage');

  return (
    <Suspense>
    <CommonPage>
      <article className="pt-32 pb-96 px-2 mobileS:px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
      {/* @ts-ignore Server Component */}
      {'マイページ'}
      </article>
    </CommonPage>
    </Suspense>
  );
}