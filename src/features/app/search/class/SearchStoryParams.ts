import { ReadonlyURLSearchParams } from 'next/navigation';
import {getAllMediaWithCategoryArray} from '../../../common/const/StoryInfoConst';

export class SearchStoryParams {
  order: string;
  andor: string;
  media: { [key: number]: boolean; };
  category: { [key: string]: boolean; };
  voice: number;
  howToView: number;
  info: { [key: string]: boolean; };

  constructor(urlSearchParams : ReadonlyURLSearchParams) {
      this.order = urlSearchParams.get('order') || 'desc';
      this.andor = urlSearchParams.get('andor') || 'or';
      this.voice = Number(urlSearchParams.get('v')) || 0;
      this.howToView = Number(urlSearchParams.get('htv')) || 0;

      const category: string[] = urlSearchParams.get('c')?.split(' ') || [];
      this.category ={};
      category.forEach(data=>{
        this.category[data] = true;
      });

      const allMediaCategory = getAllMediaWithCategoryArray();
      this.media ={};
      allMediaCategory.forEach(data=>{
        var isTarget = false;
        // 該当カテゴリーを1つでも含む場合、そのメディアをONにする
        for(const categoryId of data.categoryIds){
          if(category.includes(categoryId)){
            isTarget = true;
            break;
          };
        };
        if(isTarget) this.media[data.mediaId] = true;
      });
      
      const info: string[] = urlSearchParams.get('q')?.split(' ') || [];
      this.info ={};
      info.forEach(data=>{
        this.info[data] = true;
      });
  };
}