'use client'
import { useState } from "react";
import Link from "next/link";
import singingMaster from '@/data/singingMaster.json';
import songMaster from '@/data/songMaster.json';
import songInfoAsc from '@/data/songInfoAsc.json'
import type { SongMaster } from '@/data/types';
import SongCarousel from "@/features/common/components/SongCarousel";
import { Music2 } from "lucide-react";

export default function IdolMusic({ idolId }: { idolId: string }) {

  const idolName:string = singingMaster.find(data => data.singingInfoId === idolId)?.singingInfoName||'';
  //ソロ曲取得
  const soloSongInfos: string[] = songInfoAsc.filter(data => data.singingInfoId === idolId && data.type === 's').map(data=>data.songId);
  const soloSongs: SongMaster[] 
    = soloSongInfos.map(songid=>songMaster.find(data=>songid===data.songId && data.isSoloColle === 0 && data.isUnitColle === 0))
    .filter((item): item is SongMaster => typeof item == 'object').slice().reverse();
  const soloColleSongInfos: string[] = songInfoAsc.filter(data => data.singingInfoId === idolId && data.type === 'sver').map(data=>data.songId);
    const soloColleSongs: SongMaster[] 
  = soloColleSongInfos.map(songid=>songMaster.find(data=>songid===data.songId && data.isUnitColle === 0))
  .filter((item): item is SongMaster => typeof item == 'object').slice().reverse();
  //越境系曲取得
  const collaboSongInfos: string[] = songInfoAsc.filter(data => data.singingInfoId === idolId && ['c', 'cover', 't'].includes(data.type)).map(data=>data.songId);
  const collaboSongs: SongMaster[] 
    = collaboSongInfos.map(songid=>songMaster.find(data=>songid===data.songId))
    .filter((item): item is SongMaster => typeof item == 'object').slice().reverse();


    return (<>
      <div 
          className="
              text-2xl font-mono flex items-center w-full pl-1 pr-8
              after:h-[0.5px] after:grow after:bg-indigo-700/50 after:ml-[1rem] 
              text-base tablet:text-lg font-bold
          "
      >
        <Music2 className=" text-indigo-500 w-[20px]"  />
        {'ソロ曲'}
      </div>
      <div className="flex">
        <div className={`
          max-w-[700px] w-full
          px-0 mobileM:px-2
          
        `}>
        <SongCarousel songArray={soloSongs} displaySongCnt={5} displayArtist={false} useArtistBadge={false} displayReleaseDate={true}/>
        </div>
      </div>
      
      {collaboSongs.length===0 
        ?<></>
        :<>
          <div 
              className="
                  text-2xl font-mono flex items-center w-full pl-1 pr-8
                  after:h-[0.5px] after:grow after:bg-indigo-700/50 after:ml-[1rem] 
                  text-base tablet:text-lg font-bold
              "
          >
            <Music2 className=" text-indigo-500 w-[20px]"  />
            {'個人参加曲'}
          </div>
          <div className="flex">
            <div className={`
              max-w-[700px] w-full
              px-0 mobileM:px-2
              
            `}>
              <SongCarousel 
                songArray={collaboSongs} displaySongCnt={4} displayArtist={true} useArtistBadge={false} displayReleaseDate={true}
              />
            </div>
          </div>
        </>
      }
      {soloColleSongs.length===0 
        ?<></>
        :<>
          <div 
              className="
                  text-2xl font-mono flex items-center w-full pl-1 pr-8
                  after:h-[0.5px] after:grow after:bg-indigo-700/50 after:ml-[1rem] 
                  text-base tablet:text-lg font-bold
              "
          >
            <Music2 className=" text-indigo-500 w-[20px]"  />
            {'ソロVer'}
          </div>
          <div className="flex">
            <div className={`
              max-w-[700px] w-full
              px-0 mobileM:px-2
              
            `}>
              <SongCarousel songArray={soloColleSongs} displaySongCnt={5} displayArtist={false} useArtistBadge={false} displayReleaseDate={true} />
            </div>
          </div>
        </>
      }

  {/* 検索 */}
        <div className="flex justify-center m-auto pt-12">
            <Link 
          href={{ pathname: '/search', query: {q: idolId}}}
          className='
                flex p-0.5 bg-gradient-to-r from-indigo-300 to-emerald-300 items-center 
                hover:drop-shadow-xl cursor-pointer select-none
                transition-all duration-500 ease-out
                '
            >
                <div
                    className='flex flex-row
                        bg-gradient-to-r from-indigo-50 to-emerald-50 
                        border-2 border-white
                        text-teal-700
                        font-sans tablet:text-base text-sm
                        p-1 items-center w-[70vw] justify-center'
                >
                    <div className='pr-2'>
                      <span className="font-bold">
                      {idolName}
                      </span>
                      <span className="">
                      {'の他の楽曲を見つける'}
                      </span>
                    </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z" fill="currentColor"></path></svg>
               
                </div>
            </Link>
        </div>
    </>);
}