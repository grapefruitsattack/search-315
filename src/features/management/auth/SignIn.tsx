'use client'
import { auth } from "@/auth";
import { signIn, signOut, authClient } from "@/auth-client"
import { LogIn } from "lucide-react";

// export const signInGoogle = async () => {
//   const data = await signIn.social({
//       provider: "google",
//       callbackURL: window.location.href,
//   });
//   return data;
// };
// const signOutGoogle = async () => {
//   const data = await authClient.signOut();
//   return data;
// };
 
export function SignIn() {
  return (
    <button
      onClick={() => authClient.signIn.social({ provider: "google",callbackURL: window.location.href, })}
      className="flex pc:flex-row flex-col"
    >
    <LogIn className="hover:text-zinc-800 text-zinc-500 h-[40px] w-[40px] lg:h-[40px] lg:w-[40px] mx-auto pc:mx-2" />
    <p className='text-xs tablet:text-sm pc:my-auto pc:text-lg'>{'ログイン'}</p>
    </button>
  )
} 

export function SignOut() {
  return (
    <button
    onClick={() => signOut()}
    >
    SignOut
    </button>
  )
} 

