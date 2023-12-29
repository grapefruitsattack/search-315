'use client'
import { motion } from "framer-motion";
import type { SongMaster,Albums,MvInfo,LiveMaster } from '../../../../data/types';
import MvInfos from '../../../../data/mvInfo.json';
import GetArtWorkSrc from '../../../common/utils/GetArtWorkSrc';
import GetMv from '../../../common/utils/GetMv';
import SearchLiveBySongId from '../../../common/utils/SearchLive';
import CopyButton from "../../../common/components/CopyButton";
import SubscButton from "../../../common/components/SubscButton";
import {ShareYoutubeModal} from "../../../app/shareModal/ShareYoutubeModal";
import OtherVersion from './OtherVersion'
import Mv from './Mv'
import Live from './Live'

export default function SongContent({ result, albumResult }: { result: SongMaster, albumResult: Albums }) {

    //MV情報
    const mv : MvInfo[] = GetMv(result);
    //ライブ情報
    const live : LiveMaster[] = SearchLiveBySongId(result).slice().reverse();
    //アートワーク
    const imgSrc: string = GetArtWorkSrc(albumResult.sereisId||'',result.isSoloColle,result.isUnitColle);
    //リリース日
    const releaseDate: string 
        = new Date(
            Number(result.releaseDate.substring(0,4))
            ,Number(result.releaseDate.substring(4,6))-1
            ,Number(result.releaseDate.substring(6,8))).toLocaleDateString();

    
    //雪を積もらせる
    //ローカルストレージ
    const jsonStr = localStorage.getItem('snowParam');
    const currentSnowParam: {snowIsValid: string, noticeCheckedYear: string} 
        = jsonStr===null?{snowIsValid:'1',noticeCheckedYear:''}:JSON.parse(jsonStr);
    const snowImgSrc: string ='/snow/artworksnow'+String(Math.floor(Math.random() * 3)+1)+'.png';


    return(
        <article className="pt-32 pb-96 px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
        <section className="mb-2 bg-gradient-to-r from-cyan-500/70 tablet:from-0% from-20% rounded">
            <div 
                className="
                    flex items-center w-full ml-2
                    text-2xl font-mono
                    text-white
                    cursor-pointer lg:cursor-auto 
                     gap-2
                ">
                <svg className="fill-cyan-500 bg-white rounded" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 24 24" width="24" height="24">
                    <path d="M20 3V17C20 19.2091 18.2091 21 16 21C13.7909 21 12 19.2091 12 17C12 14.7909 13.7909 13 16 13C16.7286 13 17.4117 13.1948 18 13.5351V5H9V17C9 19.2091 7.20914 21 5 21C2.79086 21 1 19.2091 1 17C1 14.7909 2.79086 13 5 13C5.72857 13 6.41165 13.1948 7 13.5351V3H20ZM5 19C6.10457 19 7 18.1046 7 17C7 15.8954 6.10457 15 5 15C3.89543 15 3 15.8954 3 17C3 18.1046 3.89543 19 5 19ZM16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z"></path></svg>
               <p className="pr-2">
                {'曲'}

               </p>

            </div>
        </section>
        <section className="mb-16 text-start align-middle gap-x-5">
            <div className='
                grid 
                lg:grid-cols-songPageLg grid-cols-1 grid-rows-4 
                '>
                {/* アートワーク */}
                <div 
                    className={`
                        row-span-6 lg:w-auto w-[120px] inline-block 
                    `}
                >
                    <img
                    className={`object-cover object-center lg:h-[120px] lg:w-[120px] h-auto w-full max-w-[400px] aspect-square rounded-lg`}
                    src={`/artwork/${imgSrc}.png`}
                    alt="アートワーク"
                    />
                    <img
                    className={currentSnowParam.snowIsValid==='0'||result.colleFlg===1
                        ?'hidden':` absolute left-[42px] top-[159px] lg:left-[90px] lg:top-[159px] h-auto w-[130px] `}
                    src={snowImgSrc}
                    alt="snow"
                    />
                </div>
                {/* 情報 */}
                <div 
                    className={`
                        lg:w-auto inline-block row-span-4 px-2
                    `}
                >
                    <div className="tablet:text-xl text-base font-sans leading-tight lg:leading-normal">
                        <a 
                        className ="hover:text-sky-300 underline text-slate-500"
                        href={`/album/` + result.albumId}
                        >{albumResult.albumTitleFull}
                        </a>
                    </div>
                    <div className="text-2xl tablet:text-3xl font-mono font-bold inline-block">
                        {result.songTitle}
                    </div>
                    <div className="tablet:text-xl text-base font-sans text-slate-500">
                        {result.displayArtist}
                    </div>
                    <div className="tablet:text-base text-sm font-sans text-slate-400 pt-px">
                        {releaseDate}
                    </div>
                </div>
            </div>

            {/* ボタン */}
            <div className='
                grid grid-cols-2 mt-4 gap-y-[5px] 
                lg:w-1/2 
            '>
                {/* Youtube */}
                {result.youtubeId==='' && result.trialYoutubeId===''
                ?<></>
                :
                <div 
                    className={`
                        lg:w-auto inline-block row-span-1 lg:pr-2 pr-1
                        
                    `}
                >
                    <a className=""
                    href={`https://youtu.be/${result.youtubeId===''?result.trialYoutubeId:result.youtubeId}`}
                    target="_blank" rel="noopener noreferrer">
                        <motion.button
                            className='rounded-lg border-2 border-red-500 w-full h-full
                            text-red-500 font-sans leading-tight
                            hover:bg-red-500 hover:text-red-100 
                            transition-all duration-500 ease-out
                            fill-red-500 hover:fill-red-100 
                            text-sm mobileM:text-base lg:text-lg
                            '
                            type="button"
                            aria-controls="contents"
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.05 }}
                        >
                            <div className='
                                flex flex-wrap justify-center items-center font-sans font-black 
                                mobileM:my-1 my-2
                            '>
                                {result.youtubeId===''?'試聴動画':'YouTube'}
                                <span className="">
                                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                                </span>
                            </div>
                        </motion.button>
                    </a>
                </div>    
                }
                {/* YouTube Music */}
                {result.youtubeId===''
                ?result.trialYoutubeId===''?<></>:<div></div>
                :
                <div 
                    className={`
                        lg:w-auto inline-block row-span-1 h-[44px]
                    `}
                >
                    <SubscButton songId={result.songId} albumId="" youtubeId={result.youtubeId}/>
                </div>    
                }
                <div 
                    className={`
                        lg:w-auto inline-block row-span-1 lg:pr-2 pr-1
                    `}
                >
                <ShareYoutubeModal 
                        youtubeUrl ={result.youtubeId===''?'':`https://youtu.be/`+ result.youtubeId}
                        title={result.songTitle} 
                        artistName={result.displayArtist}
                        pass={'song/'+result.songId}
                    />
                </div>
                
                <CopyButton 
                    copyText={result.songTitle} 
                    buttonText={'曲名コピー'}
                    tootipText={'曲名をコピーしました'}
                    placement='bottom'
                />
            </div>

            <div className={result.description===''?'hidden':`
                w-fit pt-6 lg:text-base text-sm font-sans font-semibold
            `}>{'※'}{result.description}
            </div>
            <div className="
                w-fit pt-3 lg:text-base text-sm font-sans break-all
            ">
                <p>リリースページ：
                    <a 
                    className ="
                    underline text-slate-400 hover:text-sky-300 fill-slate-500 hover:fill-sky-500 
                    "
                    href={albumResult.releasePage}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                        <span>
                        {albumResult.releasePage} 
                        <span className="pl-0.5">
                        <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                        </span>
                        </span>
                    </a>
                </p>
            </div>
        </section>

        {/* MV */}
        {
        mv === undefined || mv.length === 0
        ?<></>
        :
        <section className="mt-10">
            <Mv mvInfos={mv}/>
        </section>
        }

        {/* ライブ */}
        {
        live === undefined || live.length === 0
        ?<></>
        :
        <section className="mt-10">
            <Live results={live}/>
        </section>
        }

        {/* 他のバージョン */}
        {
        result.commonSong === ''
        ?<></>
        :
        <section className=" mt-10">
            <OtherVersion id={result.songId} commonSongId={result.commonSong}/>
        </section>
        }

        </article>
    )
}
