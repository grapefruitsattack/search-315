'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hasAnalyticsConsent } from "@/lib/analytics";
import {usePageCategory} from "@/features/common/hooks/pageCategoryHook";

export default function UnitPageTabs({ type }: { type: string }) {
    const currentPath: string = usePathname();
    const [pageCategory,setPageCategory] = usePageCategory('');

    return(
    <div className="flex mb-5 gap-0 flex-wrap " role="tablist" aria-label="tab options">
        <Link 
          className={`flex items-center px-2 tablet:px-4 py-2 text-xs mobileS:text-base tablet:text-xl rounded-t-2xl
              ${type==='recommend'||(type!=='music'&&type!=='story')
              ?`font-bold text-black border-black pointer-events-none fill-red-500
                  border-2 border-b-white bg-white`
              :`bg-zinc-100 text-neutral-500 font-medium fill-neutral-400 border-black border-b-2 
                  hover:border-b-neutral-800 hover:text-neutral-900 hover:fill-red-400  `}
              `}
          href={{ pathname: currentPath, query: {t: 'recommend'}}}
          scroll={false}
          aria-disabled={type==='recommend'||(type!=='music'&&type!=='story')}
          onClick={()=>{
            setPageCategory('recommend');
          }}
        >
        {/* Google Fonts Icons */}
        <svg className=" tablet:h-[24px] tablet:w-[24px] h-[20px] w-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/>
        </svg>
        <p className="pl-1">
          オススメ
        </p>
        </Link>

        <Link 
          className={`flex items-center px-2 tablet:px-4 py-2 text-xs mobileS:text-base tablet:text-xl rounded-t-2xl
              ${type==='music'
              ?`font-bold text-black border-black pointer-events-none fill-cyan-500
                  border-2 border-b-white bg-white`
              :`bg-zinc-100 text-neutral-500 font-medium fill-neutral-400 border-black border-b-2 
                  hover:border-b-neutral-800 hover:text-neutral-900 hover:fill-cyan-400  `}
              `}
          href={{ pathname: currentPath, query: {t: 'music'}}}
          scroll={false}
          aria-disabled={type==='music'}
          onClick={()=>{
            setPageCategory('music');
          }}
        >
        <svg className=" my-auto tablet:h-[24px] tablet:w-[24px] h-[18px] w-[18px]" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -1.5 24 24">
            <path d="M20 3V17C20 19.2091 18.2091 21 16 21C13.7909 21 12 19.2091 12 17C12 14.7909 13.7909 13 16 13C16.7286 13 17.4117 13.1948 18 13.5351V5H9V17C9 19.2091 7.20914 21 5 21C2.79086 21 1 19.2091 1 17C1 14.7909 2.79086 13 5 13C5.72857 13 6.41165 13.1948 7 13.5351V3H20ZM5 19C6.10457 19 7 18.1046 7 17C7 15.8954 6.10457 15 5 15C3.89543 15 3 15.8954 3 17C3 18.1046 3.89543 19 5 19ZM16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z"></path>
        </svg>
        <p className="pl-1">
            楽曲
        </p>
        </Link>
        <Link 
          className={`flex items-center px-2 tablet:px-4 py-2 text-xs mobileS:text-base tablet:text-xl rounded-t-2xl
              ${type==='story'
              ?`font-bold text-black border-black pointer-events-none 
                border-2 border-b-white bg-white fill-green-500 `
              :`bg-zinc-100 text-neutral-500 font-medium fill-neutral-400 border-black border-b-2 
                 hover:border-b-neutral-800 hover:text-neutral-900 hover:fill-green-400 `}
              `}
          href={{ pathname: currentPath, query: {t: 'story'}}}
          scroll={false}
          aria-disabled={type==='story'}
          onClick={()=>{
            setPageCategory('story');
          }}
        >
        {/* Google Fonts Icons */}
        <svg className="rounded tablet:px-[0.5px] tablet:h-[24px] tablet:w-[24px] h-[20px] w-[20px]" xmlns="http://www.w3.org/2000/svg" height="24px" width="26px" viewBox="10 -960 960 960">
            <path d="M260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z"/>
        </svg>
        <p className="pl-1">
            ストーリー
        </p>
        </Link>
        <div className="flex-grow border-black border-b-2 "></div>
    </div>
    )
}