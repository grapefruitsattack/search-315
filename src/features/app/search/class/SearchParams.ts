import { ReadonlyURLSearchParams } from 'next/navigation';

export class SearchParams {
  order: string;
  andor: string;
  [key: string]: string;
  constructor(urlSearchParams : ReadonlyURLSearchParams) {
      this.order = urlSearchParams.get('order') || 'desc';
      this.andor = urlSearchParams.get('andor') || 'or';
      const search :string[] = urlSearchParams.get('q')?.split(' ') || [];
      const filter :string[] = urlSearchParams.get('f')?.split(' ') || [];
      search.forEach(data=>{
        this[data] = '1';
      });
      filter.forEach(data=>{
        this[data] = '1';
      });
      //サブスク過去Verクエリ対応
      if(((urlSearchParams.get('subsc') || '0')==='1') && (this['sbsc'] !== '0')){
        this['sbsc'] = '1';
      };
  };
}