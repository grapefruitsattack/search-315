
import React from "react"
import { Toaster } from "@/components/ui/sonner";
import CopyButton from "@/features/common/components/CopyButton";
import GetUnitIdolName from "@/features/common/utils/GetUnitIdolName";
import type { InfoStory,ShareModalTabInfo,Story,SubStory,UserReadingData,RelationStoryOther } from '@/data/types';
import m_sub_story from '@/data/m_sub_story.json';
import {
   GetStoryMediaName,GetStoryCategoryName,GetStoryWebsiteName,GetVoiceStateName,GetStoryHowtoviewName 
} from '@/features/common/utils/Story/GetStoryInfomation';
import { MEDIA,CATEGORY } from '@/features/common/const/StoryInfoConst'
import IdolBadge from '@/features/common/components/IdolBadge';
import CategoryBadge from '@/features/common/components/story/CategoryBadge';
import MediaBadge from '@/features/common/components/story/MediaBadge';
import SetLocalDateCookie  from "@/features/common/utils/SetLocalDateCookie";
import {ShareModalButton} from "@/features/app/shareModal/ShareModalButton";
import StoryReadButton from "./components/StoryReadButton";
import StoryReadEditButton from "./components/StoryReadEditButton";
import StoryReadLaterButton from "./components/StoryReadLaterButton";
import StoryReadLaterEditButton from "./components/StoryReadLaterEditButton";
import StoryRelation from "./components/StoryRelation";
import { BookOpen, ExternalLink } from "lucide-react";

export default async function StoryDetailedPage(
  { mainStoryData,relationStorysData,relationOtherData,login }
  : {
    mainStoryData:{story:Story,userReadingData:UserReadingData|null}, 
    relationStorysData:{story:Story,userReadingData:UserReadingData|null}[], 
    relationOtherData: RelationStoryOther[],
    login:boolean
  })
  : Promise<JSX.Element> 
{
  const storyData: Story = mainStoryData.story;
  const isRead: boolean = mainStoryData.userReadingData===null?false:mainStoryData.userReadingData.read_later===0;
  const isReadLeater: boolean = mainStoryData.userReadingData===null?false:mainStoryData.userReadingData.read_later===1;

  const websiteName: string = GetStoryWebsiteName(storyData.website);
  const voiceStateName: string = GetVoiceStateName(storyData.voice,storyData.voiceAtRelease);
  const mediaName: string = GetStoryMediaName(storyData.media);
  const categoryName: string = GetStoryCategoryName(storyData.category);
  const infoStoryPerson: InfoStory[] = storyData.infoStory.filter(storyData=>storyData.personFlg===1);
  const subStorys: SubStory[] = m_sub_story.filter((data)=>data.storyId===storyData.storyId).reverse();
  const displaySubStoryReleaseDate: boolean = subStorys.some(data=>data.releaseDate!==storyData.releaseDate);

  const releaseDate: string 
    = storyData.releaseDate===''
      ?''
      :new Date(
        Number(storyData.releaseDate.substring(0,4))
        ,Number(storyData.releaseDate.substring(4,6))-1
        ,Number(storyData.releaseDate.substring(6,9))).toLocaleDateString("ja-JP");

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
    searchText = `SideM ${storyData.storyTitle}`;
  } else if(storyData.media===MEDIA.gs.id){
    if(CATEGORY.gsEvent.id===storyData.category){
      searchText = `サイスタ イベントストーリー ${storyData.storyTitle}`;
    } else {
      searchText = `サイスタ ${storyData.storyTitle.replace("｜", " ")}`;
    }
  };

  const searchUrl = new URL("https://www.google.com/search");
  searchUrl.searchParams.set("q", searchText.replace(/[-]/g, ""));

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

        <BookOpen className="text-gray-500 bg-white rounded px-[0.5px] w-[20px] h-[18px] tablet:w-[24px] tablet:h-[22px]"/>
        <p className="pr-2">{'ストーリー'}</p>
      </div>
    </section>

    <section className="">
        <div className='flex flex-wrap relative text-xs tablet:text-sm font-mono text-white gap-2 ml-1 my-auto mb-2'>
          
          <div className='flex flex-wrap relative text-xs tablet:text-sm font-mono text-white gap-1 pl-1 my-auto '>
            {storyData.howtoviewStory.length<=0&&(storyData.url!==null&&storyData.url!=='')
              ?<div className="justify-center font-bold text-red-500 border border-red-500 rounded-sm p-1">{'ログイン不要'}</div>
              :<></>
            }
            {storyData.url===null||storyData.url===''
              ?<div className="justify-center font-bold text-red-500 border border-red-500 rounded-sm p-1">{'公式上で閲覧手段なし'}</div>
              :<></>
            }
            {voiceStateName===''
              ?<></>
              :<div className="justify-center font-bold text-red-500 border border-red-500 rounded-sm p-1">{voiceStateName}</div>
            }
            {storyData.still===0
              ?<></>
              :<div className="justify-center font-bold text-red-500 border border-red-500 rounded-sm p-1">{'スチル'+storyData.still+'枚'}</div>
            }
            {storyData.pp<=0
              ?<></>
              :<div className="justify-center font-bold text-white bg-orange-600 rounded-sm p-1">{'PP獲得対象'}</div>
            }
          </div>
          <div className="bg-zinc-200 py-1 my-auto rounded-sm">
            {storyData.website!=='asb' || storyData.howtoviewStory===null || storyData.howtoviewStory.length===0
              ?<></>
              :
              <div className='flex flex-wrap w-fit rounded-sm text-[10px] mobileS:text-xs tablet:text-sm font-mono text-black'>
                <div className=" text-black ml-1 my-auto">{'閲覧方法：'}</div>
                <div className="my-1">
                {storyData.howtoviewStory.map((result, index) => (
                <a key={index} className="justify-center border border-orange-700 text-orange-900 bg-orange-200 rounded-sm p-1 mr-1">{GetStoryHowtoviewName(result)}</a>
                ))}
                {/* {storyData.howtoviewStory.length===0
                ?<a className=" text-orange-800 p-1">{'ログイン不要'}</a>
                :<>
                {storyData.howtoviewStory.map((result, index) => (
                <a key={index} className="text-orange-800 p-1">{GetStoryHowtoviewName(result)}</a>
                ))}</>
                } */}
                
              </div>
              </div>
            }
          </div>
        </div>
        <div className='flex flex-wrap relative text-sm tablet:text-xl font-mono font-bold text-white gap-2'>
          <CategoryBadge id={storyData.category} size={'normal'}/>
          <div className="h-fit my-auto"><MediaBadge id={storyData.media} size={'normal'}/></div>
        </div>
        <div className='mb-1 flex flex-col'>
          <div className="text-base mobileM:text-xl tablet:text-2xl font-mono font-bold inline-block">
              {storyData.headTitle}
          </div>
          <div className="text-2xl mobileM:text-3xl tablet:text-4xl font-mono font-bold inline-block">
              {storyData.storyTitle}
          </div>
        </div>
        {releaseDate===''?<></>
        :
          mainStoryData.story.releaseDateSourceUrl!==''
          ?
          <a 
            className={`flex w-fit lg:text-base text-sm font-sans text-slate-600 mb-4 underline`}
            href={mainStoryData.story.releaseDateSourceUrl}
            target="_blank" rel="noopener noreferrer"
          >
            <p className="">{releaseDate}</p>
            <p className="">{'更新'}</p>
          </a>
          :
          <div 
            className={`flex w-fit lg:text-base text-sm font-sans text-slate-600 mb-2`}
          >
            <p className="">{releaseDate}</p>
            <p className="">{'更新'}</p>
          </div>
        }


        {infoStoryPerson.length === 0
          ?<></>
          :<>
            <div className='flex flex-wrap relative text-sm font-mono gap-y-2 gap-x-1 tablet:gap-y-1 tablet:gap-x-2 mb-8'>
              {infoStoryPerson.length === 49
                //対象アイドルが49人の場合、「315プロダクション」表記
                ?<div><IdolBadge id={'315pro'} useShortName={0} size={'normal'}/></div>
                :infoStoryPerson.map(
                  (result, index) => (<IdolBadge id={result.infoId} useShortName={0} size={'normal'} key={index} linkType='story'/>))
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
                    <ExternalLink className="w-[17px] ml-px mt-auto"/>
                  </div>
              </button>
            </a>
          </div>
          <div className='flex flex-wrap gap-2'>
            {storyData.url===null||storyData.url===''
            ?<></>
            :
            isRead
              ?
              <StoryReadEditButton
                storyId={storyData.storyId} readingDate={mainStoryData.userReadingData?.reading_date||''}
              />
              :
              <StoryReadButton
                storyId={storyData.storyId} login={login} isRead={isRead} isReadLeater={isReadLeater}
              />
            }
            {storyData.url===null||storyData.url===''
            ?<></>
            :isReadLeater
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
                href={searchUrl.toString()}
                target="_blank" rel="noopener noreferrer">
                <button
                  className='
                    flex py-2 px-2 tablet:px-5 rounded-full bg-zinc-100 items-center w-fit h-fit
                    font-mono text-xs mobileL:text-sm tablet:text-base 
                    transition-all duration-300
                    hover:ring-2 hover:ring-zinc-600 hover:ring-offset-2 hover:bg-zinc-200
                    active:scale-90'>
                    {'Googleで検索'}
                    <ExternalLink className="w-[17px] ml-px mt-auto"/>
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* サブストーリー */}
        {subStorys===null || subStorys.length===0
          ?<></>
          :<>
            <div 
              className="
                  mobileL:text-2xl text-xl font-mono flex items-center w-full
                  after:h-[0.5px] after:grow after:bg-indigo-800/50 after:ml-[1rem] 
                  mt-5 text-indigo-900 font-bold
              "
            >
              <BookOpen className="mr-1 text-indigo-700"/>
              {'各話'}
            </div>
            <div className={`
              items-start gap-2 grid-cols-1 mt-2 ml-8
              grid max-w-[700px]`}>
              {subStorys.map((result, index) => {
                const sunStoryReleaseDate: string 
                  = result.releaseDate===''
                    ?''
                    :new Date(
                      Number(result.releaseDate.substring(0,4))
                      ,Number(result.releaseDate.substring(4,6))-1
                      ,Number(result.releaseDate.substring(6,9))).toLocaleDateString("ja-JP");
                const subVoiceStateName = GetVoiceStateName(0,result.voiceAtRelease);
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
                  <div key={Number(result.subStoryNo)} 
                    className="flex flex-col pc:flex-row  bg-white border-orange-700/30 border-t-4 border-l-4 bg-orange-50/50 text-xl"
                  >
                    <div className="flex gap-0 flex-col">
                      {subVoiceStateName===''
                        ?<></>
                        :<div className="justify-center w-fit text-sm text-red-500 border border-red-500 rounded-sm p-1 mb-1">{subVoiceStateName}</div>
                      }
                      <div className="flex gap-1 text-xl">
                        {/* モバエム雑誌のときのみアイドル名を表示 */}
                        {storyData.media === 1 && ['comicn','comics'].includes(storyData.category) && !(result.infoSubStory===null || result.infoSubStory.length===0)
                        &&
                          <div className={`w-fit`}>
                            <IdolBadge id={result.infoSubStory[0].infoId} useShortName={1} size={'block'}/>
                          </div>
                        }
                        <div className={`w-fit`}>
                        {result.subStoryTitle}</div>
                      </div>
                        {storyData.category===CATEGORY.dailyOneFrame.id||displaySubStoryReleaseDate===false||sunStoryReleaseDate===''
                          ?<></>
                          :
                          <div 
                            className={`flex w-fit lg:text-sm text-xs font-sans text-slate-500 my-auto`}
                          >
                            <p className="">{sunStoryReleaseDate}</p>
                            <p className="">{'更新'}</p>
                          </div>
                        }
                    </div>
                    {/* サブストーリーボタン部  */}
                    <div className='
                       flex mt-1 gap-2 ml-auto mt-auto w-fit
                    '>
                      <div className='col-span-3 my-auto'>
                        <a className=""
                          href={result.url}
                          target="_blank" rel="noopener noreferrer">
                            <button
                              className='rounded-lg border-2 border-gray-500 w-full h-fit px-8
                              font-sans leading-tight text-white bg-gray-500 fill-white
                              transition-all duration-200 ease-out
                              hover:ring-2 hover:ring-gray-500 hover:ring-offset-2 
                              active:scale-90
                              text-sm mobileL:text-base lg:text-lg'>
                              <div className='
                                flex flex-nowrap whitespace-nowrap justify-center items-center font-sans font-black 
                                mobileM:my-0.5 my-1 
                              '>
                                {websiteName}
                                <ExternalLink className="w-[16px] ml-px mt-auto"/>
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
          </>
        }
      {/* 関連情報 */}
      <StoryRelation relationStorysData={relationStorysData} relationOtherData={relationOtherData} login={login}/>
    
    </section>
  </>
    );
  }