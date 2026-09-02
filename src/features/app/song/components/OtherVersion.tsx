'use client'
import { useState } from "react";
import songMaster from '@/data/songMaster.json';
import type { SongMaster } from '@/data/types';
import SongCarousel from "@/features/common/components/SongCarousel";
import { Music } from "lucide-react";

export default function OtherVersion({ id ,otherVersionSongs }: { id: string, otherVersionSongs: SongMaster[] }) {

    const result : SongMaster[] = otherVersionSongs;
    const resultSort : SongMaster[] | undefined 
        = result.filter(data => data.subscFlg === 1).concat(result.filter(data => data.subscFlg !== 1));

    return(
            <>
            <div
                className="
                  mobileL:text-2xl text-xl font-mono flex items-center w-full
                  after:h-[0.5px] after:grow after:bg-indigo-800/50 after:ml-[1rem] 
                  text-indigo-900 font-bold
                "
            >
              <Music className="mr-1 text-indigo-700"/>
              {'別のバージョン'}
            </div>
            <section className={`
              max-w-[700px] w-full
              px-0 tablet:px-2
            `}>
              <SongCarousel songArray={resultSort} displaySongCnt={5} displayArtist={true} useArtistBadge={1} displayReleaseDate={false} />
            </section>
            </>
    )
}