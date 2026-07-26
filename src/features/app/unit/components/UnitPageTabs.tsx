'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hasAnalyticsConsent } from "@/lib/analytics";
import {usePageCategory} from "@/features/common/hooks/pageCategoryHook";
import type { SingingMaster } from '@/data/types';
import { Smile,Music,BookOpen,MessageCircleWarning,Sparkles } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function UnitPageTabs({ type,member,unitMember }: { type: string,member:string,unitMember:SingingMaster[] }) {
    const currentPath: string = usePathname();
    const [pageCategory,setPageCategory] = usePageCategory('');

    return(
    <div>
      <div className="flex mb-5 gap-0 flex-wrap " role="tablist" aria-label="tab options">
        <Tabs defaultValue={type}>
          <TabsList className="h-fit ">
            <TabsTrigger asChild key={'recommend'} value={'recommend'} className="flex-1">
              <Link 
                className={`flex-col gap-1 px-2.5 sm:px-3 w-[67px]
                    `}
                href={{ pathname: currentPath, query: {t:'recommend', m:member}}}
                scroll={false}
                onClick={()=>{
                  setPageCategory('recommend');
                }}
              >
              <MessageCircleWarning className="mx-auto" />
              <div className=" ">
                {'オススメ'}
              </div>
              </Link>
            </TabsTrigger>
            <TabsTrigger asChild key={'music'} value={'music'} className='flex-1'>
              <Link 
                className={`flex-col gap-1 px-2.5 sm:px-3 w-[67px]
                    `}
                href={{ pathname: currentPath, query: {t: 'music', m:member}}}
                scroll={false}
                onClick={()=>{
                  setPageCategory('music');
                }}
              >
              <Music className="mx-auto" />
              <div className=" ">
              {'楽曲'}
              </div>
              </Link>
            </TabsTrigger>
            <TabsTrigger asChild key={'story'} value={'story'} className='flex-1'>
              <Link 
                className={`flex-col gap-1 px-2.5 sm:px-3 w-[67px]
                    `}
                href={{ pathname: currentPath, query: {t: 'story', m:member}}}
                scroll={false}
                onClick={()=>{
                  setPageCategory('story');
                }}
              >
              <BookOpen className="mx-auto" />
              {`ストーリー`}
              </Link>
            </TabsTrigger>
            <TabsTrigger asChild key={'other'} value={'other'} className='flex-1'>
              <Link 
                className={`flex-col gap-1 px-2.5 sm:px-3 w-[67px]
                    `}
                href={{ pathname: currentPath, query: {t: 'other', m:member}}}
                scroll={false}
                onClick={()=>{
                  setPageCategory('other');
                }}
              >
              <Sparkles className="mx-auto" />
              {`その他`}
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div 
        className={`
          ${['music'].includes(type)?'flex flex-wrap':'hidden'}
          mb-5 gap-1 font-bold
        `}
      >
        <Link
          className={`border border-2 rounded-xl px-2 py-[2px]
            ${member==='unit'
              ?'bg-green-400 border-green-400 text-stone-50 pointer-events-none'
              :'bg-stone-200/20 border-stone-200 text-stone-500 '}
          `}
          key={'unit'}
          href={{ pathname: currentPath, query: {t: type, m: 'unit'}}}
          scroll={false}
          aria-disabled={member==='unit'}
        >
          ユニット
        </Link>
        {unitMember.map((data,index)=>
        <Link
          className={`border border-2 rounded-xl px-2 py-[2px]
            ${member===data.singingInfoId
              ?'bg-green-400 border-green-400 text-stone-50 pointer-events-none'
              :'bg-stone-200/20 border-stone-200 text-stone-500 '}
          `}
          key={data.singingInfoId}
          href={{ pathname: currentPath, query: {t: type, m: data.singingInfoId}}}
          scroll={false}
          aria-disabled={member===data.singingInfoId}
        >
          {data.singingInfoId==='CFP03'?'アスラン＝BBⅡ世':data.singingInfoName}
        </Link>
        )}
      </div>
    </div>
    )
}