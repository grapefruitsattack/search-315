
import { headers } from "next/headers";
import React from "react"
import { useRouter } from 'next/navigation'
import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
import type { StorySearchResult,StoryTemp } from '@/data/types';
import m_story from '@/data/m_story.json';
import StoryBlock from "@/features/common/components/story/StoryBlock";
import Pagination from "@/features/common/components/Pagination";

async function getUserData():Promise<{
    login:boolean, userReadingData: {story_id: string; read_later: number;}[] | null
  }>
{
  const session = await auth.api.getSession({
      headers: await headers(),
  });
  const supabase = session?.user
    ?await createSupabaseClientWithLogin(session)
    :await createSupabaseClient()
  ;
  const userId: string | null
    = session?.user
      ?session.user.id||null
      :null;

    const {data, error} = (
      await supabase.from('user_reading').select(`
        story_id,
        read_later
      `).eq('id',userId)
    );

  return {login:session?.user?true:false,userReadingData:data};
}

async function getSearchResult(
  searchParam:{
    infoIdArray: string[]; categoryArray: string[]; voiceType: number; howtoviewType: number; 
    ppType: number; andor: string; SortedAsc: number; page: number; readLaterType: string;
  }
  ):Promise<{
    result: {story:StoryTemp;readLater:number|null;}[],totalCnt: number,login:boolean
  }>
{
  // ここのgetUserData()を初回のみ実施したい
  const userData = await getUserData();

  // ストーリー絞り込み
  let story: StoryTemp[] = m_story;
  // 閲覧方法
  if(searchParam.howtoviewType===1){
    // 無料
    story = story.filter((data)=>data.howtoviewStory.some((htvData)=>['asb_prem','asb_pur','asb_scode_cd','asb_scode'].includes(htvData)===false));
  }else if(searchParam.howtoviewType===2){
    // アソビストアプレミアム読み放題対象
    story = story.filter((data)=>data.howtoviewStory.includes('asb_prem'));
  }else if(searchParam.howtoviewType===3){
    // 有償購入のみ
    story = story.filter((data)=>data.howtoviewStory.includes('asb_prem')===false);
    story = story.filter((data)=>data.howtoviewStory.some((htvData)=>['asb_pur','asb_scode_cd','asb_scode'].includes(htvData)));
  }
  // PP
  if(searchParam.ppType===1) story = story.filter((data)=>data.pp>0);
  // ボイス
  if(searchParam.voiceType===1||searchParam.voiceType===2){
    story = story.filter((data)=>data.voice===searchParam.voiceType);
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
  let storyResult:{story:StoryTemp;readLater:number|null;}[];
  if(userData.login&&userData.userReadingData!==null){
    storyResult = story.map((data)=>{
      const readLater = userData.userReadingData?.find((readingData)=>readingData.story_id===data.storyId)?.read_later;
      return {
        story:data,
        readLater:userData.userReadingData===null||readLater===undefined
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
  
  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve(
        {result:storyResult, totalCnt:story.length, login:userData.login}
      );
    }, 500); // ある程度の時間をローディング表示
  });
}

export default async function SearchStoryResult({ login,searchParam }: { login:boolean,searchParam:{infoIdArray: string[]; categoryArray: string[]; voiceType: number; howtoviewType: number; ppType: number; andor: string; SortedAsc: number; page: number; readLaterType: string;} }) {

  const post = await getSearchResult(searchParam);
  const resultData:{story:StoryTemp;readLater:number|null;}[] = post.result;
  const totalCnt:number = post.totalCnt;

  // ページネーション
  const pageSize: number = 18;
  const maxPage: number = Math.ceil(totalCnt/pageSize);

  return (
  <>
    <div className="mx-auto  gap-4">
      <div id="topPagination"  className="mobileL:hidden flex mx-auto"><Pagination totalPage={maxPage} maxDisplayNum={5} scrollAreaElementId={undefined} scrollTargetElementId="topPagination"/></div>
      <div className="mobileL:flex hidden mx-auto"><Pagination totalPage={maxPage} maxDisplayNum={7} scrollAreaElementId='storyScrollArea'/></div>
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
            howtoviewStory={data.story.howtoviewStory}
            media={data.story.media}
            storyTitle={data.story.storyTitle}
            url={data.story.url}
            pp={data.story.pp}
            login={login}
            userReadLater={login?data.readLater:0}
            displayLogin={true}
          />
          ))}
        </>
      </div>
    </div>
    <div className="mx-auto  gap-4">
      <div className="mobileL:hidden flex mx-auto"><Pagination totalPage={maxPage} maxDisplayNum={5} scrollAreaElementId={undefined} scrollTargetElementId="topPagination"/></div>
      <div className="mobileL:flex hidden mx-auto"><Pagination totalPage={maxPage} maxDisplayNum={7} scrollAreaElementId='storyScrollArea'/></div>
    </div>
  </>
  );
}