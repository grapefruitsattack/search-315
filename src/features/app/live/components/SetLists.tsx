'use client'
import { useState } from "react";
import Link from 'next/link';
import type { SongMaster,LiveSetLists } from '../../../../data/types';
import liveSetLists from '../../../../data/liveSetLists.json';
import songMaster from '../../../../data/songMaster.json';

export default function SetLists({ livePerId, type }: { livePerId: string, type: string }) {
    
    const liveSetListsResults : LiveSetLists[]
        = liveSetLists.filter(data => data.livePerId === livePerId) || [];
    const results : (SongMaster | undefined)[] 
        = liveSetListsResults.map((data)=>{
            //7th横浜バトルミックス、8thライライメイシ用暫定対応
                if(data.songId==''){
                    return{
                        trackNo: 0,
                        albumId: '',
                        songId: '',
                        songTitle: data.name,
                        displayArtist: data.displayArtist,
                        commonSong: '',
                        youtubeId: '',
                        trialYoutubeId: '',
                        execFlg: 0,
                        colleFlg: 0,
                        isSoloColle: 0,
                        isUnitColle: 0,
                        releaseDate: '',
                        AlbumSereisId:'',
                        albumTitleFull:'',
                        albumTitle:'',
                        description:'',
                    }
                }else if(data.trackNo!==0){
                    const songInfo: SongMaster | undefined = songMaster.find(song=>song.songId === data.songId);
                    return songInfo===undefined
                    ?undefined
                    :{...songInfo,
                        songTitle: data.name,
                        displayArtist: data.displayArtist
                    }
                };

        });
    
    //開閉
    const [isOpen, setISopen] = useState(true);
console.log(type==='ex')
    return(
    <>
        <a 
            className="
                text-2xl font-mono flex items-center w-full
                after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
                cursor-pointer lg:cursor-auto 
            "
            onClick={()=>setISopen(!isOpen)}
        >
                {isOpen
                ?<svg className="lg:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path></svg>
                :<svg className="lg:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path></svg>
                }
                <svg className="fill-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M20 3V17C20 19.2091 18.2091 21 16 21C13.7909 21 12 19.2091 12 17C12 14.7909 13.7909 13 16 13C16.7286 13 17.4117 13.1948 18 13.5351V5H9V17C9 19.2091 7.20914 21 5 21C2.79086 21 1 19.2091 1 17C1 14.7909 2.79086 13 5 13C5.72857 13 6.41165 13.1948 7 13.5351V3H20ZM5 19C6.10457 19 7 18.1046 7 17C7 15.8954 6.10457 15 5 15C3.89543 15 3 15.8954 3 17C3 18.1046 3.89543 19 5 19ZM16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z"></path></svg>
                {'セットリスト'}
                 {/* 注釈　PC版 */}
                <div className={
                    type==='ex'
                    ?`ml-2 hidden lg:flex flex-wrap fill-red-600
                    text-sm font-sans text-gray-900 bg-gray-200`
                    :`hidden`
                }>
                <span className="pr-1 text-red-500">
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 2 24 24" width="18" height="18"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path></svg>
                </span>
                </span>
                    <p className="w-fit">
                        {'SideM楽曲・SideMメンバー歌唱曲のみ掲載'}
                    </p>
                </div>
        </a>
        <div className={`
             items-start gap-3 grid-cols-1 lg:grid-cols-3 mt-5
             ${isOpen?'lg:grid grid':'lg:grid hidden'}    
        `}>
        {/* 注釈　スマホ版 */}
        <div className={
            type==='ex'
            ?`ml-2 lg:hidden flex flex-wrap fill-red-600
            text-sm font-sans text-gray-900 bg-gray-200`
            :`hidden`}>
            <p className="w-fit bg-gray-200">
            <span className="pr-1 text-red-500">
                <span className="">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 2 24 24" width="18" height="18"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path></svg>
                </span>
            </span>
                {'SideM楽曲・SideMメンバー歌唱曲のみ掲載'}
            </p>
        </div>
        {results.map((result, index) => 
            result === undefined
            ?(<></>)
            //7th横浜用暫定対応
            :result.songId === ''
            ?(
                <div
                key={index} 
                className ="
                  inline-block
                  w-fit 
                  text-base p-0.5
                  rounded-md
                  leading-tight
                  font-sans
                  row-span-1 col-span-2 
                  rounded-md px-1 pt-1 
                  from-cyan-100/30 to-violet-200/30
                  text-zinc-800
                ">
                <span>
                {result.songTitle}
                </span>
                <span 
                    className = {`
                    ${result.displayArtist===''?'hidden':'text-cyan-800/90'}`}>
                {' - '}{result.displayArtist}
                </span>
                </div>
            )
            :(
                <div
                key={index}
                className ="
                  inline-block
                  leading-tight
                  row-span-1 col-span-2 
                  px-1 pt-1
                  w-fit
                  text-base p-0.5
                  font-sans
                  text-zinc-800
                " >
                <Link
                className ="
                  rounded-md
                  underline
                  font-sans
                  from-cyan-100/30 to-violet-200/30
                  text-zinc-800
                  hover:bg-gradient-to-tl
                  hover:text-cyan-900 
                  duration-500 ease-out
                "
                href={`/song/` + result.songId}
                >
                    <span>
                    {result.songTitle}
                    </span>
                </Link>
                    <span 
                        className = {`
                        ${result.displayArtist===''?'hidden':'text-cyan-800/90'}`}>
                    {' - '}{result.displayArtist}
                    </span>
                </div>
            )
        )}
        </div>

    </>
    )
}
