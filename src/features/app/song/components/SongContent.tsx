'use client'
import dynamic from 'next/dynamic';
import Image from 'next/image';
import useSWR from 'swr';
import type { SongMaster,Albums,MvInfo,LiveMaster,Lyric } from '@/data/types';
import albumMaster from '@/data/albumMaster.json';
import subscSongs from '@/data/subscSongs.json';
import GetArtWorkSrc from '@/features/common/utils/GetArtWorkSrc';
import GetMv from '@/features/common/utils/GetMv';
import {GetCreditJsx,existsCredit} from '@/features/common/utils/CreditUtils';
import GetSongOtherVersion from '@/features/common/utils/GetSongOtherVersion';
import SearchLiveBySongId from '@/features/common/utils/SearchLive';
import {GetArtistJsx,GetArtistBadgeInfo} from '@/features/common/utils/ArtistUtils';
import IdolBadge from '@/features/common/components/IdolBadge';
import CopyButton from "@/features/common/components/CopyButton";
import {ShareModalButton} from "@/features/app/shareModal/ShareModalButton";
import {LyricShareModal} from "@/features/app/song/components/LyricShareModal";
import OtherVersion from './OtherVersion'
import Mv from './Mv'
import Live from './Live'
import LyricPage from './Lyric'
import {
  useDisclosure, 
 } from "@chakra-ui/react";
import { Music } from "lucide-react";

const SubscButton = dynamic(() => import("@/features/common/components/SubscButton"), {ssr: false,});

const fetcher = async (url: string) => {
  const response = await fetch(url,{cache:'force-cache'});

  if (!response.ok) {
    throw new Error('failed fetch');
  }

  return response.json();
};

export default function SongContent({ result }: { result: SongMaster }) {

  const albumResult : Albums 
    = albumMaster.find(data => data.albumId === result?.albumId) as Albums;

  const shouldFetch = result.lyric !== '';

  const { data, error, isLoading } = useSWR(
    shouldFetch ? `/api/lyric/${result.lyric}/` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 600,
    }
  );

  const lyricVer0: Lyric = { version: 0, data: [] };
  let lyric: Lyric = lyricVer0;

  if (data?.lyric && data.lyric !== 'not found') {
    lyric = JSON.parse(data.lyric);
  }
  lyric = lyric===undefined ? lyricVer0 : lyric;
  const lyricIsLoading = isLoading
  

  // アーティスト
  const artistArray: string[] = GetArtistBadgeInfo(result.artist);
  //MV情報
  const mv : MvInfo[] = GetMv(result);
  //ライブ情報
  const live : LiveMaster[] = SearchLiveBySongId(result).slice().reverse();
  //アートワーク
  const imgSrc: string = GetArtWorkSrc(albumResult.sereisId||'',albumResult.isSoloColle,albumResult.isUnitColle);
  //リリース日
  const releaseDate: string 
      = new Date(
          Number(result.releaseDate.substring(0,4))
          ,Number(result.releaseDate.substring(4,6))-1
          ,Number(result.releaseDate.substring(6,8))).toLocaleDateString("ja-JP");

  //YoutubeURL取得
  const youtubeId: string
    = result.subscFlg===1
      ?subscSongs.find(data=>result.songId===data.id)?.youtubeId || ''
      :'';
  // 他バージョン曲取得
  const otherVersionSongs : SongMaster[] = GetSongOtherVersion(result.songId,result.commonSong);

  //雪を積もらせる
  //ローカルストレージ
  //const jsonStr = localStorage.getItem('snowParam');
  // const currentSnowParam: {snowIsValid: string, noticeCheckedYear: string} 
  //     = jsonStr===null?{snowIsValid:'1',noticeCheckedYear:''}:JSON.parse(jsonStr);
  const currentSnowParam: {snowIsValid: string, noticeCheckedYear: string}  = {snowIsValid:'0',noticeCheckedYear:''};
  //const snowImgSrc: string ='/snow/artworksnow'+String(Math.floor(Math.random() * 3)+1)+'.png';
  const snowImgSrc: string ='/snow/artworksnow1.png';

  const lyricShareModalDisclosure = useDisclosure();

  return(
    <>
      <section className="mb-2 rounded
        bg-gradient-to-r from-gray-500 mobileS:to-gray-50 mobileL:from-50% from-80% to-gray-500
      ">
        <div 
          className="
            flex items-center w-full ml-2
            text-2xl font-mono
            text-white
            cursor-pointer lg:cursor-auto 
              gap-2">
          <Music  className="text-gray-500 bg-white rounded pr-[2px]"/>
          <p className="pr-2">{'楽曲'}</p>
        </div>
      </section>
      <section className="mb-16 text-start align-middle gap-x-5 tablet:mx-0 mx-2">
        <div className='grid lg:grid-cols-songPageLg grid-cols-1 grid-rows-4'>
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
              className={currentSnowParam.snowIsValid==='0'||result.colleFlg===1
                  ?'hidden':` absolute left-[-7px] top-[-9px] h-auto w-[130px] `}
              src={snowImgSrc}
              alt="snow"
              width={130}
              height={130}
            />
          </div>
          {/* 情報 */}
          <div className={`lg:w-auto inline-block row-span-4 px-2`}>
            <div className="tablet:text-base text-sm font-sans text-slate-500 ">
                {releaseDate}
            </div>
            <div className="tablet:text-xl text-base font-sans leading-tight lg:leading-normal">
                <a 
                  className ="hover:text-sky-300 underline text-slate-500"
                  href={`/album/` + result.albumId}
                >
                  {albumResult.albumTitleFull}
                </a>
            </div>
            <div className="text-2xl tablet:text-3xl font-mono font-bold inline-block">
                {result.songTitle}
            </div>

            {artistArray.length <= 0
              ?<div className="tablet:text-xl text-base font-sans text-blue-800/80">
                  <GetArtistJsx artist={result.artist}></GetArtistJsx>
              </div>
              :<div 
                  className ='
                    flex flex-wrap relative text-sm mt-0 mb-1 mx-1 font-sans
                    gap-y-2 gap-x-1 tablet:gap-y-1 tablet:gap-x-2'
                >
                  {artistArray.map(
                      (result, index) => (<div key={index} className=""><IdolBadge id={result} useShortName={0} size={'normal'} linkType='music'/></div>))}
              </div>
            }
          </div>
        </div>

        {/* ボタン */}
        <div className='flex flex-wrap gap-4 my-6'>
          <div className={`
            grid gap-y-[5px]
            ${result.subscFlg!==1 && result.trialYoutubeId===''?' hidden':''}
            ${result.subscFlg!==1
              ?' grid-cols-1 w-2/3 tablet:w-1/3 w-full'
              :' grid-cols-[2fr_3fr] tablet:w-1/2 w-full'}
            `}>
            {/* Youtube */}
            <div className={`lg:w-auto inline-block row-span-1 lg:pr-2 pr-1`}>
              <a 
                className="w-full"
                href={`https://youtu.be/${youtubeId===''?result.trialYoutubeId:youtubeId}`}
                target="_blank" rel="noopener noreferrer">
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
              ${result.subscFlg!==1?' hidden':''}
              `}>
              <SubscButton songId={result.songId} albumId=""/>
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
                  shareText: `${result.songTitle} ${result.displayArtist.trim() === '' ? '': '- '+result.displayArtist}  |  YouTube\n#SideM #search315`,
                  shareUrl: youtubeId===''?'':`https://youtu.be/`+ youtubeId
                },
                {
                  title: 'サーチ315',
                  id: 'search315',
                  disabled: false,
                  shareText: `${result.songTitle} ${result.displayArtist.trim() === '' ? '': '- '+result.displayArtist}  |  サーチサイコー\n#SideM #search315`,
                  shareUrl: `https://search315.com/`+'song/'+result.songId+'/'
                },
              ]}
            />
            {result.lyric === ''
              ?<></>
              :
              <button 
                className='
                  flex py-2 px-2 gap-1 tablet:px-5 rounded-full bg-zinc-100 items-center w-fit h-fit
                  font-mono text-xs mobileL:text-sm tablet:text-base 
                  transition-all duration-300
                  hover:ring-2 hover:ring-zinc-600 hover:ring-offset-2 hover:bg-zinc-200
                  active:scale-90
                ' 
                onClick={(lyricShareModalDisclosure.onOpen)}
              >
                <LyricShareModal song={result} disclosure={lyricShareModalDisclosure} targetRows={{ startRow: 0, endRow: 0 }} lyric={lyric} />
                {/* Google Fonts Icons */}
                <svg className="fill-zinc-600 w-[18px] h-[18px] mobileL:w-[24px] mobileL:h-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h120v80H240v400h480v-400H600v-80h120q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm200-240v-447l-64 64-56-57 160-160 160 160-56 57-64-64v447h-80Z"/>
                </svg>
                {'歌詞を共有'}
              </button>
            }
            {/* コピーボタン */}
            <CopyButton 
                copyText={result.songTitle} 
                buttonText={'曲名コピー'}
                tootipText={'曲名をコピーしました'}
                placement='bottom'
            />
          </div>
        </div>

        {/* クレジット */}
        {existsCredit(result.commonSong===''?result.songId:result.commonSong)
          ?
          <div className=' px-2 py-1 w-fit rounded border-2 border-green-500/20 lg:text-base text-sm'>
            <GetCreditJsx songId={result.commonSong===''?result.songId:result.commonSong} targetCreditId=''/>
          </div> 
          :<></>}
        <div className={
          result.description===''
            ?'hidden'
            :`w-fit mt-4 lg:text-base text-sm font-sans font-semibold`}
        >
          {'※'}{result.description}
        </div>
        <div className=" w-fit mt-4 lg:text-base text-sm font-sans break-all">
          <p>リリースページ：
            <a 
              className ="underline text-slate-400 hover:text-sky-300 fill-slate-500 hover:fill-sky-500"
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
      <section className='flex flex-col gap-6'>
        {/* 歌詞 */}
        {result.lyric === ''
          ?<></>
          :
          <section className="">
            <LyricPage song={result} lyric={lyric} lyricIsLoading={lyricIsLoading} />
          </section>
        }
        {/* MV */}
        {mv === undefined || mv.length === 0
          ?<></>
          :<section className="">
            <Mv mvInfos={mv}/>
          </section>
        }

        {/* 他のバージョン */}
        {otherVersionSongs.length < 1
          ?<></>
          :<section className="">
            <OtherVersion id={result.songId} otherVersionSongs={otherVersionSongs}/>
          </section>
        }
        
        {/* ライブ */}
        {live === undefined || live.length === 0
        ?<></>
        :<section className="">
            <Live results={live}/>
          </section>
        }

      </section>
    
    </>
  )
}
