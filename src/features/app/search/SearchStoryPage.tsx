
import { useSearchParams } from 'next/navigation'
import CommonPage from "../../common/components/CommonPage";
import SearchPageSong from "./components/SearchPageSong";
import {SearchModal} from "./components/SearchModal";
import type { StorySearchResult } from '../../../data/types';

export default async function SearchStoryPage(
  { data }: { data: StorySearchResult;}
  ): Promise<JSX.Element> 
 {

    return (
      <>
        <title>{ 'ストーリー検索結果 | サーチサイコー'}</title>
      <SearchModal/>
      <section className="pt-24 bg-white lg:max-w-[1500px] lg:m-auto">

      <div className='mb-5'>
      </div>
      <SearchPageSong />
    
      </section>
      </>
      );
}