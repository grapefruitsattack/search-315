'use client'
import { useSearchParams } from 'next/navigation'
import CommonPage from "../../common/components/CommonPage";
import SearchPageSong from "./components/SearchPageSong";
import {SearchModal} from "./components/SearchModal";

export default function SearchPage() {
    const searchParams = useSearchParams();

    return (
      <CommonPage>
        <title>{ '検索結果 | サーチサイコー'}</title>
      <SearchModal/>
      <section className="pt-24 bg-white lg:max-w-[1500px] lg:m-auto">

      <div className='mb-5'>
      </div>
      <SearchPageSong />
    
      </section>
      </CommonPage>
      );
}