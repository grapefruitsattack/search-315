'use client'
import { useEffect } from "react";
import Link from "next/link";
import { usePathname,useSearchParams } from "next/navigation";
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

const TAB_ELEMENT_ID = 'unitpagetab';
const SONG_TAB_ELEMENT_ID = 'songtab';

export default function UnitPageTabs({ type,member,unitMember }: { type: string,member:string,unitMember:SingingMaster[] }) {
    const currentPath: string = usePathname();
    const searchParams = useSearchParams();
    const [pageCategory,setPageCategory] = usePageCategory('');
    const sessionStorageItemId: string = 'navigatewithtab';

    const scrollFunction =(targetElementId:string)=>{
      const element = document.getElementById(targetElementId);
      if(element!==null){
        const targetDOMRect = element.getBoundingClientRect();
        const targetTop = targetDOMRect.top + window.pageYOffset;
        const headerHight = window.innerWidth >= 1000 ? 5: 70;
        window.scrollTo({
          top: targetTop-headerHight,
          behavior: 'smooth'
        });
      }
    }

  useEffect(() => {
    if(sessionStorage.getItem(sessionStorageItemId)!=="1"){
        return;
    }
    requestAnimationFrame(()=>{
      scrollFunction(TAB_ELEMENT_ID);
      sessionStorage.removeItem(sessionStorageItemId);
    });
  },[searchParams]);

    return(
    <div>
      <div 
        className="flex mb-5 gap-0 flex-wrap px-0 mobileS:px-2" role="tablist" 
        aria-label="tab options"
        id={TAB_ELEMENT_ID}
      >
        <Tabs defaultValue={type}>
          <TabsList className="h-fit">
            <TabsTrigger asChild key={'recommend'} value={'recommend'} className="flex-1">
              <Link 
                className={`flex-col px-2.5 sm:px-3 w-[64px] tablet:w-[68px] text-xs mobileL:text-sm tablet:text-base
                    `}
                href={{ pathname: currentPath, query: {t:'recommend', m:member}}}
                scroll={false}
                onClick={()=>{
                  setPageCategory('recommend');
                  if(typeof window !== 'undefined'){
                    sessionStorage.setItem(
                      sessionStorageItemId,
                      String('1')
                    );
                  }
                }}
              >
              <MessageCircleWarning className="mx-auto  w-[20px] tablet:w-[24px]" />
              <div className=" ">
                {'オススメ'}
              </div>
              </Link>
            </TabsTrigger>
            <TabsTrigger asChild key={'music'} value={'music'} className='flex-1'>
              <Link 
                className={`flex-col px-2.5 sm:px-3 w-[64px] tablet:w-[68px] text-xs mobileL:text-xs mobileL:text-sm tablet:text-base
                    `}
                href={{ pathname: currentPath, query: {t: 'music', m:member}}}
                scroll={false}
                onClick={()=>{
                  setPageCategory('music');
                  if(typeof window !== 'undefined'){
                    sessionStorage.setItem(
                      sessionStorageItemId,
                      String('1')
                    );
                  };
                }}
              >
              <Music className="mx-auto  w-[20px] tablet:w-[24px]" />
              <div className=" ">
              {'楽曲'}
              </div>
              </Link>
            </TabsTrigger>
            <TabsTrigger asChild key={'story'} value={'story'} className='flex-1'>
              <Link 
                className={`flex-col px-2.5 sm:px-3 w-[64px] tablet:w-[68px] text-xs mobileL:text-sm tablet:text-base
                    `}
                href={{ pathname: currentPath, query: {t: 'story', m:member}}}
                scroll={false}
                onClick={()=>{
                  setPageCategory('story');
                  if(typeof window !== 'undefined'){
                    sessionStorage.setItem(
                      sessionStorageItemId,
                      String('1')
                    );
                  };
                }}
              >
              <BookOpen className="mx-auto  w-[20px] tablet:w-[24px]" />
              {`ストーリー`}
              </Link>
            </TabsTrigger>
            <TabsTrigger asChild key={'other'} value={'other'} className='flex-1'>
              <Link 
                className={`flex-col px-2.5 sm:px-3 w-[64px] tablet:w-[68px] text-xs mobileL:text-sm tablet:text-base
                    `}
                href={{ pathname: currentPath, query: {t: 'other', m:member}}}
                scroll={false}
                onClick={()=>{
                  setPageCategory('other');
                  if(typeof window !== 'undefined'){
                    sessionStorage.setItem(
                      sessionStorageItemId,
                      String('1')
                    );
                  };
                }}
              >
              <Sparkles className="mx-auto w-[20px] tablet:w-[24px]" />
              {`その他`}
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div 
        id={SONG_TAB_ELEMENT_ID}
        className={`
          ${['music'].includes(type)?'flex flex-wrap':'hidden'}
          mb-5 gap-1 font-bold px-2
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