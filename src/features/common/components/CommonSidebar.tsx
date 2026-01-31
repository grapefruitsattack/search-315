'use client'
import Link from 'next/link';
import Image from 'next/image';
 
export default function CommonSidebar() {

  
  return (
<div>
  <div 
    className=" collapse tablet:visible
      overflow-y-auto  overflow-x-hidden
      transition-transform duration-300 ease-linear transform 
      box-border fixed 
      left-0 top-0 block p-6 border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl
      w-60  h-[100vh]
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
    <div>Sidebar</div>
    <div>Sidebar</div>
    <div>Sidebar</div>
    <div>Sidebar</div>
  </div>
</div>
  )
}