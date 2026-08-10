'use client'
import React from "react"
import CommonPage from "./CommonPage";
import { useSession } from "@/auth-client";
import { headers } from "next/headers";
import {SignIn,SignOut} from "@/features/management/auth/SignIn";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";

export default function UserButton() {

  const { data } = useSession();
  const login: boolean = data?.user?true:false;

    return (
        <section className="">
          
          {login
              ?
              <Link className='flex pc:flex-row flex-col hover:text-zinc-800 text-zinc-500'
                href={`/mypage`}
                rel="noopener noreferrer"
              >
              <CircleUserRound className=' h-[40px] w-[40px] mx-auto pc:mx-1 ' />
              <p className='text-xs tablet:text-sm pc:my-auto pc:text-lg'>{'マイページ'}</p>
              </Link>
              :
              <SignIn></SignIn>
            }
          
       
        </section>
      );
  }