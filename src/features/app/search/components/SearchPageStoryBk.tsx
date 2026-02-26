'use client'
import type { StorySearchResult } from '../../../../data/types';
import SearchStoryController from "./SearchStoryController";
import SortButton from "../components/SortButton";
import StoryBlock from "../../../common/components/story/StoryBlock";
import Pagination from "../../../common/components/Pagination";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton"
import { Toaster } from 'sonner';

export default function SearchPageStoryBk({ data }: { data: {result:StorySearchResult[],totalCnt:number,login:boolean};}) {
  const resultData: StorySearchResult[] = data.result;
  const login: boolean = data.login;

  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const urlSearchParams = useSearchParams();
  const router = useRouter();
  const [firstIsOpenController, setFirstIsOpenController] = useState(resultData === null || resultData.length===0);


  useEffect(() => {
  setFirstIsOpenController(resultData === null || resultData.length === 0);
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // ある程度の時間をローディング表示

    return () => clearTimeout(timeout);
  }, [searchParams.toString()]);

  // ページネーション
  const pageSize: number = 18;
  const maxPage: number = Math.ceil(data.totalCnt/pageSize);
  let currentPage: number = Number(urlSearchParams.get('page')) || 1;
  currentPage = currentPage>maxPage?maxPage:currentPage;

  return (
    <>
    <section className="mb-2 bg-gradient-to-r from-gray-500 from-50% rounded">
      <div 
        className="
          flex items-center w-full ml-2
          text-sm tablet:text-xl font-mono
          text-white py-[1px] tablet:py-0
          gap-1"
      >
        {/* Google Fonts Icons */}
        <svg className="fill-gray-500 bg-white rounded px-[0.5px] w-[20px] h-[18px] tablet:w-[24px] tablet:h-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="10 -960 960 960">
          <path d="M260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z"/>
        </svg>
        <p className="pr-2">{'ストーリーを検索'}</p>
      </div>
    </section>
    <section className="lg:flex px-2 mobileM:px-8 tablet:px-4 flex flex-wrap">
      <Toaster position="top-center"/>
      {/* 検索結果がゼロ件の場合、検索エリアを自動で開く */}
      <SearchStoryController 
            key={searchParams.toString()} firstIsOpen={resultData === null || resultData.length===0}/>
    </section>
    <section className="lg:px-24 px-2 mobileS:px-8 pt-2 flex flex-wrap items-center gap-4">
      <SortButton/>
    </section>

    <section className="lg:px-24 px-2 mobileS:px-8 pb-2 flex flex-wrap items-center gap-4">
      <Pagination totalPage={maxPage}/>
    </section>
    {/* ストーリー一覧 */}
    <section className="lg:flex px-2 mobileM:px-8 tablet:px-4 w-full">
      <section className="grid grid-flow-row-dense items-start gap-4 grid-cols-1 lg:grid-cols-3 w-full">

        <>
          {resultData === null || resultData.length===0 
          ?
          <div className="flex flex-col justify-center items-start ">
            {/* // TODO アラート化 */}
            <div>検索条件に該当するストーリーがありません</div>
            <div>検索条件を変更してください</div>
          </div>
          :resultData.map((data, index) => (
          <StoryBlock 
            key={index} 
            storyId={data.story_id}
            category={data.category}
            website={data.website}
            headTitle={data.head_title}
            infoStory={data.info_id}
            media={data.media}
            storyTitle={data.story_title}
            url={data.url}
            login={login}
            userReadLater={data.user_read_later}
            displayLogin={true}
          />
          ))}
        </>
      </section>
    </section>
    <section className="lg:px-24 px-2 mobileS:px-8 pt-4 flex flex-wrap items-center gap-4">
      <Pagination totalPage={maxPage}/>
    </section>

    <section className=" pb-48">
    </section>
    </>
  );
}