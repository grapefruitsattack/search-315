"use client"
import React from "react";
import { Props } from "next/script";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import { AppProps } from "next/app";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import CommonHeader from "./CommonHeader";
import CommonSidebar from "./CommonSidebar";
import CommonFooterContents from "./CommonFooterContents";
import ParticlesComponent from './particles';
import { ArrowUp } from "lucide-react";

interface SidebarProviderCSS extends React.CSSProperties{
  '--sidebar-width':string
}

const CommonPage = ({ children }: Props )=> {
  const currentPath: string = usePathname();
  //const { shouldReload } = useBuildId();
  //const nextrouter = useRouter();
  
  // React.useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     if (shouldReload()) {
  //       nextrouter.refresh();
  //     }
  //   }

  // }, [shouldReload])

  return (
  <main className=" min-h-screen grid grid-rows-[auto_auto_1fr_auto] grid-cols-[100%]">
    <CommonSidebar />
    <CommonHeader />
    <div className="pc:pt-6 pt-24 pc:pl-64 pr-0 ">
      {children}
    </div>
        {/* <ParticlesComponent/> */}
        {/* <div className="
          flex pb-2 justify-center underline 
          text-blue-600 mobileL:text-lg mobileM:text-base text-sm
        ">
        <Link 
          className=""
          href={`/setting`}
          rel="noopener noreferrer"
        >雪の降る演出のON・OFFはこちら</Link>
        </div> */}
      <footer className=" ">
        <div className="w-full pc:w-[calc(100%-240px)] ml-auto h-12">
          <button className="flex w-full h-full bg-indigo-200 
            transition-all duration-100
            hover:outline-indigo-400 hover:outline-4 
            outline-none outline-indigo-600/30 outline-offset-0"
            onClick={()=>{
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <div className="flex items-center m-auto text-xl font-bold text-indigo-600">
              <ArrowUp className="w-[28px] stroke-[3px] mr-1"/>
              {'ページの先頭へ'}
            </div>
          </button>
          {'page top'}
        </div>
        <CommonFooterContents />
      </footer>
      
      <p className={`
        border-JUP00 hover:bg-JUP00/50 text-JUP00
        border-DRS00 hover:bg-DRS00/50 text-DRS00
        border-ALT00 hover:bg-ALT00/50 text-ALT00
        border-BEI00 hover:bg-BEI00/50 text-BEI00
        border-DBL00 hover:bg-DBL00/50 text-DBL00
        border-FRM00 hover:bg-FRM00/50 text-FRM00
        border-SAI00 hover:bg-SAI00/50 text-SAI00
        border-HIJ00 hover:bg-HIJ00/50 text-HIJ00
        border-SSK00 hover:bg-SSK00/50 text-SSK00
        border-CFP00 hover:bg-CFP00/50 text-CFP00
        border-MFM00 hover:bg-MFM00/50 text-MFM00
        border-SEM00 hover:bg-SEM00/50 text-SEM00
        border-KGD00 hover:bg-KGD00/50 text-KGD00
        border-FLG00 hover:bg-FLG00/50 text-FLG00
        border-LGN00 hover:bg-LGN00/50 text-LGN00
        border-CLF00 hover:bg-CLF00/50 text-CLF00
        
        `}>
      </p>
  </main>
  );
};
  
export default CommonPage;