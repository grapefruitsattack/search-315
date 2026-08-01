'use client'
import { useState } from "react";
import Link from "next/link";
import singingMaster from '@/data/singingMaster.json';
import songMaster from '@/data/songMaster.json';
import songInfoAsc from '@/data/songInfoAsc.json'
import type { SongMaster } from '@/data/types';
import SongCarousel from "@/features/common/components/SongCarousel";

export default function IdolPageMusic({ idolId }: { idolId: string }) {

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
              text-2xl font-mono flex items-center w-full 
              after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
          "
      >
        <svg className="fill-teal-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 13.5351V3H20V5H14V17C14 19.2091 12.2091 21 10 21C7.79086 21 6 19.2091 6 17C6 14.7909 7.79086 13 10 13C10.7286 13 11.4117 13.1948 12 13.5351ZM10 19C11.1046 19 12 18.1046 12 17C12 15.8954 11.1046 15 10 15C8.89543 15 8 15.8954 8 17C8 18.1046 8.89543 19 10 19Z"></path></svg>
          {'ソロ曲'}
      </div>
      <div className="flex">
        <div className={`
          max-w-[700px] w-full
          px-0 mobileM:px-2
          
        `}>
          <SongCarousel songArray={soloSongs} displaySongCnt={5} displayArtist={false} useArtistBadge={false}/>
        </div>
      </div>
      
      {collaboSongs.length===0 
        ?<></>
        :<>
          <div 
              className="
                  text-2xl font-mono flex items-center w-full
                  after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
              "
          >
            <svg className="fill-lime-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 13.5351V3H20V5H14V17C14 19.2091 12.2091 21 10 21C7.79086 21 6 19.2091 6 17C6 14.7909 7.79086 13 10 13C10.7286 13 11.4117 13.1948 12 13.5351ZM10 19C11.1046 19 12 18.1046 12 17C12 15.8954 11.1046 15 10 15C8.89543 15 8 15.8954 8 17C8 18.1046 8.89543 19 10 19Z"></path></svg>
              {'個人参加曲'}
          </div>
          <div className="flex">
            <div className={`
              max-w-[700px] w-full
              px-0 mobileM:px-2
              
            `}>
              <SongCarousel 
                songArray={collaboSongs} displaySongCnt={4} displayArtist={true} useArtistBadge={false}
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
                text-2xl font-mono flex items-center w-full
                after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
            "
        >
          <svg className="fill-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 13.5351V3H20V5H14V17C14 19.2091 12.2091 21 10 21C7.79086 21 6 19.2091 6 17C6 14.7909 7.79086 13 10 13C10.7286 13 11.4117 13.1948 12 13.5351ZM10 19C11.1046 19 12 18.1046 12 17C12 15.8954 11.1046 15 10 15C8.89543 15 8 15.8954 8 17C8 18.1046 8.89543 19 10 19Z"></path></svg>
            {'ソロVer'}
        </div>
          <div className="flex">
            <div className={`
              max-w-[700px] w-full
              px-0 mobileM:px-2
              
            `}>
              <SongCarousel songArray={soloColleSongs} displaySongCnt={5} displayArtist={false} useArtistBadge={false}/>
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