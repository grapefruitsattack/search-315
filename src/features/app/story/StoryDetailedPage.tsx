
import React from "react"
import CopyButton from "@/features/common/components/CopyButton";
import GetUnitIdolName from "@/features/common/utils/GetUnitIdolName";
import {ShareModal} from "@/features/app/shareModal/ShareModal";
import {ShareSearch315Modal} from "@/features/app/shareModal/ShareSearch315Modal";
import { auth } from "@/auth";
import { createClient } from '@supabase/supabase-js'
import {SignIn,SignOut} from "../../management/auth/SignIn";
import type { Story,InfoStory } from '../../../data/types';
import { GetStoryMediaName,GetStoryCategoryName,GetStoryWebsiteName,GetVoiceStateName,GetStoryHowtoviewName } from '@/features/common/utils/Story/GetStoryInfomation';
import { MEDIA,CATEGORY,WEBSITE,HOW_TO_VIEW } from '@/features/common/const/StoryInfoConst'
import IdolBadge from '@/features/common/components/IdolBadge';
import CategoryBadge from '@/features/common/components/story/CategoryBadge';
import MediaBadge from '@/features/common/components/story/MediaBadge';
import SetLocalDateCookie  from "@/features/common/utils/SetLocalDateCookie";
import GetLocalDate  from "@/features/common/utils/GetLocalDate";
import StoryReadingButton from "./components/StoryReadingButton";
import { Suspense } from "react";
import StoryBlock from "@/features/common/components/story/StoryBlock";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

export default async function StoryDetailedPage(
  { resultData }: { resultData:{storyData:Story, login:boolean, isRead:boolean, isReadLeater:boolean;}})
  : Promise<JSX.Element> 
{
  const storyData: Story = resultData.storyData;
  const login: boolean = resultData.login;
  const isRead: boolean = resultData.isRead;
  const isReadLeater: boolean = resultData.isReadLeater;

  const websiteName: string = GetStoryWebsiteName(storyData.website);
  const voiceStateName: string = GetVoiceStateName(storyData.voice,storyData.voiceAtRelease);
  const mediaName: string = GetStoryMediaName(storyData.media);
  const categoryName: string = GetStoryCategoryName(storyData.category);
  const infoStoryPerson: InfoStory[] = storyData.infoStory.filter(storyData=>storyData.personFlg===1);
  
  const localDate: string = await GetLocalDate();

  // シェア文章
  let shareText: string = '';
  if (storyData.media===MEDIA.proe.id){
    if(storyData.headTitle === null || storyData.headTitle === ''){
      // アイマスポータル ヘッダータイトルなし
      shareText = `【${categoryName}】\n${storyData.storyTitle}  |  <サイト名>\n#SideM #search315`;
    } else{
      // アイマスポータル ヘッダータイトルあり
      shareText = `【${categoryName}】\n［${storyData.headTitle}］${storyData.storyTitle}  |  <サイト名>\n#SideM #search315`
    }
  }else if(storyData.media===MEDIA.moba.id){
    if(storyData.category===CATEGORY.dailyOneFrame.id){
      // モバエム 日常ひとコマ
      shareText = `【${mediaName}アーカイブ】\n${storyData.storyTitle}  |  <サイト名>\n#SideM #search315`;
    } else if(storyData.category===CATEGORY.mobaEvent.id){
      // モバエム イベスト
      shareText = `【${mediaName}アーカイブ】\nイベスト「${storyData.storyTitle}」  |  <サイト名>\n#SideM #search315`;
    } else{
      // モバエム 上記以外
      shareText = `【${mediaName}アーカイブ】\n${categoryName}「${storyData.storyTitle}」  |  <サイト名>\n#SideM #search315`;
    }
  }else if(storyData.media===MEDIA.gs.id){
    if(storyData.category===CATEGORY.main.id){
      // サイスタ メインスト
      shareText = `【${mediaName}アーカイブ】\nメインスト ${storyData.headTitle}「${storyData.storyTitle}」  |  <サイト名>\n#SideM #search315`;
    } else if(storyData.category===CATEGORY.gsEvent.id){
      // サイスタ イベスト
      shareText = `【${mediaName}アーカイブ】\n イベスト「${storyData.headTitle} - ${storyData.storyTitle}」  |  <サイト名>\n#SideM #search315`;
    } else{
      // サイスタ 上記以外
      shareText = `【${mediaName}アーカイブ】\n${categoryName}「${storyData.storyTitle}」  |  <サイト名>\n#SideM #search315`;
    }
  } else {
    shareText = `【${categoryName} - ${mediaName}アーカイブ】\n${storyData.storyTitle}  |  <サイト名>\n#SideM #search315`
  };

  // 検索文字列
  let searchText: string = '';
  if(CATEGORY.mobaEvent.id===storyData.category||CATEGORY.comicSpecial.id===storyData.category){
    searchText = `モバエム+${storyData.storyTitle}`;
  } else if(storyData.media===MEDIA.gs.id){
    if(CATEGORY.gsEvent.id===storyData.category){
      searchText = `サイスタ+イベントストーリー+${storyData.headTitle}`;
    } else {
      searchText = `サイスタ+${categoryName}+${storyData.storyTitle}`;
    }
  };

    return (
        <>
        <title>{  `${storyData.storyTitle} ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
        <section className="mb-2 bg-gradient-to-r from-green-500/70 from-50% rounded">
        <SetLocalDateCookie />
          <div 
            className="
              flex items-center w-full ml-2
              text-2xl font-mono
              text-white 
              gap-2"
          >
            {/* Google Fonts Icons */}
            <svg className="fill-green-500 bg-white rounded px-[0.5px]" xmlns="http://www.w3.org/2000/svg" height="24px" width="26px" viewBox="10 -960 960 960">
              <path d="M260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z"/>
            </svg>
            <p className="pr-2">
              {'ストーリー'}
            </p>
          </div>
        </section>

        {storyData.website!=='asb' || storyData.howtoviewStory===null || storyData.howtoviewStory.length===0
        ?<></>
        :<section className='flex w-fit rounded-sm text-xs tablet:text-sm font-mono text-black mb-1'>
          <a className=" text-black p-1">{'閲覧方法：'}</a>
          {storyData.howtoviewStory.map((result, index) => (
          <a key={index} className="justify-center text-orange-900 bg-orange-200 rounded-sm p-1 mr-1">{GetStoryHowtoviewName(result)}</a>
          ))}
        {/* {storyData.howtoviewStory.length===0
        ?<a className=" text-orange-800 p-1">{'ログイン不要'}</a>
        :<>
        {storyData.howtoviewStory.map((result, index) => (
        <a key={index} className="text-orange-800 p-1">{GetStoryHowtoviewName(result)}</a>
        ))}</>
        } */}
        </section>
        }

        <section className='flex flex-wrap relative text-xs tablet:text-sm font-mono text-white gap-1 mb-2'>
          {voiceStateName===''
            ?<></>
            :<div className="justify-center text-red-500 border border-red-500 rounded-sm p-1">{voiceStateName}</div>
          }
          {storyData.still===0
            ?<></>
            :<div className="justify-center text-red-500 border border-red-500 rounded-sm p-1">{'スチル'+storyData.still+'枚'}</div>
          }
        </section>

        <section className='flex flex-wrap relative text-sm tablet:text-xl font-mono font-bold text-white gap-1 mb-1'>
          <CategoryBadge id={storyData.category} size={'normal'}/>
          <MediaBadge id={storyData.media} size={'normal'}/>
        </section>

        <section className='mb-2 flex flex-col'>
          <div className="text-base mobileM:text-xl tablet:text-2xl font-mono font-bold inline-block">
              {storyData.headTitle}
          </div>
          <div className="text-2xl mobileM:text-3xl tablet:text-4xl font-mono font-bold inline-block">
              {storyData.storyTitle}
          </div>
        </section>

      {
        infoStoryPerson.length === 0
            ?<></>
            :<>

              <section className='flex flex-wrap relative text-sm font-mono gap-1 mb-8'>
                {infoStoryPerson.length === 49
                  //対象アイドルが49人の場合、「315プロダクション」表記
                  ?<div><IdolBadge id={'315pro'} useShortName={0} size={'normal'}/></div>
                  :infoStoryPerson.map(
                    (result, index) => (<div key={index}><IdolBadge id={result.infoId} useShortName={0} size={'normal'}/></div>))
                  }
              </section>
            </>
      }

        {/* ボタン */}
        <div className='
            grid lg:w-1/2 
            grid-cols-2 gap-[5px]
        '>
          {storyData.url===null||storyData.url===''
            ?<></>
            :
            <div className='col-span-2 h-fit'>
                <a className=""
                href={storyData.url}
                target="_blank" rel="noopener noreferrer">
                    <button
                        className='rounded-lg border-2 border-red-500 w-full h-full
                        text-red-500 font-sans leading-tight
                        hover:bg-red-500 hover:text-red-100 
                        transition-all duration-500 ease-out
                        fill-red-500 hover:fill-red-50
                        text-sm mobileL:text-base lg:text-lg
                        '
                    >
                        <div className='
                          flex flex-wrap justify-center items-center font-sans font-black 
                          mobileM:my-0.5 my-1 
                        '>
                            {websiteName+'で読む'}
                            <span className="">
                            <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                            </span>
                        </div>
                    </button>
                </a>
            </div>
          }
          <div className='col-span-1'
          >
            {storyData.url===null||storyData.url===''
            ?
            <ShareSearch315Modal 
              shareText={shareText}
              buttonText=""
              pass={'story/'+storyData.storyId}
            />
            :
              <ShareModal 
                shareUrl={storyData.url}
                shareSiteTitle={websiteName}
                shareText={shareText}
                buttonText=""
                pass={'story/'+storyData.storyId}
              />
            }
            </div>
          <div className='col-span-1'
          >
              <CopyButton 
                  copyText={storyData.storyTitle} 
                  buttonText={'タイトルコピー'}
                  tootipText={'タイトルをコピーしました'}
                  placement='bottom'
              />
            </div>
            {searchText!==''
            ?
            <div className='col-span-2 h-fit'>
                <a className=""
                href={'https://www.google.com/search?q='+searchText}
                target="_blank" rel="noopener noreferrer">
                    <button
                        className='rounded-lg border-2 border-pink-500 w-full h-full
                        text-pink-500 font-sans leading-tight
                        hover:bg-pink-500 hover:text-pink-100 
                        transition-all duration-500 ease-out
                        fill-red-500 hover:fill-pink-50
                        text-sm mobileL:text-base lg:text-lg
                        '
                    >
                        <div className='
                          flex flex-wrap justify-center items-center font-sans font-black 
                          mobileM:my-0.5 my-1 
                        '>
                          {'Googleで検索'}
                            <span className="">
                            <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                            </span>
                        </div>
                    </button>
                </a>
            </div>
            :<></>}
        </div>
        {/* 既読系ボタン */}
        {storyData.url===null||storyData.url===''
          ?<></>
          :<>
            <div 
              className="
                  mobileL:text-2xl text-xl font-mono flex items-center w-full
                  after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
                  mt-5
              "
            >
              <svg className="fill-cyan-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960">
                <path d="M320-320h480v-480h-80v280l-100-60-100 60v-280H320v480Zm0 80q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm360-720h200-200Zm-200 0h480-480Z"/>
              </svg>
              {'閲覧データ管理'}
            </div>
            <div className='
                pt-4 pb-2
                lg:w-1/2 
                h-full
            '>
                <Suspense>
                  <StoryReadingButton 
                    storyId={storyData.storyId} login={login} isRead={isRead} isReadLeater={isReadLeater}
                    />
                </Suspense>
            </div>
          </>
          }
      
        {/* サブストーリー */}
        {storyData.mSubStory===null || storyData.mSubStory.length===0
        ?<></>
        :<>
        <div 
          className="
              mobileL:text-2xl text-xl font-mono flex items-center w-full
              after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
              mt-5
          "
        >
          <svg className="fill-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
          <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path></svg>
          {'各話'}
        </div>
          <section className={`
              items-start gap-2 grid-cols-1 mt-2 ml-8
              grid max-w-[700px]
          `}>
            {storyData.mSubStory.map((result, index) => {
              // サブストーリー用シェア文章
              let shareText: string = '';
                if(storyData.media===MEDIA.moba.id&&storyData.category===CATEGORY.dailyOneFrame.id){
                  //日常での１コマ
                  shareText = `【${mediaName} - ${categoryName}】\n${result.subStoryTitle}  |  <サイト名>\n#SideM #search315`;
                } else if(storyData.media===MEDIA.moba.id&&(storyData.category===CATEGORY.comicSpecial.id||storyData.category===CATEGORY.comicNomral.id)){
                  //雑誌
                  shareText = `【${mediaName} - ${categoryName} - ${storyData.storyTitle}】\n${
                    storyData.media === 1 && ['comicn','comics'].includes(storyData.category) && !(result.infoSubStory===null || result.infoSubStory.length===0)
                    ?GetUnitIdolName(result.infoSubStory[0].infoId,0,1):''
                  }「${result.subStoryTitle}」  |  <サイト名>\n#SideM #search315`;
                } else {
                  //そのほか
                  shareText = `【${mediaName} - ${categoryName} - ${storyData.storyTitle}】\n${result.subStoryTitle}  |  <サイト名>\n#SideM #search315`;
                }
              return(
                <div key={Number(result.subStoryNo)} className="bg-white border-orange-700/30 border-t-4 border-l-4 bg-orange-50/50 text-xl">
                  <div className=" text-xl ">
                  {/* モバエム雑誌のときのみアイドル名を表示 */}
                  {storyData.media === 1 && ['comicn','comics'].includes(storyData.category) && !(result.infoSubStory===null || result.infoSubStory.length===0)
                  &&
                    <div className={`w-fit`}>
                    <IdolBadge id={result.infoSubStory[0].infoId} useShortName={0} size={'block'}/>
                    </div>
                  }
                    {result.subStoryTitle}
                  </div>
                  {/* サブストーリーボタン部  */}
                  <div className='
                      grid grid-cols-5 mt-1 gap-[5px] 
                      
                  '>
                    <div className='col-span-3'>
                        <a className=""
                        href={result.url}
                        target="_blank" rel="noopener noreferrer">
                            <button
                                className='rounded-lg border-2 border-red-500 w-full h-full
                                text-red-500 font-sans leading-tight
                                hover:bg-red-500 hover:text-red-100 
                                transition-all duration-500 ease-out
                                fill-red-500 hover:fill-red-50 
                                text-sm mobileL:text-base lg:text-lg
                                '
                            >
                                <div className='
                                  flex flex-wrap justify-center items-center font-sans font-black 
                                  mobileM:my-0.5 my-1 
                                '>
                                    {websiteName}
                                    <span className="">
                                    <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                                    </span>
                                </div>
                            </button>
                        </a>
                    </div>
                    <div>
                      <ShareModal 
                        shareUrl={result.url}
                        shareSiteTitle={websiteName}
                        shareText={shareText}
                        // shareText={`${storyData.media === 1&&storyData.category==='dof'?'':'【'+categoryName+'】'}${storyData.storyTitle}${
                        //   storyData.media === 1 && ['comicn','comics'].includes(storyData.category) && !(result.infoSubStory===null || result.infoSubStory.length===0)
                        //   ?'　'+GetUnitIdolName(result.infoSubStory[0].infoId,0,1):''
                        // }「${result.subStoryTitle}」`}
                  //shareText={`${storyData.media === 1&&storyData.category==='dof'?'':'【#SideM '+categoryName+'】\n'}${storyData.storyTitle}  |  <サイト名>\n#search315`}
                        buttonText=""
                        pass={'story/'+storyData.storyId}
                      />
                    </div>
                    <CopyButton 
                        copyText={result.subStoryTitle} 
                        buttonText={''}
                        tootipText={'タイトルをコピーしました'}
                        placement='bottom'
                    />
                  </div>
                </div>
              )
            })}

          </section>

        </>}

        {/* 関連ストーリー */}
        {storyData.relationStory===null || storyData.relationStory.length===0
        ?<></>
        :<>
          <div 
            className="
                mobileL:text-2xl text-xl font-mono flex items-center w-full
                after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
                mt-8
            "
          >
            <svg className="fill-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
            <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path></svg>
            {'関連ストーリー'}
          </div>
          <section className={`
              items-start gap-4 grid-cols-1 lg:grid-cols-2 mt-2
              lg:grid grid       
          `}>
            {storyData.relationStory.map((result, index) => (
            <StoryBlock 
              key={index} 
              storyId={result.storyId} 
              media={result.media} 
              category={result.category} 
              website={result.website}
              headTitle={result.headTitle} 
              storyTitle={result.storyTitle} 
              infoStory={result.infoStory} 
              url={result.url} 
              login={false}
              userReadLater={0}
              displayLogin={false}
            />
            ))}

          </section>
        </>
        }

        </>
      );
  }