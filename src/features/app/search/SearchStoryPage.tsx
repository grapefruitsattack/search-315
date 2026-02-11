
import { useSearchParams } from 'next/navigation'
import CommonPage from "../../common/components/CommonPage";
import SearchPageStory from "./components/SearchPageStory";
import SearchStoryModal from "./components/SearchStoryModal";
import type { StorySearchResult } from '../../../data/types';

export default async function SearchStoryPage(
  { data }: { data: {result:StorySearchResult[],totalCnt:number,login:boolean}}
  ): Promise<JSX.Element> 
 {


    return (
      <>

      <SearchPageStory data={data} />
    
      </>
      );
}