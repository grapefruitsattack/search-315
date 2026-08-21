'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import singingMaster from '@/data/singingMaster.json';
import songMaster from '@/data/songMaster.json';
import songInfoAsc from '@/data/songInfoAsc.json'
import type { SongMaster } from '@/data/types';
import SongCarousel from "@/features/common/components/SongCarousel";

export default function UnitMusic({ unitId }: { unitId: string; }) {

  const urlSearchParams = useSearchParams();
  const params = useSearchParams();
  params.get('m')

    const unitName:string = singingMaster.find(data => data.singingInfoId === unitId)?.singingInfoName||'';
    //ユニット曲取得
    const unitSongInfos: string[] = songInfoAsc.filter(data => data.singingInfoId === unitId && data.type === 'u').map(data=>data.songId);
    const unitSongs: SongMaster[] 
        = unitSongInfos.map(songid=>songMaster.find(data=>songid===data.songId && data.isSoloColle === 0 && data.isUnitColle === 0))
        .filter((item): item is SongMaster => typeof item == 'object').slice().reverse();
    //合同系曲取得
    const collaboUnitInfos: string[] = songInfoAsc.filter(data => data.singingInfoId === unitId && data.type === 'c').map(data=>data.songId);
    const collaboSongs: SongMaster[] 
        = collaboUnitInfos.map(songid=>songMaster.find(data=>songid===data.songId))
        .filter((item): item is SongMaster => typeof item == 'object').slice().reverse();
    //カバー曲
    const coverSongInfos: string[] = songInfoAsc.filter(data => data.singingInfoId === unitId && data.type === 'cover').map(data=>data.songId);
    const coverSongs: SongMaster[] 
        = coverSongInfos.map(songid=>songMaster.find(data=>songid===data.songId))
        .filter((item): item is SongMaster => typeof item == 'object').slice().reverse();
    //ユニコレ・ユニットバージョン曲取得
    const unitVerSongInfos: string[] = songInfoAsc.filter(data => data.singingInfoId === unitId && data.type === 'uver').map(data=>data.songId);
    const unitVerSongs: SongMaster[] 
        = unitVerSongInfos.map(songid=>songMaster.find(data=>songid===data.songId && data.isSoloColle === 0))
        .filter((item): item is SongMaster => typeof item == 'object').slice().reverse();

    return (<>
   <div 
          className="
          px-0
              text-2xl font-mono flex items-center w-full
              after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
          "
      >
          <svg className="fill-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 13.5351V3H20V5H14V17C14 19.2091 12.2091 21 10 21C7.79086 21 6 19.2091 6 17C6 14.7909 7.79086 13 10 13C10.7286 13 11.4117 13.1948 12 13.5351ZM10 19C11.1046 19 12 18.1046 12 17C12 15.8954 11.1046 15 10 15C8.89543 15 8 15.8954 8 17C8 18.1046 8.89543 19 10 19Z"></path></svg>
          {'ユニット曲'}
      </div>
      <div className="flex">
        <div className={`
          max-w-[700px] w-full
          px-0 mobileM:px-2
          
        `}>
          <SongCarousel songArray={unitSongs} displaySongCnt={5} displayArtist={false} useArtistBadge={false} displayReleaseDate={true} />
        </div>
      </div>
      <div 
          className="
              text-2xl font-mono flex items-center w-full
              after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
          "
      >
          <svg className="fill-teal-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 13.5351V3H20V5H14V17C14 19.2091 12.2091 21 10 21C7.79086 21 6 19.2091 6 17C6 14.7909 7.79086 13 10 13C10.7286 13 11.4117 13.1948 12 13.5351ZM10 19C11.1046 19 12 18.1046 12 17C12 15.8954 11.1046 15 10 15C8.89543 15 8 15.8954 8 17C8 18.1046 8.89543 19 10 19Z"></path></svg>
          {'ユニット合同曲'}
      </div>
      <div className="flex">
        <div className={`
          max-w-[700px] w-full
          px-0 mobileM:px-2
          
        `}>
          <SongCarousel songArray={collaboSongs} displaySongCnt={4} displayArtist={true} useArtistBadge={false} displayReleaseDate={true} />
        </div>
      </div>
      {coverSongs.length===0 
            ? <></>
            :<div 
          className="
              text-2xl font-mono flex items-center w-full
              after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
          "
      >
          <svg className="fill-lime-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 13.5351V3H20V5H14V17C14 19.2091 12.2091 21 10 21C7.79086 21 6 19.2091 6 17C6 14.7909 7.79086 13 10 13C10.7286 13 11.4117 13.1948 12 13.5351ZM10 19C11.1046 19 12 18.1046 12 17C12 15.8954 11.1046 15 10 15C8.89543 15 8 15.8954 8 17C8 18.1046 8.89543 19 10 19Z"></path></svg>
          {'カバー曲'}
      </div>
            }
      <div className="flex">
        <div className={`
          max-w-[700px] w-full
          px-0 mobileM:px-2
          
        `}>
          <SongCarousel songArray={coverSongs} displaySongCnt={5} displayArtist={false} useArtistBadge={false} displayReleaseDate={true} />
        </div>
      </div>
      <div 
          className="
              text-2xl font-mono flex items-center w-full
              after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
          "
      >
      <svg className="fill-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 13.5351V3H20V5H14V17C14 19.2091 12.2091 21 10 21C7.79086 21 6 19.2091 6 17C6 14.7909 7.79086 13 10 13C10.7286 13 11.4117 13.1948 12 13.5351ZM10 19C11.1046 19 12 18.1046 12 17C12 15.8954 11.1046 15 10 15C8.89543 15 8 15.8954 8 17C8 18.1046 8.89543 19 10 19Z"></path></svg>
          {'ユニットVer'}
      </div>
      <div className="flex">
        <div className={`
          max-w-[700px] w-full
          px-0 mobileM:px-2
          
        `}>
          <SongCarousel songArray={unitVerSongs} displaySongCnt={5} displayArtist={false} useArtistBadge={false} displayReleaseDate={true} />
        </div>
      </div>



  {/* 検索 */}
        <div className="flex justify-center m-auto pt-12">
            <Link 
          href={{ pathname: '/search', query: {q: unitId}}}
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
                      {unitName}
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