import { Metadata } from 'next'
import singingMaster from '../../../data/singingMaster.json';
import CommonPage from "../../../features/common/components/CommonPage";
import dynamic from "next/dynamic";
import { Suspense, cache } from "react";
import type { StorySearchResult } from '@/data/types';
import { MEDIA, CATEGORY, getCategoryByMedia } from '@/features/common/const/StoryInfoConst';
import UnitPageStory from "@/features/app/unit/UnitPageStory";
import UnitPageTabs from "@/features/app/unit/components/UnitPageTabs";

export function generateStaticParams() {
  const idols = singingMaster.filter(data=>data.personFlg===0);
  return idols.map((e)=>{
    return {id: e.singingInfoId}
  });
}

const UnitPageMain = dynamic(() => import("@/features/app/unit/UnitPageMain"), { ssr: true });
const UnitPageMusic = dynamic(() => import("@/features/app/unit/UnitPageMusic"), { ssr: true });

  const Units = async ({
    params,
    searchParams,
  }: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ t?:string; }>;
  }) => {
    const { id } = await params;
    const {t} = await searchParams;
    const type: string = t || 'music';
    let result: {type: string; storyData: StorySearchResult[];}[] = [];
    let login: boolean = false;
    const unitName: string = singingMaster.find(data => data.singingInfoId === id)?.singingInfoName||'';

    // if(type==='story') {
    //   const post = await getData([id],getCategoryByMedia(MEDIA.proe.id).map((res)=>res.categoryId),0,0,'or',0,1,'');
    //   result = post.result;
    //   login = post.login;
    // };

    return (
      <Suspense>
      <CommonPage>
        <title>{ `${unitName} ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
        <meta name="description" content={`「${unitName}」の楽曲情報・サブスク配信状況をチェック！ |  サーチサイコー`}/>
        <p className={`after:bg-[#42DB42] after:bg-[#F14A4A] after:bg-[#87C010] after:bg-[#4757C9] after:bg-[#FFA90A] after:bg-[#CC313B] after:bg-[#1767D9] after:bg-[#24AA2C] after:bg-[#F6F45E] after:bg-[#A584E5] after:bg-[#225B9D] after:bg-[#26D4FF] after:bg-[#309AC1] after:bg-[#54BC26] after:bg-[#E86D85] after:bg-[#F7D828] after:bg-[#F4BA07] after:bg-[#3BA12E] after:bg-[#338033] after:bg-[#3696D0] after:bg-[#EF7A30] after:bg-[#7F9D1E] after:bg-[#7E31CC] after:bg-[#E7B12C] after:bg-[#834DBD] after:bg-[#4C8DD0] after:bg-[#FF0000] after:bg-[#EC7B23] after:bg-[#1B66CF] after:bg-[#25B1BC] after:bg-[#58C038] after:bg-[#BF48A7] after:bg-[#9FA5AB] after:bg-[#E13E33] after:bg-[#334ABA] after:bg-[#CC66CC] after:bg-[#D1594C] after:bg-[#12967F] after:bg-[#6664C6] after:bg-[#CD9D2F] after:bg-[#EB64A0] after:bg-[#FF99D6] after:bg-[#484393] after:bg-[#E44635] after:bg-[#F28198] after:bg-[#FF70E2] after:bg-[#3B6FBC] after:bg-[#E1B21F] after:bg-[#EE8D2B] after:bg-[#4A4A4A] after:bg-[#344DCB] after:bg-[#EE972F] after:bg-[#CB3546] after:bg-[#3D51FF] after:bg-[#59C13B] after:bg-[#E34238] after:bg-[#D2931B] after:bg-[#6880A0] after:bg-[#192F5D] after:bg-[#3A782E] after:bg-[#21A1B4] after:bg-[#00CCBB] after:bg-[#2A92CF] after:bg-[#91BE1C] after:bg-[#D03743] `}>
        </p>
      <article className="pt-32 pb-96 font-sans">
        <UnitPageMain unitId={id} type={type}/>
      <section  className="w-full mt-5 px-2 mobileS:px-10 lg:px-16 bg-white lg:max-w-[1500px] lg:m-auto">
      <UnitPageTabs type={type}/>
      {type==='story'
        ?
        <Suspense fallback={<>{'story loading'}</>}>
        {/* @ts-ignore Server Component */}
        <UnitPageStory unitId={id}/>
        </Suspense>
        :<UnitPageMusic unitId={id}/>
      }
      </section>
      </article>
      </CommonPage>
      </Suspense>
    );
  }
  export default Units;