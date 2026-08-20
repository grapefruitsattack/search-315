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

export default function UnitPageOther({ unitId,unitMember }: { unitId: string; unitMember: SingingMaster[] }) {

  const searchParams = useSearchParams();
  //const memberParam :string = searchParams.get('m')||unitId;
  const currentPath: string = usePathname();

  const unitName:string = singingMaster.find(data => data.singingInfoId === unitId)?.singingInfoName||'';

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

  return (<>
   <div 
      className="
          text-2xl font-mono flex items-center w-full fill-red-400
          after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
      "
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960"><path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/></svg>
      {'動画'}
    </div>
    <div 
      className={`
        flex flex-wrap px-2
        mt-2 gap-1 font-bold
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
  {/* ライブ情報 */}
  <div className="flex items-start pt-4">
      <a 
          className="
              text-2xl font-mono flex items-center w-full
              after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
              cursor-pointer lg:cursor-auto 
          "
      >
      <svg className="fill-orange-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M10.6144 17.7956C10.277 18.5682 9.20776 18.5682 8.8704 17.7956L7.99275 15.7854C7.21171 13.9966 5.80589 12.5726 4.0523 11.7942L1.63658 10.7219C.868536 10.381.868537 9.26368 1.63658 8.92276L3.97685 7.88394C5.77553 7.08552 7.20657 5.60881 7.97427 3.75892L8.8633 1.61673C9.19319.821767 10.2916.821765 10.6215 1.61673L11.5105 3.75894C12.2782 5.60881 13.7092 7.08552 15.5079 7.88394L17.8482 8.92276C18.6162 9.26368 18.6162 10.381 17.8482 10.7219L15.4325 11.7942C13.6789 12.5726 12.2731 13.9966 11.492 15.7854L10.6144 17.7956ZM4.53956 9.82234C6.8254 10.837 8.68402 12.5048 9.74238 14.7996 10.8008 12.5048 12.6594 10.837 14.9452 9.82234 12.6321 8.79557 10.7676 7.04647 9.74239 4.71088 8.71719 7.04648 6.85267 8.79557 4.53956 9.82234ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899ZM18.3745 19.0469 18.937 18.4883 19.4878 19.0469 18.937 19.5898 18.3745 19.0469Z"></path></svg>
      {'出演ライブ'}
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
      </a>
      </div>
  <section className={`mb-24
      lg:grid flex flex-col    
  `}>
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
  </section>

  </>
  );
}