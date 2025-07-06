'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import type { SongMaster,StorySearchResult } from '../../../../data/types';
import SearchSong from '../../../common/utils/SearchSong';
import SongBlock from "../../../common/components/SongBlock";
import StoryBlock from "../../../common/components/story/StoryBlock";
import { motion } from 'framer-motion'
import { AnimatePresence } from "framer-motion";
import songInfoAsc from '../../../../data/songInfoAsc.json';

export default function SearchPageStory({ data }: { data: StorySearchResult[];}) {
  console.log('post.storySearchResult')
  console.log(data[0].info_id)
  console.log('post.storySearchResult')
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const currentPath: string = usePathname();
  const search :string[] = searchParams.get('q')?.split(' ')||[];
  const filters :string[] = searchParams.get('f')?.split(' ')||[];

  const order :string = searchParams.get('order') || 'desc';
  const andor :string = searchParams.get('andor') || 'desc';
  const subscExists :number = Number(searchParams.get('subsc')) || 0;
  const colleFlg :number = Number(searchParams.get('colle')) || 0;
  const displayCoefficient :number = Number(searchParams.get('display')) || 1;
  //サブスク過去Verクエリ対応
  if((subscExists===1) && (filters.includes('sbsc'))){
    filters.push('sbsc');
  };

  const songInfoDesc = songInfoAsc.slice().reverse();
  
  let results: SongMaster[] = SearchSong(
    search
    ,[]
    ,filters
    ,order === 'asc' ? songInfoAsc : songInfoDesc
    ,andor
  );
  const [displayResults, setDisplayResults] = useState(results.length > 36? results.slice(0,36): results);
  const [displayShowMorebutton, setDisplayShowMorebutton] = useState(results.length > 36);
  // 遷移時処理
  useEffect(() => {
    results = SearchSong(
      search
      ,[]
      ,filters
      ,order === 'asc' ? songInfoAsc : songInfoDesc
      ,andor
    );
    const newDisplayResults: SongMaster[] 
      = results.length > 36? results.slice(0, displayCoefficient < 1? 36: displayCoefficient*36): results;
    setDisplayResults(newDisplayResults);
    setDisplayShowMorebutton(results.length > newDisplayResults.length);
  }, [searchParams]);



  return (
    <>
    {/* トップ移動ボタン */}
    <section className="z-40  py-2 fixed  bottom-14 flex flex-row w-full items-center  justify-center">  
    <div className="absolute left-8">
            <button 
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
            </button>

    </div>
    </section>
    <section className="lg:px-24 px-2 mobileS:px-8 p-2 flex flex-wrap items-center gap-4">
              <div className={`relative flex w-[400px] p-1 border border-teal-200 rounded-full mb-8`}>
                          <span className={`absolute inset-0 m-1 pointer-events-none`}>
                              <span className={`absolute inset-0 w-1/2 bg-teal-400 rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out 
                              ${order==="desc"?'translate-x-0':'translate-x-full'}`}></span>
                          </span>
                          <button 
                              className={`relative flex-1 text-sm font-medium h-6 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out 
                                  ${order==="desc"? 'text-white' : 'text-slate-400 '}`}
                              onClick={() => {
                                params.set('order','desc');
                                params.delete('display');
                                router.push(currentPath + '?'  + params.toString());}}
                          >リリース日新しい順
                          <span className={`${order==="desc"? 'text-indigo-200' : 'text-slate-400 '}`}></span>
                          </button>
                          <button 
                              className={`relative flex-1 text-sm font-medium h-6 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out 
                                  ${order==="desc"? 'text-slate-400 ' : 'text-white'}`}
                                  onClick={() => {
                                    params.set('order','asc');
                                    params.delete('asc');
                                    router.push(currentPath + '?'  + params.toString());}}
                          >
                          リリース日古い順</button>
              </div>
    </section>
    {/* ストーリー一覧 */}
    <section className="lg:flex px-2 mobileS:px-10 lg:px-16 w-full">
    <section className="grid grid-flow-row-dense items-start gap-4 grid-cols-1 lg:grid-cols-3 w-full">
  
          {data.length===0 
          ?
          <div className="flex flex-col justify-center items-start ">
            <div>検索条件に該当する楽曲がありません</div>
            <div>検索条件を変更してください</div>
          </div>
          :data.map((data, index) => (
          <StoryBlock 
            key={index} 
            storyId={data.story_id}
            category={data.category}
            headTitle={data.head_title}
            infoStory={data.info_id}
            media={data.media}
            storyTitle={data.story_title}
            url={data.url}
          />
          ))}
          </section>
      </section>

    <section className=" pb-48">
    </section>
    </>
  );
}