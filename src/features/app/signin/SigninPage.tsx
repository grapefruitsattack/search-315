"use client" 
import { signIn, signOut } from "@/auth-client"
import { useSearchParams } from "next/navigation";
export default function SignInPage() {

  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') || "/";
  const signInGoogle = async () => {
    const data = await signIn.social({
        provider: "google"
    });
    return data;
  };
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => signInGoogle()}
        className="border px-4 py-2"
      >
        Sign in with Google
      </button>
    </div>
  )
}