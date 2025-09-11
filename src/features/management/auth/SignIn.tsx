import { signIn, signOut } from "@/auth"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
    <button type="submit" className='grid grid-cols-1 justify-items-center'>
    <svg className='h-[40px] w-[40px] lg:h-[40px] lg:w-[40px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#1f1f1f">
    <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/>
    </svg>
    <p className='text-xs tablet:text-sm'>{'ログイン'}</p>
    </button>
    </form>
  )
} 

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">SignOut</button>
    </form>
  )
} 

