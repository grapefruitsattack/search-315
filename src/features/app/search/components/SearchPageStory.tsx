'use client'
import type { StorySearchResult } from '../../../../data/types';
import SearchStoryController from "../components/SearchStoryController";
import SortButton from "../components/SortButton";
import StoryBlock from "../../../common/components/story/StoryBlock";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function SearchPageStory({ data }: { data: {result:StorySearchResult[],totalCnt:number,login:boolean};}) {
  const resultData: StorySearchResult[] = data.result;
  const login: boolean = data.login;

  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const urlSearchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // ある程度の時間をローディング表示

    return () => clearTimeout(timeout);
  }, [searchParams.toString()]);

  // ページネーション
  const currentPage: number = Number(urlSearchParams.get('page')) || 1;
  const pageSize: number = 18;

  return (
    <>
    {/* トップ移動ボタン */}
    <section className="z-40  py-2 fixed  bottom-14 flex flex-row w-full items-center  justify-center">  
    
    <div className="absolute left-8">
            {/* <button 
                className='rounded-full p-3 bg-gradient-to-r from-red-200/90 to-amber-300/90  items-center
                text-teal-700 font-bold lg:text-xl text-lm shadow-lg shadow-red-600/70'
                onClick={() => {
                  window.scroll({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
            >  
                <span>
                {''}
                <svg xmlns="http://www.w3.org/2000/svg" 
                    className="icon icon-tabler icon-tabler-search inline-block pl-1 stroke-red-800 fill-red-800 
                      w-[32px] h-[32px] lg:w-[42px] lg:h-[42px]"
                     viewBox="0 0 26 26" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path></svg>
                </span>
            </button> */}

    </div>
    </section>
    <section className="lg:px-24 px-2 mobileS:px-8 p-2 flex flex-wrap items-center gap-4">
    {/* 検索結果がゼロ件の場合、検索エリアを自動で開く */}
    <SearchStoryController firstIsOpen={resultData.length===0}/>
    </section>
    <section className="lg:px-24 px-2 mobileS:px-8 p-2 flex flex-wrap items-center gap-4">

    </section>
    <section className="lg:px-24 px-2 mobileS:px-8 p-2 flex flex-wrap items-center gap-4">
      <SortButton/>
    </section>
    {/* ストーリー一覧 */}
    <section className="lg:flex px-2 mobileS:px-10 lg:px-16 w-full">
    <section className="grid grid-flow-row-dense items-start gap-4 grid-cols-1 lg:grid-cols-3 w-full">
      {loading?<div>Loading Test...</div>:<>
          {resultData.length===0 
          ?
          <div className="flex flex-col justify-center items-start ">
            <div>検索条件に該当する楽曲がありません</div>
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

    <section className=" pb-48">
    </section>
    </>
  );
}