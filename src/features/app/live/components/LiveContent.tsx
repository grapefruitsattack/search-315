
import { Suspense } from "react";
import Link from 'next/link';
import type { LiveMovie,LiveProduct,LiveMaster } from '@/data/types';
import LiveProducts from '@/data/liveProducts.json';
import LiveMovies from '@/data/liveMovies.json';
import {ShareModalButton} from "@/features/app/shareModal/ShareModalButton";
import CopyButton from "@/features/common/components/CopyButton";
import Products from './Products'
import Movie from './Movie'
import SetLists from './SetLists'
import Performer from './Performer'
import StoryWithLive from "@/features/app/live/components/StoryWithLive";
import { LoaderIcon,MicVocal } from "lucide-react";

export default function LiveContent({ selectedLivePerId,LiveData }: { selectedLivePerId:string,LiveData: LiveMaster[] }) {

  const selectedLiveData = LiveData.find(data => data.livePerId === selectedLivePerId) as LiveMaster;
  const LivePerIdArray: string[] = LiveData.map(data=>data.livePerId);

  //開催日
  const perDateArray: string[] 
    = selectedLiveData.perDate.split(',').map(str=>{
      return new Date(
        Number(str.substring(0,4))
        ,Number(str.substring(4,6))-1
        ,Number(str.substring(6,8))).toLocaleDateString("ja-JP")
    });
  const perDateStr: string = perDateArray.join('、');

  //製品情報
  const products : LiveProduct[]
    = LiveProducts.filter(data => LivePerIdArray.includes(data.livePerId))||[];

  //映像
  const moviesDup : LiveMovie[]
    = LiveMovies.filter(data => 
        products.some(productData=>data.productId === productData.productId || data.livePerId === productData.livePerId)
        || LivePerIdArray.includes(data.livePerId)
    )||[];
  const movies: LiveMovie[] = moviesDup.filter((data,index,self)=>{
    const youtubeIdList = self.map(item => item.youtubeId);
    if (youtubeIdList.indexOf(data.youtubeId) === index) {
        return data;
      }
  });

  return(
    <>
      <div 
        className="mb-2 mobileM:mx-0 mx-1 rounded
          bg-gradient-to-r from-gray-500 mobileS:to-gray-50 mobileL:from-50% from-80% to-gray-500
          "
      >
        <div 
          className="
              flex items-center w-full ml-2
              text-2xl font-mono
              text-white
              gap-1"
        >
          <MicVocal className="text-gray-500 bg-white rounded pr-[2px] w-[24px] h-[24px]"/>
          <p className="pr-2">{'ライブ・イベント'}</p>
        </div>
      </div>
      <div className="mobileM:mx-0 mobileS:mx-2 mx-1">
        <div className='flex flex-col pb-4'>
          <div className="text-2xl lg:text-3xl font-mono font-bold inline-block">
            {LiveData[0].liveName}
          </div>
          <div className="w-fit pt-2 text-base font-sans break-all">
            <p>公式ページ：
              <a 
                className ="
                  underline
                  text-slate-400
                  hover:text-sky-300 
                  fill-slate-500
                  hover:fill-sky-500 
                "
                href={selectedLiveData.officialPage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  {selectedLiveData.officialPage} 
                  <span className="pl-0.5">
                    <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                  </span>
                </span>
              </a>
            </p>
          </div>
        </div>

        <div className='flex flex-wrap mb-1 gap-1 font-bold text-sm mobileL:text-base tablet:text-lg '>
          {LiveData.map((data,index)=>
          <Link
            className={`border border-2 rounded-xl px-2 py-[2px]
              ${selectedLivePerId===data.livePerId
                ?'bg-green-400 border-green-400 text-stone-50 pointer-events-none'
                :'bg-stone-200/20 border-stone-200 text-stone-500 '}
            `}
            key={data.perId}
            href={{ pathname: '/live/'+data.livePerId }}
            scroll={false}
            aria-disabled={selectedLivePerId===data.livePerId}
          >
            {data.displayPerName}
          </Link>
          )}
        </div>
        <div className='flex flex-col'>
          <div className="text-base lg:text-xl font-mono font-bold inline-block">
            {selectedLiveData.liveName + ' ' + selectedLiveData.perName}
          </div>
          <div className="text-base font-sans text-slate-400 pt-px">
            {perDateStr}
          </div>
        </div>
        {/* ボタン */}
        <div className='flex gap-2 my-4 h-fit'>
          {/* シェアボタン */}
          <ShareModalButton
            key={1}
            buttonText='共有'
            initTabId=''
            tabs={[
              {
                title: 'サーチ315',
                id: 'search315',
                disabled: false,
                shareText: `${LiveData[0].liveName + ' ' + selectedLiveData.perName}  |  サーチサイコー\n#SideM #search315`,
                shareUrl: `https://search315.com/`+'live/'+selectedLivePerId
              },
            ]}
          />
          {/* コピーボタン */}
          <CopyButton 
            copyText={LiveData[0].liveName + ' ' + selectedLiveData.perName}
            buttonText={'ライブ名コピー'}
            tootipText={'ライブ名をコピーしました'}
            placement='bottom'
          />
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-8">
      
        {/* 出演者 */}
        <div className="">
          <Performer livePerId={selectedLivePerId}/>
        </div>
        {/* セットリスト */}
        <div className="">
          <SetLists livePerId={selectedLivePerId} type={selectedLiveData.type}/>
        </div>
        
        {/* 映像 */}
        {movies === undefined || movies.length === 0
          ?<></>
          :
          <section className="">
            <Movie results={movies}/>
          </section>
        }
        {/* 製品 */}
        {products === undefined || products.length === 0
          ?<></>
          :
          <section className="">
            <Products results={Array.from(new Map(products.map((data) => [data.productId, data])).values())}/>
          </section>
        }
        <div className="">
          <Suspense fallback={      
            <div className="flex my-6 ">
              <LoaderIcon
                size={32}
                color="#a8a8a8"
                className="animate-pulse animate-spin mx-auto"
              />
            </div>}
          >
            <StoryWithLive livePerId={selectedLivePerId} liveId={selectedLiveData.liveId}/>
          </Suspense>
      </div>
    </div>
    </>
  )
}