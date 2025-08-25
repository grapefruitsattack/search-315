"use client"  // サインインボタンをクライアントコンポーネント化する

import { signIn } from "next-auth/react"

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => signIn("google")}
        className="border px-4 py-2"
      >
        Sign in with Google
      </button>
    </div>
  )
}
