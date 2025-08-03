import { ReadonlyURLSearchParams } from 'next/navigation';

export class SearchStoryParams {
  order: string;
  andor: string;
  media: { [key: string]: boolean; };
  category: { [key: string]: boolean; };
  voice: string;
  howToView: string;
  info: { [key: string]: boolean; };

  constructor(urlSearchParams : ReadonlyURLSearchParams) {
      this.order = urlSearchParams.get('order') || 'desc';
      this.andor = urlSearchParams.get('andor') || 'or';
      const media: string[] = urlSearchParams.get('m')?.split(' ') || [];
      this.media ={};
      media.forEach(data=>{
        this.media[data] = true;
      });
      const category: string[] = urlSearchParams.get('c')?.split(' ') || [];
      this.category ={};
      category.forEach(data=>{
        this.category[data] = true;
      });
      this.voice = urlSearchParams.get('v') || '';
      this.howToView = urlSearchParams.get('htv') || '';
      const info: string[] = urlSearchParams.get('q')?.split(' ') || [];
      this.info ={};
      info.forEach(data=>{
        this.info[data] = true;
      });
  };
}