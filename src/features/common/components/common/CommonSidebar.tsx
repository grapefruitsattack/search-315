'use client'
import Link from 'next/link';
import Image from 'next/image';
import UserButton from "./UserButton";
import CommonMenu from "./CommonMenu";

export default function CommonSidebar() {
  
  return (
<div>
  <div 
    className=" collapse pc:visible
      overflow-y-auto  overflow-x-hidden
      box-border fixed 
      left-0 top-0 block p-6 bg-gradient-to-b from-gray-200 to-gray-50
      w-60  h-[100vh] z-50
      ">
      <Link
        className ="relative"
        href={`/`}
        rel="noopener noreferrer"
      >
        <Image 
          className=" w-[150px] h-[50px]" 
          src="/search315_logo.svg" width="200" height="200" alt="ホームアイコン" />
      </Link>
    <div className='pt-4'>
      <UserButton/>
    </div>
    <CommonMenu />
  </div>
</div>
  )
}