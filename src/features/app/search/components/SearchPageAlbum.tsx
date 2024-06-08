'use client'
import { useSearchParams } from 'next/navigation'
import type { Albums } from '../../../../data/types';
import SearchAlbumForSingingInfoId from '../../../common/utils/SearchAlbumForSingingInfoId';
import songInfoAsc from '../../../../data/songInfoAsc.json';
import getTotalPage from '../../../common/utils/GetTotalPage';
import AlbumBlock from "../../../common/components/AlbumBlock";
import Pagination from "../../../common/components/Pagination";
import SortSelect from "./SortSelect";
import FilterSelect from "./FilterSelect";
import { motion, AnimatePresence } from 'framer-motion'

export default function SearchPageAlbum({ }: {}) {
    //パラメータ
    const searchParams = useSearchParams();
    const search :string[] = searchParams.get('q')?.split(' ')||[];

    const page :number = Number(searchParams.get('page')) || 1;
    const order :string = searchParams.get('order') || 'desc';
    const subscExists :number = Number(searchParams.get('subsc')) || 0;
    const colleFlg :number = Number(searchParams.get('colle')) || 0;

    const songInfoDesc = songInfoAsc.slice().reverse();

    const results: Albums[] 
    = SearchAlbumForSingingInfoId(search||[]
      ,order === 'asc' ? songInfoAsc : songInfoDesc
      ,subscExists
      ,colleFlg
    );

    const totalPage: number = getTotalPage(searchParams.get('page'),results.length,'search?search='+search,14);

    let displayResults = results != null
    ?results.slice(14*(page - 1),14*page):[];
    displayResults = displayResults != null ?displayResults :[];

    return (
    <>
      <section className="lg:px-24 px-8 mt-3 p-2 flex flex-wrap items-center gap-4">
        <div className="flex-none ">
        <SortSelect 
            currentValue={order}
            paramId ='order'/>
        </div>
        <div className="flex-none">
        <FilterSelect 
            currentValueSubsc={subscExists}
            currentValueColle={colleFlg}/>
        </div>
      </section>    
      <section className="">
      <Pagination currentPage={page} totalPage={totalPage}/>
      </section>

      <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={page + order  + `${subscExists}${colleFlg}${searchParams.get('q') === null?'':searchParams.get('q')}` }
        initial={{ opacity: 0 }} // 初期状態
        animate={{ opacity: 1 }} // マウント時
        exit={{ opacity: 0 }}    // アンマウント時
      >
        <section className="grid items-start px-10 lg:px-32 gap-4 grid-cols-1 lg:grid-cols-2 ">
        
          {displayResults.length===0 
          ? <div>結果なし</div>
          :displayResults.map((result, index) => (
            <AlbumBlock 
            key={index} 
            results={result}
            existsButton={true}
          />
          ))}
        </section>
      </motion.div>
      </AnimatePresence>
      <section className=" pb-24">
        <Pagination currentPage={page} totalPage={totalPage}/>
      </section>
    </>);
}