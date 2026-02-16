import { ReadonlyURLSearchParams } from 'next/navigation';
import {getAllMediaWithCategoryArray} from '@/features/common/const/StoryInfoConst';

export class SearchStoryParams {
  order: string;
  andor: string;
  media: { [key: number]: boolean; };
  category: { [key: string]: boolean; };
  voice: number;
  howToView: number;
  info: { [key: string]: boolean; };
  categoryStr: string;

  constructor(urlSearchParams : ReadonlyURLSearchParams) {
    this.order = urlSearchParams.get('order') || 'desc';
    this.andor = urlSearchParams.get('andor') || 'or';
    this.voice = Number(urlSearchParams.get('v')) || 0;
    this.howToView = Number(urlSearchParams.get('htv')) || 0;

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
    
    const info: string[] = urlSearchParams.get('q')?.split(' ') || [];
    this.info ={};
    info.forEach(data=>{
      this.info[data] = true;
    });
    
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