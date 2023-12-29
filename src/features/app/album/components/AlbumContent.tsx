'use client'
import type { SongMaster,Albums } from '../../../../data/types';
import GetArtWorkSrc from '../../../common/utils/GetArtWorkSrc';
import {ShareYoutubeModal} from "../../../app/shareModal/ShareYoutubeModal";
import CopyButton from "../../../common/components/CopyButton";
import SubscButton from "../../../common/components/SubscButton";
import AlbumSongs from './AlbumSongs'
import AlbumSeries from './AlbumSeries'
import { motion } from "framer-motion";

export default function AlbumContent({ album, }: { album: Albums}) {

    //アートワーク
    const imgSrc: string = GetArtWorkSrc(album.sereisId||'',album.isSoloColle,album.isUnitColle);
    //リリース日
    const releaseDate: string 
        = new Date(
            Number(album.releaseDate.substring(0,4))
            ,Number(album.releaseDate.substring(4,6))-1
            ,Number(album.releaseDate.substring(6,8))).toLocaleDateString();

    //雪を積もらせる
    //ローカルストレージ
    const jsonStr = localStorage.getItem('snowParam');
    const currentSnowParam: {snowIsValid: string, noticeCheckedYear: string} 
        = jsonStr===null?{snowIsValid:'1',noticeCheckedYear:''}:JSON.parse(jsonStr);
    const snowImgSrc: string ='/snow/artworksnow'+String(Math.floor(Math.random() * 3)+1)+'.png';
    
    return(
       
        <article className="pt-32 pb-96 px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
        <section className="mb-2 bg-gradient-to-r from-orange-500 tablet:from-0% mobileM:from-20% from-50% rounded">
            <div 
                className="
                    flex items-center w-full ml-2
                    text-2xl font-mono
                    text-white
                    cursor-pointer lg:cursor-auto 
                     gap-1
                ">
                <svg className="fill-orange-500 bg-white rounded" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 16C14.2133 16 16 14.2133 16 12C16 9.78667 14.2133 8 12 8C9.78667 8 8 9.78667 8 12C8 14.2133 9.78667 16 12 16ZM12 11C12.55 11 13 11.45 13 12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11Z"></path></svg>
                <p className="pr-2">
                {'アルバム'}

               </p>

            </div>
        </section>
        <section>
        <div className='grid lg:grid-cols-songPageLg grid-cols-1 grid-rows-4 '>
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
                className={currentSnowParam.snowIsValid==='0'||album.colleFlg===1
                    ?'hidden':` absolute left-[42px] top-[159px] lg:left-[90px] lg:top-[159px] w-[130px] `}
                src={snowImgSrc}
                alt="snow"
                />
            </div>
            {/* 情報 */}
            <div 
                className={`
                    lg:w-auto inline-block row-span-4 mx-2
                `}
            >
                <div className="lg:text-xl text-base font-sans text-slate-500">
                    {album.displayArtist}
                </div>
                <div className="lg:text-3xl text-xl font-mono font-bold inline-block">
                    {album.albumTitleFull}
                </div>
                <div className="lg:text-base text-sm font-sans text-slate-400 pt-px">
                    {releaseDate}
                </div>
            </div>
        </div>
            {/* ボタン */}
            <div className='
                grid grid-cols-2 pt-4 gap-y-[5px] 
                lg:w-1/2
            '>
                {/* Youtube */}
                {album.youtubeId==='' && album.trialYoutubeId===''
                ?<></>
                :
                <div 
                    className={`
                        lg:w-auto inline-block row-span-1 lg:pr-2 pr-1
                    `}
                >
                    <a className="w-full"
                    href={`${album.youtubeId===''?'https://youtu.be/'+album.trialYoutubeId:'https://youtube.com/playlist?list='+album.youtubeId}`}
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
                                {album.youtubeId===''?'試聴動画':'YouTube'}
                                <span className="">
                                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                                </span>

                            </div>
                        </motion.button>
                    </a>
                </div>    
                }
                {/* YouTube Music */}
                {album.youtubeId===''
                ?album.trialYoutubeId===''?<></>:<div></div>
                :
                <div 
                    className={`
                        lg:w-auto inline-block row-span-1
                    `}
                >
                    <SubscButton songId="" albumId={album.albumId} youtubeId={album.youtubeId}/>
                </div>    
                }
                <div 
                    className={`
                        lg:w-auto inline-block row-span-1 lg:pr-2 pr-1
                    `}
                >
                <ShareYoutubeModal 
                        youtubeUrl={album.youtubeId===''?'':`https://youtube.com/playlist?list=`+ album.youtubeId}
                        title={album.albumTitleFull} 
                        artistName={album.displayArtist}
                        pass={'album/'+album.albumId}
                    />
                </div>    

                <CopyButton 
                    copyText={album.albumTitleFull} 
                    buttonText={'アルバム名コピー'}
                    tootipText={'アルバム名をコピーしました'}
                    placement='bottom'
                />
            </div>

            <div className={album.description===''?'hidden':`
                w-fit pt-6 lg:text-base text-sm font-sans font-semibold
            `}>{'※'}{album.description}
            </div>
            <div className="
                w-fit pt-3 lg:text-base text-sm font-sans break-all
            ">
                <p>リリースページ：
                    <a 
                    className ="
                    underline
                    text-slate-400
                    hover:text-sky-300 
                    fill-slate-500
                    hover:fill-sky-500 
                    "
                    href={album.releasePage}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        <span>
                        {album.releasePage} 
                        <span className="pl-0.5">
                        <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                        </span>
                        </span>
                    </a>
                </p>
            </div>
            </section>

            {/* アルバム収録曲 */}
            <section className="mt-10">
            <AlbumSongs albumId={album.albumId}/>
            </section>

            {/* シリーズ */}
            <section className="mt-10">
            {
            album.sereisId === undefined || album.sereisId === ''
            ?<></>
            :<AlbumSeries albumId={album.albumId} seriesId={album.sereisId}/>
            }
            </section>

        </article>


    )
}
