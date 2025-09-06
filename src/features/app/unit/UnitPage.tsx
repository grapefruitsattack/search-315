'use client'
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import singingMaster from '@/data/singingMaster.json';
import IdolBlock from "@/features/common/components/IdolBlock";
import {ShareSearch315Modal} from "../shareModal/ShareSearch315Modal";
import Music from "./components/Music";
import Story from "./components/Story";

interface ItemCSS extends React.CSSProperties{
  '--c':string
}

export default function IdolPage({ unitId, type, storyData }: { unitId: string; type: string; storyData: number }) {
  const unitName:string = singingMaster.find(data => data.singingInfoId === unitId)?.singingInfoName||'';
  const url = singingMaster.find(data => data.singingInfoId === unitId)?.url;
  const color = singingMaster.find(data => data.singingInfoId === unitId)?.color;
  const colorStr:string = color ===undefined ?'' : color;

  const router = useRouter();
  const currentPath: string = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  //ユニットメンバー取得
  const unitmember: string[] 
    = singingMaster.filter(data=>data.personFlg===1 && data.singingInfoId.substring(0, 3)===unitId.substring(0, 3))
    .map(data=>data.singingInfoId);


  return (
    <>
    <title>{ `${unitName} ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
    <meta name="description" content={`「${unitName}」の楽曲情報・サブスク配信状況をチェック！ |  サーチサイコー`}/>
    <p className={`after:bg-[#42DB42] after:bg-[#F14A4A] after:bg-[#87C010] after:bg-[#4757C9] after:bg-[#FFA90A] after:bg-[#CC313B] after:bg-[#1767D9] after:bg-[#24AA2C] after:bg-[#F6F45E] after:bg-[#A584E5] after:bg-[#225B9D] after:bg-[#26D4FF] after:bg-[#309AC1] after:bg-[#54BC26] after:bg-[#E86D85] after:bg-[#F7D828] after:bg-[#F4BA07] after:bg-[#3BA12E] after:bg-[#338033] after:bg-[#3696D0] after:bg-[#EF7A30] after:bg-[#7F9D1E] after:bg-[#7E31CC] after:bg-[#E7B12C] after:bg-[#834DBD] after:bg-[#4C8DD0] after:bg-[#FF0000] after:bg-[#EC7B23] after:bg-[#1B66CF] after:bg-[#25B1BC] after:bg-[#58C038] after:bg-[#BF48A7] after:bg-[#9FA5AB] after:bg-[#E13E33] after:bg-[#334ABA] after:bg-[#CC66CC] after:bg-[#D1594C] after:bg-[#12967F] after:bg-[#6664C6] after:bg-[#CD9D2F] after:bg-[#EB64A0] after:bg-[#FF99D6] after:bg-[#484393] after:bg-[#E44635] after:bg-[#F28198] after:bg-[#FF70E2] after:bg-[#3B6FBC] after:bg-[#E1B21F] after:bg-[#EE8D2B] after:bg-[#4A4A4A] after:bg-[#344DCB] after:bg-[#EE972F] after:bg-[#CB3546] after:bg-[#3D51FF] after:bg-[#59C13B] after:bg-[#E34238] after:bg-[#D2931B] after:bg-[#6880A0] after:bg-[#192F5D] after:bg-[#3A782E] after:bg-[#21A1B4] after:bg-[#00CCBB] after:bg-[#2A92CF] after:bg-[#91BE1C] after:bg-[#D03743] `}>
    </p>

    <article className="pt-32 pb-96 px-2 mobileS:px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-sans">
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
      <section className='mt-2 pb-8 grid text-center align-middle grid-cols-2 lg:mb-0 lg:grid-cols-3 gap-3 max-w-[900px]'>
        {unitmember.length===0 
          ? <div>結果なし</div>
          :unitmember.map((result, index) => (
            <IdolBlock 
            key={index}
            id={result} 
            />
          ))
        }
      </section>

      <div  className="w-full mt-5 mb-5">
        <div className="flex gap-2 overflow-x-auto border-b border-neutral-300 " role="tablist" aria-label="tab options">
          <Link 
            className={`h-min px-4 py-2 text-xl 
              ${type==='music'||type!=='story'
                ?'font-bold text-black border-b-2 border-black pointer-events-none '
                :'text-neutral-600 font-medium hover:border-b-neutral-800 hover:text-neutral-900 '}
              `}
            href={{ pathname: currentPath, query: {t: 'music'}}}
            scroll={false}
            aria-disabled={type==='music'||type!=='story'}
          >
            楽曲
          </Link>
          <Link 
            className={`h-min px-4 py-2 text-xl 
              ${type==='story'
                ?'font-bold text-black border-b-2 border-black pointer-events-none '
                :'text-neutral-600 font-medium hover:border-b-neutral-800 hover:text-neutral-900 '}
              `}
            href={{ pathname: currentPath, query: {t: 'story'}}}
            scroll={false}
            aria-disabled={type==='story'}
          >
            ストーリー
          </Link>
        </div>
      </div>

      {type==='story'
        ?<><Story id={unitId}/>{storyData}</>
        :<Music id={unitId}/>
      }

    </article>

    </>
    );
    }