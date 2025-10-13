'use client'
import { auth } from "@/auth";
import { signIn, signOut, authClient } from "@/auth-client"
export const signInGoogle = async () => {
  const data = await signIn.social({
      provider: "google"
  });
  return data;
};
const signOutGoogle = async () => {
  const data = await authClient.signOut();
  return data;
};
 
export function SignIn() {
  return (
    <button
      onClick={() => signIn.social({ provider: "google" })}
      className="grid grid-cols-1 justify-items-center"
    >
    <svg className='h-[40px] w-[40px] lg:h-[40px] lg:w-[40px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#1f1f1f">
    <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/>
    </svg>
    <p className='text-xs tablet:text-sm'>{'ログイン'}</p>
    </button>
  )
} 

export function SignOut() {
  return (
    <button
      // onClick={async () => {
      //   "use server"
      //   await auth.api.signOut({
      //     // This endpoint requires session cookies.
      //     headers: await headers(),
      // });
      // }}
    >
    SignOut
    </button>
  )
} 

