'use client'
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import singingMaster from '@/data/singingMaster.json';
import livePerformer from '@/data/livePerformer.json'
import liveMaster from '@/data/liveMaster.json';
import type { SingingMaster, Video, LiveMaster, LivePerformer } from '@/data/types';
import {SearchVideo} from "@/features/common/utils/SearchVideo";
import {VideoCarousel} from "@/features/common/components/video/VideoCarousel";
import LiveBlock from "@/features/common/components/LiveBlock";
import UnitPageMemberTabController from "./components/UnitPageMemberTabController";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SquarePlay, MicVocal } from "lucide-react";

export default function UnitPageOther({ unitId,unitMember }: { unitId: string; unitMember: SingingMaster[] }) {

  //動画
  const infoIds: string[] = unitMember.map(data=>data.singingInfoId);
  const mvArray: string[] = SearchVideo(infoIds,['mv'],'or',0).map(data=>data.videoId);
  const liveArray: string[] = SearchVideo(infoIds,['live'],'or',0).map(data=>data.videoId);
  const threeDLiveArray: string[] = SearchVideo(infoIds,['3dlive'],'or',0).map(data=>data.videoId);
  const otherArray: string[] = SearchVideo(infoIds,['anime','live_sp','other','sp'],'or',0).map(data=>data.videoId);


  const [selectedVideo, setSelectedVideo] = useState({videoArray:mvArray,videoType:'mv',videoTypeName:'MV'});
  const videoTypeArray = [
    {videoArray:mvArray,videoType:'mv',videoTypeName:'MV'},
    {videoArray:liveArray,videoType:'live',videoTypeName:'ライブ'},
    {videoArray:threeDLiveArray,videoType:'3dlive',videoTypeName:'3Dライブ'},
    {videoArray:otherArray,videoType:'other',videoTypeName:'その他'},
  ];

  //ライブ情報
  const liveInfos: LivePerformer[] 
    = livePerformer.filter(data => data.singingInfoId === unitId).toReversed()
    .filter(
      (element, index, self) => element.liveId===''||(self.findIndex((e) => e.liveId === element.liveId) === index)
    );

  const liveInfoArray: {liveArray:LivePerformer[],infoId:string,infoName:string}[] 
    = [{liveArray:liveInfos,infoId:unitId,infoName:'ユニット'}];
  unitMember.forEach(memberData=>{
    const memberLiveInfos: LivePerformer[] 
      = livePerformer.filter(data => data.singingInfoId === memberData.singingInfoId).toReversed()
      .filter(
        (element, index, self) => element.liveId===''||(self.findIndex((e) => e.liveId === element.liveId) === index)
      );
    liveInfoArray.push({
      liveArray:memberLiveInfos,
      infoId:memberData.singingInfoId,
      infoName:memberData.singingInfoId==='CFP03'?'アスラン＝BBⅡ世':memberData.singingInfoName
    })
  });

  return (
  <div className="flex flex-col gap-10">
    <Card className="shadow-lg ">
      <CardHeader>
        <div 
          className="flex items-center w-full py-2 pl-4
            bg-gray-100 text-gray-700 mobileL:text-2xl mobileS:text-xl text-lg font-bold
            border-b "
        > 
          <SquarePlay className="mr-1 text-red-600" />
          {'動画'}
        </div>
      </CardHeader>
      <CardContent className='py-4'>
          <div 
            className={`
              flex flex-wrap px-2
              gap-1 font-bold
            `}
          >
              {videoTypeArray.map((data,index)=>
              <button
                className={`border border-2 rounded-xl px-2 py-[2px]
                  ${selectedVideo.videoType===data.videoType
                    ?'bg-green-400 border-green-400 text-stone-50 pointer-events-none'
                    :'bg-stone-200/20 border-stone-200 text-stone-500 '}
                `}
                key={data.videoType}
                onClick={()=>setSelectedVideo(data)}
                aria-disabled={selectedVideo.videoType===data.videoType}
              >
                {data.videoTypeName}
              </button>
              )}
          </div>

          <div className={`${selectedVideo.videoType!=='mv'&&'hidden'}`}>
            <VideoCarousel videoIdArray={mvArray} />
          </div>
          <div className={`${selectedVideo.videoType!=='live'&&'hidden'}`}>
            <VideoCarousel videoIdArray={liveArray} />
          </div>
          <div className={`${selectedVideo.videoType!=='3dlive'&&'hidden'}`}>
            <VideoCarousel videoIdArray={threeDLiveArray} />
          </div>
          <div className={`${selectedVideo.videoType!=='other'&&'hidden'}`}>
            <VideoCarousel videoIdArray={otherArray} />
          </div>
        </CardContent>
      </Card>
    {/* ライブ情報 */}
    <Card className="shadow-lg ">
      <CardHeader>
        <div 
          className="flex items-center w-full py-2 pl-4
            bg-gray-100 text-gray-700 mobileL:text-2xl mobileS:text-xl text-lg font-bold
            border-b "
        > 
          <MicVocal className="mr-1 text-indigo-700" />
          {'ライブ'}
        </div>
      </CardHeader>
      <CardContent className='py-4'>
        <div className="flex items-start ">
          <div
              className="
                  text-2xl font-mono flex items-center w-full
              "
          >
            {/* 注釈　PC版 */}
            <div className="ml-2 hidden lg:flex flex-wrap fill-red-600
            text-sm font-sans text-gray-900 bg-gray-200
            ">
            <span className="pr-1 text-red-500">
            <span className="">
            <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 2 24 24" width="18" height="18"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path></svg>
            </span>
            </span>
                <p className="w-fit">
                      {'映像商品化されたライブイベントのみ掲載'}
                </p>
            </div>
          </div>
        </div>
        <div className={`mb-24
            lg:grid flex flex-col `}
        >
          {/* 注釈　スマホ版 */}
          <div className="ml-2 lg:hidden flex flex-wrap fill-red-600
          text-sm font-sans text-gray-900 bg-gray-200
          ">
            <p className="w-fit bg-gray-200">
            <span className="pr-1 text-red-500">
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 2 24 24" width="18" height="18"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path></svg>
                </span>
            </span>
              {'映像商品化されたライブイベントのみ掲載'}
            </p>
          </div>
          <div className={`pt-4
          `}>
            <UnitPageMemberTabController
              unitId={unitId}
              unitMember={unitMember}
            >
              {(member) =>{
                const live = liveInfoArray.find(data=>member===data.infoId)||{liveArray:liveInfos,infoId:unitId,infoName:'ユニット'};

              return(
                <div className={`grid
                    grid-cols-2 tablet:grid-cols-4 lg:gap-4 gap-4 pt-1 
                    px-4
                `}>
                {live.liveArray.map((result,index) => (
                  <div className="" key={index}>
                    <LiveBlock livePerId={result.liveId===""?result.livePerId:''} liveId={result.liveId} />
                  </div>
                ))}
                </div>
              )}
              }
            </UnitPageMemberTabController>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
  );
}