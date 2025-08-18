'use client'
import type { StorySearchResult } from '../../../../data/types';
import SearchStoryController from "../components/SearchStoryController";
import SortButton from "../components/SortButton";
import StoryBlock from "../../../common/components/story/StoryBlock";
import Pagination from "../../../common/components/Pagination";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchPageStory({ data }: { data: {result:StorySearchResult[],totalCnt:number,login:boolean};}) {
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
    <section className="lg:px-24 px-2 mobileS:px-8 p-2 flex flex-wrap items-center gap-4">
    {/* 検索結果がゼロ件の場合、検索エリアを自動で開く */}
    <SearchStoryController 
          key={searchParams.toString()} firstIsOpen={resultData === null || resultData.length===0}/>
    </section>
    <section className="lg:px-24 px-2 mobileS:px-8 pt-2 flex flex-wrap items-center gap-4">
      <SortButton/>
    </section>
    <section className="lg:px-24 px-2 mobileS:px-8 pb-2 flex flex-wrap items-center gap-4">
      <Pagination currentPage={currentPage} totalPage={maxPage}/>
    </section>
    {/* ストーリー一覧 */}
    <section className="lg:flex px-2 mobileS:px-10 lg:px-16 w-full">
    <section className="grid grid-flow-row-dense items-start gap-4 grid-cols-1 lg:grid-cols-3 w-full">
      {loading
        ?
        // ローディング表示（スケルトン）
        <>
          <Skeleton className="h-[120px] rounded-sm" />
          <Skeleton className="h-[150px] rounded-sm" />
          <Skeleton className="h-[150px] rounded-sm" />
          <Skeleton className="h-[120px] rounded-sm" />
          <Skeleton className="h-[120px] rounded-sm" />
          <Skeleton className="h-[120px] rounded-sm" />
        </>
        :<>
          {resultData === null || resultData.length===0 
          ?
          <div className="flex flex-col justify-center items-start ">
            {/* TODO アラート化 */}
            <div>検索条件に該当するストーリーがありません</div>
            <div>検索条件を変更してください</div>
          </div>
          :resultData.map((data, index) => (
          <StoryBlock 
            key={index} 
            storyId={data.story_id}
            category={data.category}
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
          </>}
          </section>
      </section>
    <section className="lg:px-24 px-2 mobileS:px-8 pt-4 flex flex-wrap items-center gap-4">
      <Pagination currentPage={currentPage} totalPage={maxPage}/>
    </section>

    <section className=" pb-48">
    </section>
    </>
  );
}