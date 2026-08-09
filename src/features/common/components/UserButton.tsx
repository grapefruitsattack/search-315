'use client'
import React from "react"
import CommonPage from "./CommonPage";
import { useSession } from "@/auth-client";
import { headers } from "next/headers";
import {SignIn,SignOut} from "../../management/auth/SignIn";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";

export default function UserButton() {

  const { data } = useSession();
  const login: boolean = data?.user?true:false;

    return (
        <section className="">
          
          {login
              ?
              <Link className='grid grid-cols-1 justify-items-center'
                href={`/mypage`}
                rel="noopener noreferrer"
              >
              <CircleUserRound className='h-[40px] w-[40px]' />
              <p className='text-xs tablet:text-sm'>{'マイページ'}</p>
              </Link>
              :
              <SignIn></SignIn>
            }
          
       
        </section>
      );
  }