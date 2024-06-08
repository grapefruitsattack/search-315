'use client'
import { useSearchParams } from 'next/navigation'
import type { SongMaster } from '../../../../data/types';
import getTotalPage from '../../../common/utils/GetTotalPage';
import SearchSongForSingingInfoId from '../../../common/utils/SearchSongForSingingInfoId';
import SongBlock from "../../../common/components/SongBlock";
import Pagination from "../../../common/components/Pagination";
import { motion } from 'framer-motion'
import { AnimatePresence } from "framer-motion";
import SortSelect from "./SortSelect";
import FilterSelect from "./FilterSelect";
import songInfoAsc from '../../../../data/songInfoAsc.json';

export default function SearchPageSong({ }: {}) {
    const searchParams = useSearchParams();
    const search :string[] = searchParams.get('q')?.split(' ')||[];

    const page :number = Number(searchParams.get('page')) || 1;
    const order :string = searchParams.get('order') || 'desc';
    const subscExists :number = Number(searchParams.get('subsc')) || 0;
    const colleFlg :number = Number(searchParams.get('colle')) || 0;

    const songInfoDesc = songInfoAsc.slice().reverse();

    const results: SongMaster[] 
      = SearchSongForSingingInfoId(search||[]
        ,order === 'asc' ? songInfoAsc : songInfoDesc
        ,subscExists
        ,colleFlg
      );

    const totalPage: number = getTotalPage(searchParams.get('page'),results.length,'search?search='+search,18);


    let displayResults = results != null
    ?results.slice(18*(page - 1),18*page):[];
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
        <section className="lg:flex px-10 lg:px-16 w-full">
        <section className="grid grid-flow-row-dense items-start gap-4 grid-cols-1 lg:grid-cols-3 w-full">
    
            {displayResults.length===0 
            ? <div>結果なし</div>
            :displayResults.map((result, index) => (
            <SongBlock 
              key={index} 
              albumId={result.albumId} 
              trackNo={result.trackNo} 
              song={result}
              existsButton={true}
            />
            ))}
            </section>
        </section>

        </motion.div>
  </AnimatePresence>
        <section className=" pb-24">
        <Pagination currentPage={page} totalPage={totalPage}/>
        </section>
      </>
      );
}