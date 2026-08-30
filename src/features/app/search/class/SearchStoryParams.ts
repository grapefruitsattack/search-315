import { ReadonlyURLSearchParams } from 'next/navigation';
import {getAllMediaWithCategoryArray,MEDIA} from '@/features/common/const/StoryInfoConst';
import singingMaster from '@/data/singingMaster.json';
import type { SingingMaster } from '@/data/types';
export class SearchStoryParams {
  order: string;
  andor: string;
  media: { [key: number]: boolean; };
  category: { [key: string]: boolean; };
  voice: number;
  howToView: number;
  pp: number;
  info: { [key: string]: boolean; };
  selectorInfo: string|undefined;
  categoryStr: string;
  read: string;

  constructor(urlSearchParams : ReadonlyURLSearchParams) {
    const idols: string[] = singingMaster.filter(data=>data.personFlg===1).map(data=>data.singingInfoId);

    this.order = urlSearchParams.get('order') || 'desc';
    this.andor = urlSearchParams.get('andor') || 'or';
    this.voice = Number(urlSearchParams.get('v')) || 0;
    this.howToView = Number(urlSearchParams.get('htv')) || 0;
    this.pp = Number(urlSearchParams.get('pp')) || 0;
    this.read = urlSearchParams.get('read') || 'all';

    this.category ={};
    const category: string[] = urlSearchParams.get('c')?.split(' ') || [];
    category.forEach(data=>{
      this.category[data] = true;
    });

    this.media ={};
    const allMediaCategory = getAllMediaWithCategoryArray();
    allMediaCategory.forEach(data=>{
      var isMediaTarget = false;
      for(const categoryInfo of data.categoryInfos){
        if(this.category[categoryInfo.id]){
          // 該当カテゴリーを1つでも含む場合、そのメディアをONにする
          isMediaTarget = true;
        };
      };
      if(isMediaTarget) this.media[data.mediaId] = true;
    });
    if(this.category['comic']) this.media[MEDIA.moba.id] = true;

    const info: string[] = urlSearchParams.get('q')?.split(' ') || [];
    this.info ={};
    info.forEach(infoId=>{
      if(idols.includes(infoId)) {
        this.info[infoId] = true;
        this.info[infoId.substring(0, 3)+'00'] = true;
      };
    });

    this.selectorInfo=undefined;
    if(info.length<=0){
      this.selectorInfo = '';
    }else if(info.length===1){
      this.selectorInfo = idols.includes(info[0])?info[0]:'';
    }else if(info.length>=2&&info.length<=5){
      const unitMember: string[] 
        = singingMaster.filter(data=>data.personFlg===1 && data.singingInfoId.substring(0, 3)===info[0].substring(0, 3))
          .map(data=>{ return data.singingInfoId });
      if(unitMember.length===info.length&&info.every((infoId) => unitMember.includes(infoId))){
        this.selectorInfo = info[0].substring(0, 3)+'00';
      }else{
        this.selectorInfo = '';
      }
    }
    
    this.categoryStr = getCategoryStr(this.media,this.category);

  };
}

export function getCategoryStr( media: { [key: number]: boolean; }, category: { [key: string]: boolean; }){
  const allMediaCategory = getAllMediaWithCategoryArray();
  const resultStrArray: string[] = [];

  allMediaCategory.sort((a, b) =>
    a.mediaId > b.mediaId ? 1 : -1
  );
  allMediaCategory.forEach(data=>{
    if(media[data.mediaId]){
      const categoryArray: string[] = [];
      for(const categoryInfo of data.categoryInfos){
        if(category[categoryInfo.id]) categoryArray.push(categoryInfo.name);
      };
      if(categoryArray.length===data.categoryInfos.length){
        resultStrArray.splice(0,0,data.mediaName);
      }else if(categoryArray.length===1){
        resultStrArray.splice(0,0,data.mediaName+'/'+categoryArray[0]);
      }else{
        resultStrArray.push(data.mediaName+'/'+categoryArray.join(' '));
      };
    }
  });

  return resultStrArray.join('、');
}