

import type { Video,ShareModalTabInfo } from '@/data/types';
import m_video from '@/data/m_video.json';

export function SearchVideo(
  infoIds: string[], videoTypes: string[], andOr: string, excludeFlg: number
): Video[] {
  let result: Video[] = m_video;

  if(videoTypes.length>0){
    result = result.filter((videoData)=>videoTypes.includes(videoData.videoType));
  };
  
  if(infoIds.length>0){
    if(infoIds.length===1&&infoIds.includes('other')){
        result = result.filter((videoData)=>videoData.infoVideo.some(data=>data.infoId==='other'));
    }else{
      if(andOr==='and'){
        //AND検索
        const targetInfoIds = infoIds.filter(data=>data!=='all');
        result = result.filter((videoData)=>{
          if(videoData.infoVideo.some(info=>info.infoId==='all')){
            return videoData;
          }else if(targetInfoIds.every((targetInfoId)=>videoData.infoVideo.some((info)=>info.infoId===targetInfoId))){
            return videoData;
          };
        });
      }else{
        //OR検索
        result = result.filter((videoData)=>{
          if(videoData.infoVideo.some(info=>(infoIds.includes(info.infoId)||info.infoId==='all')&&(excludeFlg!==1||excludeFlg===info.excludeFlg))){
            return videoData;
          };
        });
      };
    };
  }

  return result;
}