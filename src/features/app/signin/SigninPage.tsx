"use client" 

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation";
export default function SignInPage() {

  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') || "/";

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="border px-4 py-2"
      >
        Sign in with Google
      </button>
    </div>
  )
}