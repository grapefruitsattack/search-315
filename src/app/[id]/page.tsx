'use client'
import songInfos from '../../data/songInfo.json';
import type { SongMaster, SongInfo } from '../../data/types';
import HeaderAndFooter from "../../components/HeaderAndFooter";
import SongBlock from "../../components/SongBlock";
import Pagination from "../../components/Pagination";
import { useSearchParams  } from 'next/navigation'
import GetTotalPage from '../../features/utils/GetTotalPage';
import {useState} from 'react';
import { useEffect } from 'react';

export function generateStaticParams() {
    return [
      { id: "JUP00" },
      { id: "JUP01" },
      { id: "JUP02" },
      { id: "JUP03" },
    ];
  }
  export default function Home({ params }: { params: { id: string } }) {
    const searchParams = useSearchParams();
    const page :number = Number(searchParams.get('page')) || 1;

    const results : SongInfo[] = songInfos.filter(data => data.singingInfoId === params.id);
    const totalPage: number = GetTotalPage(searchParams.get('page'),results.length,params.id);

    const displayResults : SongInfo[] = results.slice(18*(page - 1),18*page);
    

    return (
    <main className=" min-h-screen">
    <HeaderAndFooter />
    <section className="pt-24 ">

    <Pagination currentPage={page} totalPage={totalPage}/>
    </section>
    <section className="grid items-start pb-24 px-12 lg:px-36 gap-4 grid-cols-1 lg:grid-cols-3 ">

        {displayResults.length===0 
        ? <div>結果なし</div>
        :displayResults.map((result) => (
        <SongBlock key={result.albumId + result.trackNo} albumId={result.albumId} trackNo={result.trackNo} />
        ))}
    </section>
    </main>
      );
    }