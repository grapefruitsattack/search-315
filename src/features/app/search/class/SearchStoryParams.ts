import { ReadonlyURLSearchParams } from 'next/navigation';
import {getAllMediaWithCategoryArray} from '../../../common/const/StoryInfoConst';

export class SearchStoryParams {
  order: string;
  andor: string;
  media: { [key: number]: boolean; };
  category: { [key: string]: boolean; };
  voice: string;
  howToView: string;
  info: { [key: string]: boolean; };

  constructor(urlSearchParams : ReadonlyURLSearchParams) {
      this.order = urlSearchParams.get('order') || 'desc';
      this.andor = urlSearchParams.get('andor') || 'or';
      this.voice = urlSearchParams.get('v') || '';
      this.howToView = urlSearchParams.get('htv') || '';

      const category: string[] = urlSearchParams.get('c')?.split(' ') || [];
      this.category ={};
      category.forEach(data=>{
        this.category[data] = true;
      });

      const allMediaCategory = getAllMediaWithCategoryArray();
      this.media ={};
      allMediaCategory.forEach(data=>{
        var isTarget = true;
        for(const categoryId of data.categoryIds){
          if(!(category.includes(categoryId))){
            isTarget = false;
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