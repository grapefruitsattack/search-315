'use client'
import React from "react"
import { useSession } from "@/auth-client";
import {SignIn,SignOut} from "@/features/management/auth/SignIn";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"
import { CircleUserRound } from "lucide-react";


export default function UserButton() {

  const { data, isPending } = useSession();


  if (isPending) {
    return (
      <div>
        <div className="flex pc:flex-row flex-col items-center">
          <Skeleton className="h-[40px] w-[40px] rounded-xl mx-auto pc:mx-1" />
          <Skeleton className="h-2 pc:h-5 w-20 mt-1 pc:mt-0" />
        </div>
      </div>
    )
  }

  const login: boolean = data?.user?true:false;

  return (
      <div className="">
        
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
        
      
      </div>
  );
  }