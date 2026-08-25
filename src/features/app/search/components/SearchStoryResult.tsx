'use client'
import React from "react"
import type { Story, UserReadingData } from '@/data/types';
import m_story from '@/data/m_story.json';
import { HOW_TO_VIEW } from '@/features/common/const/StoryInfoConst';
import CommonFooterContents from "@/features/common/components/common/CommonFooterContents";
import StoryBlock from "@/features/common/components/story/StoryBlock";
import Pagination from "@/features/common/components/Pagination";
import { UseUserReading } from "@/features/app/search/provider/UserReadingProvider";
import { ArrowUp, LoaderIcon } from "lucide-react";


const DISPLAY_CNT: number = 15;

function getSearchResult(
  searchParam:{
    infoIdArray: string[]; categoryArray: string[]; voiceType: number; howtoviewType: number; 
    ppType: number; andor: string; SortedAsc: number; page: number; readLaterType: string;
  }, login: boolean,userReadingData: UserReadingData[] | null
  ):{
    result: {story:Story;readLater:number|null;}[],totalCnt: number,login:boolean
  }
{

  // ストーリー絞り込み
  let story: Story[] = m_story;
  // 閲覧方法
  if(searchParam.howtoviewType===1){
    // 無料
    story = story.filter((data)=>data.howtoviewStory.length<=0||data.howtoviewStory.some((htvData)=>['asb_prem','asb_pur','asb_scode_cd','asb_scode'].includes(htvData)===false));
  }else if(searchParam.howtoviewType===2){
    // アソビストアプレミアム読み放題対象
    story = story.filter((data)=>data.howtoviewStory.includes('asb_prem'));
  }else if(searchParam.howtoviewType===3){
    // 有償購入のみ
    story = story.filter((data)=>data.howtoviewStory.some((htvData)=>['asb_prem','asb_pur','asb_scode_cd','asb_scode'].includes(htvData)));
  }
  // PP
  if(searchParam.ppType===1) story = story.filter((data)=>data.pp>0);
  // ボイス
  if(searchParam.voiceType===1){
    story = story.filter((data)=>data.voice===1);
  }else if(searchParam.voiceType===2){
    story = story.filter((data)=>data.voiceAtRelease===1&&data.voice===0);
  }
  // カテゴリ
  if(searchParam.categoryArray.length>0){
    story = story.filter((data)=>searchParam.categoryArray.includes(data.category));
  }
  // アイドル・ユニット
  if(searchParam.infoIdArray.length>0){
    if(searchParam.andor==='and'&&searchParam.infoIdArray.length>1){
      // 全員が該当
      story = story.filter((storyData)=>{
        if(searchParam.infoIdArray.every((targetInfoId)=>storyData.infoStory.some((infoStroyData)=>infoStroyData.infoId===targetInfoId))){
          return storyData;
        }
      });
    }else{
      // 誰かが該当
      const storyInfo:{storyId:string; infoId:string}[] = [];
      story.forEach((storyData=>{
        storyData.infoStory.forEach((infoData)=>storyInfo.push({storyId:storyData.storyId,infoId:infoData.infoId}))
      }));
      const storyInfoResult = storyInfo.filter(data => searchParam.infoIdArray.includes(data.infoId)).map((data)=>data.storyId);
      story = story.filter((data)=>storyInfoResult.includes(data.storyId));
    }
  }

  // 既読系情報
  let storyResult:{story:Story;readLater:number|null;}[];
  if(login&&userReadingData!==null){
    storyResult = story.map((data)=>{
      const readLater = userReadingData?.find((readingData)=>readingData.story_id===data.storyId)?.read_later;
      return {
        story:data,
        readLater:userReadingData===null||readLater===undefined
          ?null
          :readLater
      }
    });
    if(searchParam.readLaterType==='r'){
      storyResult = storyResult.filter((data)=>data.readLater===0)
    }else if(searchParam.readLaterType==='n'){
      storyResult = storyResult.filter((data)=>data.readLater!==1)
    }
  }else{
    storyResult = story.map((data)=>{return {story:data,readLater:null}})
  }

  const page: number 
    = searchParam.page<1
      ?1
      :searchParam.page>story.length
        ?story.length
        :searchParam.page
  ;
  
  return {result:storyResult.slice(DISPLAY_CNT*(page-1),(DISPLAY_CNT*page)), totalCnt:story.length, login:login};
}

export default function SearchStoryResult({ searchParam }: { searchParam:{infoIdArray: string[]; categoryArray: string[]; voiceType: number; howtoviewType: number; ppType: number; andor: string; SortedAsc: number; page: number; readLaterType: string;} }) {

  const {
    login,
    userReadingData,
    isLoading,
  } = UseUserReading();
  const post = getSearchResult(searchParam,login,userReadingData);
  const resultData:{story:Story;readLater:number|null;}[] = post.result;
  const totalCnt:number = post.totalCnt;

  // ページネーション
  const maxPage: number = Math.ceil(totalCnt/DISPLAY_CNT);

  if(isLoading===true){
    return(
      <div className="my-6 mx-auto">
        <LoaderIcon
          size={32}
          color="#a8a8a8"
          className="animate-pulse animate-spin"
        />
      </div>
    )
  }

  return (
  <>
    <div className="mx-auto  gap-4">
      <div id="topPagination_5" key="topPagination_5" className="tablet:hidden flex mx-auto"><Pagination totalPage={maxPage} maxDisplayNum={5} scrollAreaElementId={undefined} scrollTargetElementId="topPagination_5"/></div>
      <div id="topPagination_7" key="topPagination_7" className="tablet:flex hidden mx-auto"><Pagination totalPage={maxPage} maxDisplayNum={7} scrollAreaElementId='storyScrollArea' scrollTargetElementId="topPagination_7"/></div>
    </div>
    {/* ストーリー一覧 */}
    <div className="lg:flex px-2 mobileM:px-8 tablet:px-4 w-full">
      <div className="grid grid-flow-row-dense items-start gap-4 grid-cols-1 w-full">
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
            storyId={data.story.storyId}
            category={data.story.category}
            website={data.story.website}
            headTitle={data.story.headTitle}
            infoStory={data.story.infoStory}
            releaseDate={data.story.releaseDate}
            howtoviewStory={data.story.howtoviewStory}
            media={data.story.media}
            storyTitle={data.story.storyTitle}
            url={data.story.url}
            pp={data.story.pp}
            login={post.login}
            userReadLater={post.login?data.readLater:null}
            displayLogin={true}
          />
          ))}
        </>
      </div>
    </div>
    <div className="mx-auto  gap-4">
      <div key='buttomPagination_5'id='buttomPagination_5' className="tablet:hidden flex mx-auto">
        <Pagination totalPage={maxPage} maxDisplayNum={5} scrollAreaElementId={undefined} scrollTargetElementId="topPagination_5"/>
      </div>
      <div key='buttomPagination_7' id='buttomPagination_7' className="tablet:flex hidden mx-auto">
        <Pagination totalPage={maxPage} maxDisplayNum={7} scrollAreaElementId='storyScrollArea' scrollTargetElementId="topPagination_7"/>
      </div>
    </div>
    <footer className='mt-24'>
      <div className="w-full  h-12">
        <button className="flex w-full h-full bg-indigo-200 
          transition-all duration-100
          hover:outline-indigo-400 hover:outline-4 
          outline-none outline-indigo-600/30 outline-offset-0"
          onClick={()=>{
            const element = document.getElementById('storyScrollArea');
            if(element!==null)element.scrollTo({top:0,behavior:'smooth'});
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          <div className="flex items-center m-auto text-xl font-bold text-indigo-600">
            <ArrowUp className="w-[28px] stroke-[3px] mr-1"/>
            {'ページの先頭へ'}
          </div>
        </button>
      </div>
      <CommonFooterContents />
    </footer>
  </>
  );
}