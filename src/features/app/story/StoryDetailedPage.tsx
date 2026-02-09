
import { Suspense } from "react";
import React from "react"
import { Toaster } from "@/components/ui/sonner";
import CopyButton from "@/features/common/components/CopyButton";
import GetUnitIdolName from "@/features/common/utils/GetUnitIdolName";
import type { Story,InfoStory,ShareModalTabInfo } from '@/data/types';
import {
   GetStoryMediaName,GetStoryCategoryName,GetStoryWebsiteName,GetVoiceStateName,GetStoryHowtoviewName 
} from '@/features/common/utils/Story/GetStoryInfomation';
import { MEDIA,CATEGORY,WEBSITE,HOW_TO_VIEW } from '@/features/common/const/StoryInfoConst'
import IdolBadge from '@/features/common/components/IdolBadge';
import CategoryBadge from '@/features/common/components/story/CategoryBadge';
import MediaBadge from '@/features/common/components/story/MediaBadge';
import SetLocalDateCookie  from "@/features/common/utils/SetLocalDateCookie";
import StoryBlock from "@/features/common/components/story/StoryBlock";
import {ShareModalButton} from "@/features/app/shareModal/ShareModalButton";
import StoryReadButton from "./components/StoryReadButton";
import StoryReadEditButton from "./components/StoryReadEditButton";
import StoryReadLaterButton from "./components/StoryReadLaterButton";
import StoryReadLaterEditButton from "./components/StoryReadLaterEditButton";

export default async function StoryDetailedPage(
  { resultData }: { resultData:{storyData:Story, login:boolean, isRead:boolean, isReadLeater:boolean, readingDate:string}})
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
  
  const releaseDate: string 
    = new Date(
        Number(storyData.releaseDate.substring(0,4))
        ,Number(storyData.releaseDate.substring(5,7))-1
        ,Number(storyData.releaseDate.substring(9,11))).toLocaleDateString();

  // シェア文章
  let shareText: string = '';
  if (storyData.media===MEDIA.proe.id){
    if (storyData.category===CATEGORY.idolOneFrame.id){
      shareText = `【${categoryName}】\n${storyData.headTitle === null || storyData.headTitle === ''?'':`《${storyData.headTitle}》\n`}${storyData.storyTitle}  |  <サイト名>\n#SideM #search315`
    } else {
      shareText = `【${categoryName}ストーリー】\n${storyData.headTitle === null || storyData.headTitle === ''?'':`《${storyData.headTitle}》\n`}${storyData.storyTitle}  |  <サイト名>\n#SideM #search315`
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
  const tabs: ShareModalTabInfo[] = storyData.url===null||storyData.url===''
    ?[{id:'search315', title:'サーチ315', disabled:false, shareText:shareText.replace('<サイト名>','サーチサイコー'), shareUrl:`https://search315.com/`+'story/'+storyData.storyId}]
    :[
      {id:storyData.website, title:websiteName, disabled:false,shareText:shareText.replace('<サイト名>',websiteName),shareUrl:storyData.url},
      {id:'search315', title:'サーチ315', disabled:false, shareText:shareText.replace('<サイト名>','サーチサイコー'), shareUrl:`https://search315.com/`+'story/'+storyData.storyId}
    ];

  // 検索文字列
  let searchText: string = '';
  if(CATEGORY.mobaEvent.id===storyData.category||CATEGORY.comicSpecial.id===storyData.category){
    searchText = `SideM+${storyData.storyTitle}`;
  } else if(storyData.media===MEDIA.gs.id){
    if(CATEGORY.gsEvent.id===storyData.category){
      searchText = `サイスタ+イベントストーリー+${storyData.headTitle}`;
    } else {
      searchText = `サイスタ+${categoryName}+${storyData.storyTitle}`;
    }
  };

  return (
  <>
    <title>{`${storyData.storyTitle} ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
    <Toaster position="top-center"/>
    <section className="mb-2 bg-gradient-to-r from-gray-500 from-50% rounded">
    <SetLocalDateCookie />
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
        <p className="pr-2">{'ストーリー'}</p>
      </div>
    </section>

    <section className="">
      <div className='flex flex-wrap relative text-sm tablet:text-xl font-mono font-bold text-white gap-1 mb-1'>
        <CategoryBadge id={storyData.category} size={'normal'}/>
        <MediaBadge id={storyData.media} size={'normal'}/>
        <div className='flex flex-wrap relative text-xs tablet:text-sm font-mono text-white gap-1 pl-2 my-auto '>
          {voiceStateName===''
            ?<></>
            :<div className="justify-center text-red-500 border border-red-500 rounded-sm p-1">{voiceStateName}</div>
          }
          {storyData.still===0
            ?<></>
            :<div className="justify-center text-red-500 border border-red-500 rounded-sm p-1">{'スチル'+storyData.still+'枚'}</div>
          }
        </div>
      </div>
      <div>
        {storyData.website!=='asb' || storyData.howtoviewStory===null || storyData.howtoviewStory.length===0
          ?<></>
          :
          <div className='flex w-fit rounded-sm text-xs tablet:text-sm font-mono text-black mb-1'>
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
          </div>
        }
        <div className='mb-1 flex flex-col'>
          <div className="text-base mobileM:text-xl tablet:text-2xl font-mono font-bold inline-block">
              {storyData.headTitle}
          </div>
          <div className="text-2xl mobileM:text-3xl tablet:text-4xl font-mono font-bold inline-block">
              {storyData.storyTitle}
          </div>
        </div>

        <div className='flex w-fit lg:text-base text-sm font-sans text-slate-600 mb-2'>
          <a className="">{releaseDate}</a>
          <a className="">{'更新'}</a>
        </div>


        {infoStoryPerson.length === 0
          ?<></>
          :<>
            <div className='flex flex-wrap relative text-sm font-mono gap-y-2 gap-x-1 tablet:gap-y-1 tablet:gap-x-2 mb-8'>
              {infoStoryPerson.length === 49
                //対象アイドルが49人の場合、「315プロダクション」表記
                ?<div><IdolBadge id={'315pro'} useShortName={0} size={'normal'}/></div>
                :infoStoryPerson.map(
                  (result, index) => (<IdolBadge id={result.infoId} useShortName={0} size={'normal'} key={index}/>))
              }
            </div>
          </>
        }

        {/* ボタン */}
        <div className='flex flex-wrap gap-4 my-6'>
          <div 
            className={`h-10 tablet:w-1/2 w-full
              ${storyData.url===null||storyData.url===''?' hidden':''}`}>
            <a 
              className=""
              href={storyData.url}
              target="_blank" rel="noopener noreferrer"
            >
              <button
                className='rounded-lg border-2 border-gray-600 w-full h-full
                font-sans leading-tight text-white bg-gray-600 fill-white
                transition-all duration-200 ease-out
                hover:ring-2 hover:ring-gray-600 hover:ring-offset-2 
                active:scale-90
                text-sm mobileL:text-base lg:text-lg'>
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
          <div className='flex flex-wrap gap-2'>
            {isRead
              ?
              <StoryReadEditButton
                storyId={storyData.storyId} readingDate={resultData.readingDate}
              />
              :
              <StoryReadButton
                storyId={storyData.storyId} login={login} isRead={isRead} isReadLeater={isReadLeater}
              />
            }
            {isReadLeater
              ?
              <StoryReadLaterEditButton
                storyId={storyData.storyId} login={login} isRead={isRead} isReadLeater={isReadLeater}
              />
              :
              <StoryReadLaterButton
                storyId={storyData.storyId} login={login} isRead={isRead} isReadLeater={isReadLeater}
              />
            }
            <ShareModalButton
              buttonText="共有"
              initTabId=''
              tabs={tabs}
            />
            <CopyButton 
              copyText={storyData.storyTitle} 
              buttonText={'タイトルコピー'}
              tootipText={'タイトルをコピーしました'}
              placement='bottom'
            />
            <div 
              className={` ${searchText===''&&' hidden'}`}>
              <a 
                className=""
                href={'https://www.google.com/search?q='+searchText}
                target="_blank" rel="noopener noreferrer">
                <button
                  className='
                    flex py-2 px-2 tablet:px-5 rounded-full bg-zinc-100 items-center w-fit h-fit
                    font-mono text-xs mobileL:text-sm tablet:text-base 
                    transition-all duration-300
                    hover:ring-2 hover:ring-zinc-600 hover:ring-offset-2 hover:bg-zinc-200
                    active:scale-90'>
                    {'Googleで検索'}
                    <span className="h-fit mobileL:h-[24px]">
                      <svg className="inline-block w-[15px] h-[15px] mobileL:w-[18px] mobileL:h-[18px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                    </span>
                </button>
              </a>
            </div>
          </div>
        </div>

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
              <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path>
            </svg>
            {'各話'}
          </div>
          <div className={`
            items-start gap-2 grid-cols-1 mt-2 ml-8
            grid max-w-[700px]`}>
            {storyData.mSubStory.map((result, index) => {
              // サブストーリー用シェア文章
              let subShareText: string = '';
              if(storyData.media===MEDIA.moba.id&&storyData.category===CATEGORY.dailyOneFrame.id){
                //日常での１コマ
                subShareText = `【${mediaName} - ${categoryName}】\n${result.subStoryTitle}  |  <サイト名>\n#SideM #search315`;
              } else if(storyData.media===MEDIA.moba.id&&(storyData.category===CATEGORY.comicSpecial.id||storyData.category===CATEGORY.comicNomral.id)){
                //雑誌
                subShareText = `【${mediaName} - ${categoryName} - ${storyData.storyTitle}】\n${
                  storyData.media === 1 && ['comicn','comics'].includes(storyData.category) && !(result.infoSubStory===null || result.infoSubStory.length===0)
                  ?GetUnitIdolName(result.infoSubStory[0].infoId,0,1):''
                }「${result.subStoryTitle}」  |  <サイト名>\n#SideM #search315`;
              } else {
                //そのほか
                subShareText = `【${mediaName} - ${categoryName} - ${storyData.storyTitle}】\n${result.subStoryTitle}  |  <サイト名>\n#SideM #search315`;
              };
              const subTabs: ShareModalTabInfo[] = storyData.url===null||storyData.url===''
                ?[{id:'search315', title:'サーチ315', disabled:false, shareText:subShareText.replace('<サイト名>','サーチサイコー'), shareUrl:`https://search315.com/`+'story/'+storyData.storyId}]
                :[
                  {id:storyData.website, title:websiteName, disabled:false,shareText:subShareText.replace('<サイト名>',websiteName),shareUrl:storyData.url},
                  {id:'search315', title:'サーチ315', disabled:false, shareText:subShareText.replace('<サイト名>','サーチサイコー'), shareUrl:`https://search315.com/`+'story/'+storyData.storyId}
                ];

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
                            '>
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
                      <ShareModalButton
                        buttonText=""
                        initTabId=''
                        tabs={subTabs}
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
          </div>
        </>}
      </div>
      <div>
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
                <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z"></path>
              </svg>
              {'関連ストーリー'}
            </div>
            <div className={`
                items-start gap-4 grid-cols-1 mt-2
                grid
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
            </div>
          </>
        }
      </div>
    </section>
  </>
    );
  }