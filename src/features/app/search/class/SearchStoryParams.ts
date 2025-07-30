import { ReadonlyURLSearchParams } from 'next/navigation';

export class SearchStoryParams {
  order: string;
  andor: string;
  media: { [key: number]: string; };
  category: { [key: string]: string; };
  voice: number;
  howToView: number;
  info: { [key: string]: string; };

  constructor(urlSearchParams : ReadonlyURLSearchParams) {
      this.order = urlSearchParams.get('order') || 'desc';
      this.andor = urlSearchParams.get('andor') || 'or';
      const media: string[] = urlSearchParams.get('m')?.split(' ') || [];
      this.media ={};
      media.forEach(data=>{
        this.media[Number(data)] = '1';
      });
      const category: string[] = urlSearchParams.get('c')?.split(' ') || [];
      this.category ={};
      category.forEach(data=>{
        this.category[data] = '1';
      });
      this.voice = Number(urlSearchParams.get('v')) || 0;
      this.howToView = Number(urlSearchParams.get('htv')) || 0;
      const info: string[] = urlSearchParams.get('q')?.split(' ') || [];
      this.info ={};
      info.forEach(data=>{
        this.info[data] = '1';
      });
  };
}