'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import singingMaster from '@/data/singingMaster.json';
import type { StorySearchResult } from '@/data/types';
import IdolBlock from "@/features/common/components/IdolBlock";
import {ShareSearch315Modal} from "../shareModal/ShareSearch315Modal";
import UnitMusic from "./UnitPageMusic";
import UnitStory from "./UnitPageStory";

interface ItemCSS extends React.CSSProperties{
  '--c':string
}

export default function IdolPage({ unitId, type }
  : { unitId: string; type: string; }) 
{
  const unitName:string = singingMaster.find(data => data.singingInfoId === unitId)?.singingInfoName||'';
  const url = singingMaster.find(data => data.singingInfoId === unitId)?.url;
  const color = singingMaster.find(data => data.singingInfoId === unitId)?.color;
  const colorStr:string = color ===undefined ?'' : color;

  
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if(type==='story') setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // ある程度の時間をローディング表示
    return () => clearTimeout(timeout);
  }, [type]);

  //ユニットメンバー取得
  const unitmember: string[] 
    = singingMaster.filter(data=>data.personFlg===1 && data.singingInfoId.substring(0, 3)===unitId.substring(0, 3))
    .map(data=>data.singingInfoId);


  return (
    <>

    <section className="px-2 mobileS:px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto">
      {/* タイトル */}
      <div className={`
      relative 
      after:content-[' '] after:absolute after:right-[-10px] after:bottom-[-20%] w-fit
      mb-8
      after:bg-[#`+colorStr+`] after:w-full after:h-[35%] after:z-0`}>
        <p className={`
        tablet:text-5xl text-5xl
        font-semibold 
        z-20 relative
        `}>
        {unitName}
        </p>
      </div>

      {/* 詳細 */}
      <div className='
          grid grid-cols-1 mt-4 gap-y-[5px] 
          lg:w-1/2 pb-4
      '>
        <div 
            className={`
            lg:w-auto inline-block row-span-1 lg:pr-2 pr-1 h-8
            `}
        >
        <ShareSearch315Modal 
            buttonText="このページをシェア"
            shareText={`「${unitName}」の楽曲情報・サブスク配信状況をチェック！ |  サーチサイコー\n#SideM #search315`} 
            pass={'unit/'+unitId}
            />
        </div>
      </div>
      <div  className="w-fit
          pt-2 pb-8 lg:text-base text-sm font-sans break-all
          "
      >
        <p>公式サイトユニット紹介：
          <a 
          className ="
          underline 
          text-slate-400
          hover:text-sky-300 
          fill-slate-500
          hover:fill-sky-500 
          "
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          >
            <span>
            {url} 
            <span className="pl-0.5">
            <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
            </span>
            </span>
          </a>
        </p>
      </div>
      <div 
          className="
              text-2xl font-mono flex items-center max-w-full mb-2
              after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
          "
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" fill="rgba(55,94,126,1)"></path></svg>
          {'ユニットメンバー'}
      </div>
      <div className='mt-2 pb-8 grid text-center align-middle grid-cols-2 lg:mb-0 lg:grid-cols-3 gap-3 max-w-[900px]'>
        {unitmember.length===0 
          ? <div>結果なし</div>
          :unitmember.map((result, index) => (
            <IdolBlock 
            key={index}
            id={result} 
            />
          ))
        }
      </div>
    </section>



    </>
  );
}