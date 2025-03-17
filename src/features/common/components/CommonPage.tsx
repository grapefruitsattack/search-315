"use server"
import { Props } from "next/script";
import HeaderAndFooter from "./HeaderAndFooter";
import { AppProps } from "next/app";
//import { useRouter } from "next/navigation"
import React from "react";
//import useBuildId from "../utils/useBuildId"
import Link from 'next/link';
import ParticlesComponent from './particles';


const CommonPage = ({ children }: Props )=> {
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
    <main className=" min-h-screen">
        <HeaderAndFooter />
        <>{children}</>
        <ParticlesComponent/>
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
        <div className="
          flex pb-2 justify-center underline text-gray-600 mobileL:text-base mobileM:text-sm text-xs
        ">
        <Link 
          className=""
          href={`/about`}
          rel="noopener noreferrer"
        >このサイトについて・プライバシーポリシー・免責事項</Link>
        </div>
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