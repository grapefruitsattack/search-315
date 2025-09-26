

import { Suspense } from "react";
import React from "react"
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { headers } from "next/headers";
import CommonPage from "@/features/common/components/CommonPage";
import SigninPage from "@/features/app/signin/SigninPage";

export default async function Page() {
  const session = await auth.api.getSession({
      headers: await headers(),
  });
  const login: boolean = session?.user?true:false;
  if (login) redirect('/mypage');

  return (
    <Suspense>
    <CommonPage>
    <article className="pt-32 pb-96 px-2 mobileS:px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
      <SigninPage />
    </article>
    </CommonPage>
    </Suspense>
    ); 
  }