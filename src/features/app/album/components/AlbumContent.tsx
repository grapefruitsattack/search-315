'use client'
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from "framer-motion";
import type { Albums } from '@/data/types';
import albumMaster from '@/data/albumMaster.json';
import subscAlbums from '@/data/subscAlbums.json';
import GetArtWorkSrc from '@/features/common/utils/GetArtWorkSrc';
import {GetArtistJsx,GetArtistBadgeInfo} from '@/features/common/utils/ArtistUtils';
import IdolBadge from '@/features/common/components/IdolBadge';
import CopyButton from "@/features/common/components/CopyButton";
import {ShareModalButton} from "@/features/app/shareModal/ShareModalButton";
import AlbumSongs from './AlbumSongs'
import AlbumSeries from './AlbumSeries'
import { Disc2 } from "lucide-react";

const SubscButton = dynamic(() => import("@/features/common/components/SubscButton"), {ssr: false,});

export default function AlbumContent({ album, }: { album: Albums}) {

  // アーティスト
  const artistArray: string[] = GetArtistBadgeInfo(album.artist);
  //アートワーク
  const imgSrc: string = GetArtWorkSrc(album.sereisId||'',album.isSoloColle,album.isUnitColle);
  //リリース日
  const releaseDate: string 
    = new Date(
      Number(album.releaseDate.substring(0,4))
      ,Number(album.releaseDate.substring(4,6))-1
      ,Number(album.releaseDate.substring(6,8))).toLocaleDateString("ja-JP");

  const series : Albums[] | undefined 
    = albumMaster.filter(data => data.albumId !== album.albumId && data.sereisId === album.sereisId)||[];
  
  //YoutubeURL取得
  const youtubeId: string
    = album.subscFlg===1
      ?subscAlbums.find(data=>album.albumId===data.id)?.youtubeId || ''
      :'';
  
  //雪を積もらせる
  //ローカルストレージ
  //const jsonStr = localStorage.getItem('snowParam');
  // const currentSnowParam: {snowIsValid: string, noticeCheckedYear: string} 
  //     = jsonStr===null?{snowIsValid:'1',noticeCheckedYear:''}:JSON.parse(jsonStr);
  const currentSnowParam: {snowIsValid: string, noticeCheckedYear: string}  = {snowIsValid:'0',noticeCheckedYear:''};
  //const snowImgSrc: string ='/snow/artworksnow'+String(Math.floor(Math.random() * 3)+1)+'.png';
  const snowImgSrc: string ='/snow/artworksnow1.png';
    
  return(
    <>
      <section className='tablet:px-0 px-px '>
        <div className=" mb-2 rounded
          bg-gradient-to-r from-gray-500 mobileS:to-gray-50 mobileL:from-50% from-80% to-gray-500 "
        >
          <div 
            className="
              flex items-center w-full ml-2
              text-2xl font-mono
              text-white
              cursor-pointer lg:cursor-auto 
              gap-1"
          >
            <svg className="fill-gray-500 bg-white rounded" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 16C14.2133 16 16 14.2133 16 12C16 9.78667 14.2133 8 12 8C9.78667 8 8 9.78667 8 12C8 14.2133 9.78667 16 12 16ZM12 11C12.55 11 13 11.45 13 12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11Z"></path>
            </svg>
            <p className="pr-2">{'アルバム'}</p>
          </div>
        </div>
      </section>
      <section className='tablet:px-0 px-2 '>
        <div>
          <div className='grid lg:grid-cols-songPageLg grid-cols-1 grid-rows-4 '>
              {/* アートワーク */}
            <div className={`row-span-6 w-[135px] inline-block relative`}>
              <Image
                className={`object-cover object-center h-[120px] w-[120px] max-w-[400px] aspect-square rounded-lg`}
                src={`/artwork/${imgSrc}.png`}
                alt="アートワーク"
                width={400}
                height={400}
              />
              <Image
                className={
                  currentSnowParam.snowIsValid==='0'||album.colleFlg===1
                  ?'hidden':` absolute left-[-7px] top-[-9px] h-auto w-[130px] `}
                src={snowImgSrc}
                alt="snow"
                width={130}
                height={130}
              />
            </div>
            {/* 情報 */}
            <div className={`lg:w-auto inline-block row-span-4 mx-2`}>
              <div className="tablet:text-base text-sm font-sans text-slate-500 mb-1">
                  {releaseDate}
              </div>
              {artistArray.length <= 0
                ?<div className="lg:text-xl text-base font-sans text-blue-800/80">
                    <GetArtistJsx artist={album.artist}></GetArtistJsx>
                </div>
                :<div 
                    className ='
                      flex flex-wrap relative text-sm gap-0.5 mb-1 font-sans
                      gap-y-2 gap-x-1 tablet:gap-y-1 tablet:gap-x-2'
                  >
                    {artistArray.map(
                        (result, index) => (<div key={index} className=""><IdolBadge id={result} useShortName={0} size={'normal'} linkType='music' /></div>))}
                </div>
              }
              <div className="lg:text-3xl text-xl font-mono font-bold inline-block">
                  {album.albumTitleFull}
              </div>
            </div>
          </div>

          {/* ボタン */}
          <div className='flex flex-wrap gap-4 my-4'>
            <div className={`
              grid gap-y-[5px]
              ${album.subscFlg!==1 && album.trialYoutubeId===''?' hidden':''}
              ${album.subscFlg!==1
                ?' grid-cols-1 w-2/3 tablet:w-1/3 w-full'
                :' grid-cols-[2fr_3fr] tablet:w-1/2 w-full'}
              `}>
              {/* Youtube */}
              <div className={`lg:w-auto inline-block row-span-1 lg:pr-2 pr-1`}>
                <a 
                  className="w-full"
                  href={`${youtubeId===''?'https://youtu.be/'+album.trialYoutubeId:'https://youtube.com/playlist?list='+youtubeId}`}
                  target="_blank" rel="noopener noreferrer"
                >
                  <button
                      className='rounded-lg border-2 border-red-500 w-full h-full
                      font-sans leading-tight
                      text-white fill-white bg-red-500
                      text-xs mobileM:text-sm lg:text-base
                      transition-all duration-200 ease-out
                      hover:ring-2 hover:ring-red-500 hover:ring-offset-2
                      '
                      type="button"
                      aria-controls="contents"
                  >
                    <div 
                      className='
                        flex flex-wrap justify-center items-center font-sans font-black 
                        mobileM:my-1 my-2'>
                      {youtubeId===''?'試聴動画':'YouTube'}
                      <span className="">
                        <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                      </span>
                    </div>
                  </button>
                </a>
              </div> 
              {/* サブスク */}
              <div className={`
                lg:w-auto inline-block row-span-1 h-10 
                ${album.subscFlg!==1?' hidden':''}
                `}>
                <SubscButton songId="" albumId={album.albumId} />
              </div>
            </div>
            <div className='flex gap-2 h-fit'>
              {/* シェアボタン */}
              <ShareModalButton
                key={1}
                buttonText='共有'
                initTabId=''
                tabs={[
                  {
                    title: 'YouTube',
                    id: 'yt',
                    disabled: youtubeId==='',
                    shareText: `${album.albumTitleFull} ${album.displayArtist.trim() === '' ? '': '- '+album.displayArtist}  |  YouTube\n#SideM #search315`,
                    shareUrl: youtubeId===''?'':`https://youtube.com/playlist?list=`+ youtubeId
                  },
                  {
                    title: 'サーチ315',
                    id: 'search315',
                    disabled: false,
                    shareText: `${album.albumTitleFull} ${album.displayArtist.trim() === '' ? '': '- '+album.displayArtist}  |  サーチサイコー\n#SideM #search315`,
                    shareUrl: `https://search315.com/`+'album/'+album.albumId
                  },
                ]}
              />
              {/* コピーボタン */}
              <CopyButton 
                copyText={album.albumTitleFull} 
                buttonText={'アルバム名コピー'}
                tootipText={'アルバム名をコピーしました'}
                placement='bottom'
              />
            </div>
          </div>

          <div 
            className={
              album.description===''
              ?'hidden':`w-fit pt-6 lg:text-base text-sm font-sans font-semibold`}>
              {'※'}{album.description}
          </div>
          <div className="w-fit pt-3 lg:text-base text-sm font-sans break-all">
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
        </div>
      </section>
      <section className='flex flex-col gap-6 mt-10'>
        {/* アルバム収録曲 */}
        <div className="">
          <AlbumSongs album={album}/>
        </div>

        {/* シリーズ */}
        <div className="">
          {album.sereisId === undefined || album.sereisId === '' || series.length < 1
            ?<></>
            :<AlbumSeries albumId={album.albumId} seriesId={album.sereisId}/>
          }
        </div>
      </section>

    
    </>
  )
}
