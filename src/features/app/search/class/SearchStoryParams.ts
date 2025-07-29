import { ReadonlyURLSearchParams } from 'next/navigation';

export class SearchStoryParams {
  order: string;
  andor: string;
  media: string[];
  category: string[];
  voice: string;
  howToView: string;
  [key: string]: string|string[];
  constructor(urlSearchParams : ReadonlyURLSearchParams) {
      this.order = urlSearchParams.get('order') || 'desc';
      this.andor = urlSearchParams.get('andor') || 'or';
      const search :string[] = urlSearchParams.get('q')?.split(' ') || [];
      this.media = urlSearchParams.get('m')?.split(' ') || [];
      this.category = urlSearchParams.get('c')?.split(' ') || [];
      this.voice = urlSearchParams.get('v') || '0';
      this.howToView = urlSearchParams.get('htv') || '0';
      search.forEach(data=>{
        this[data] = '1';
      });
  };
}