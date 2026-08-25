'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter,usePathname } from 'next/navigation'
import type { SingingMaster } from '@/data/types';
import singingMaster from '@/data/singingMaster.json';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Flag, MessageSquareMore, ExternalLink, MessageCircleQuestion, Info, Sparkle } from 'lucide-react';
 
export default function CommonFooterContents() {

  const currentPath: string = usePathname();
  const router = useRouter();
  const units: SingingMaster[] = singingMaster.filter(data=>data.personFlg===0);
  const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);

  const formUrl: string = 'https://docs.google.com/forms/d/e/1FAIpQLSdCuDvEOlywC9FG7Vwqe1Y63ECdrlRtFCLjMDOBYHqbuMG6Pw/viewform?usp=pp_url&entry.1587831620=';

  const [currentUrl, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  
  return (<>
    <div className={`border-t inset-shadow-sm  
      w-full ${currentPath.includes('/search/story/')?' pc:w-full ':' pc:w-[calc(100%-240px)] '}
      ml-auto bg-gray-900
      flex flex-col text-center pt-12 pb-4  text-gray-50 mobileL:text-sm mobileM:text-sm text-xs`}
    >
        <a 
          className="group flex w-fit mx-auto my-4 
            underline underline-offset-2 decoration-indigo-200
            decoration-1 hover:decoration-[2px] 
            mobileM:text-base text-sm text-indigo-200 hover:font-bold"
          href={`${formUrl}${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className='flex '>
            <Flag className='w-[18px] text-indigo-300 group-hover:stroke-[3px]'/>
            {'このページの不具合を報告・情報を訂正する'}
            <ExternalLink className='flex mt-auto w-[14px] group-hover:stroke-[3px]'/>
          </div>
        </a>
        <Link 
          className=" w-fit mx-auto my-4 hover:font-bold
            underline underline-offset-2 decoration-gray-50
            decoration-1 hover:decoration-[2px] 
          "
          href={`/about`}
          rel="noopener noreferrer"
        >このサイトについて・プライバシーポリシー・免責事項
        </Link>
        <div className={`flex flex-col mx-auto my-6 text-sm `}>
          <Image
            className={`mx-auto h-auto w-[50px] tablet:h-auto tablet:w-[64px]`}
            src={`/jasrac.png`}
            alt="JASRAC許諾マーク"
            width={0}
            height={0}
            sizes="100%"
          />
          <div className="mx-auto text-[0.60rem]">{'JASRAC許諾第J260643396号'}</div>
        </div>
        <div className='flex mx-auto px-4 my-2 tablet:text-sm text-xs '>
          {'各ページに掲載された歌詞・動画サムネイル画像に関する著作権は、各レコード会社・アーティスト・アップロード者などに帰属します。'}
        </div>
        <div className='flex mx-auto px-4 my-2 tablet:text-sm text-xs'>
          {'当サイトは個人によるファンサイトです。「アイドルマスターSideM」公式とは一切関係ございません。当サイトに関するご質問等はすべて運営者までお問い合わせください。'}
        </div>
    </div>
  </>)
}