'use client'
import type { LiveMovie,LiveProduct,LiveMaster } from '../../../../data/types';
import LiveProducts from '../../../../data/liveProducts.json';
import LiveMovies from '../../../../data/liveMovies.json';
import {ShareYoutubeModal} from "../../../app/shareModal/ShareYoutubeModal";
import CopyButton from "../../../common/components/CopyButton";
import Products from './Products'
import Movie from './Movie'
import SetLists from './SetLists'
import Performer from './Performer'

export default function LiveContent({ result }: { result: LiveMaster }) {

    //開催日
    const perDateArray: string[] = result.perDate.split(',').map(str=>{
        return new Date(
            Number(str.substring(0,4))
            ,Number(str.substring(4,6))-1
            ,Number(str.substring(6,8))).toLocaleDateString()
    });
    const perDateStr: string = perDateArray.join('、');

    //製品情報
    const products : LiveProduct[]
        = LiveProducts.filter(data => data.livePerId === result.livePerId)||[];

    //映像
    const moviesDup : LiveMovie[]
        = LiveMovies.filter(data => 
            products.some(productData=>data.productId === productData.productId || data.livePerId === productData.livePerId)
        )||[];
    const movies: LiveMovie[] = moviesDup.filter((data,index,self)=>{
        const youtubeIdList = self.map(item => item.youtubeId);

        if (youtubeIdList.indexOf(data.youtubeId) === index) {
            return data;
          }
    });
    

    return(
        <article className="pt-32 pb-96 px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
        <section className="mb-2 bg-gradient-to-r from-pink-400 tablet:from-0% mobileM:from-80% from-90% rounded">
            <div 
                className="
                    flex items-center w-full ml-2
                    text-2xl font-mono
                    text-white
                     gap-1
                ">
                <svg className="fill-white rounded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M10.6144 17.7956C10.277 18.5682 9.20776 18.5682 8.8704 17.7956L7.99275 15.7854C7.21171 13.9966 5.80589 12.5726 4.0523 11.7942L1.63658 10.7219C.868536 10.381.868537 9.26368 1.63658 8.92276L3.97685 7.88394C5.77553 7.08552 7.20657 5.60881 7.97427 3.75892L8.8633 1.61673C9.19319.821767 10.2916.821765 10.6215 1.61673L11.5105 3.75894C12.2782 5.60881 13.7092 7.08552 15.5079 7.88394L17.8482 8.92276C18.6162 9.26368 18.6162 10.381 17.8482 10.7219L15.4325 11.7942C13.6789 12.5726 12.2731 13.9966 11.492 15.7854L10.6144 17.7956ZM4.53956 9.82234C6.8254 10.837 8.68402 12.5048 9.74238 14.7996 10.8008 12.5048 12.6594 10.837 14.9452 9.82234 12.6321 8.79557 10.7676 7.04647 9.74239 4.71088 8.71719 7.04648 6.85267 8.79557 4.53956 9.82234ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899ZM18.3745 19.0469 18.937 18.4883 19.4878 19.0469 18.937 19.5898 18.3745 19.0469Z"></path></svg>
                <p className="pr-2">
                {'ライブ・イベント'}

               </p>

            </div>
        </section>
        <section className="pb-8">
            <div className='flex flex-col'>
                <div className="text-2xl lg:text-3xl font-mono font-bold inline-block">
                    {result.liveName + ' ' + result.perName}
                </div>
                <div className="text-base font-sans text-slate-400 pt-px">
                    {perDateStr}
                </div>
            </div>
            {/* ボタン */}
            <div className='
                grid grid-cols-2 pt-4 gap-y-[9px] 
                lg:w-1/2 h-[80px] 
                grid-rows-[38px]
            '>
            <div 
                className={`
                    lg:w-auto inline-block row-span-1 lg:pr-2 pr-1
                `}
            >
                <ShareYoutubeModal 
                    youtubeUrl ={''} 
                    title={result.liveName + ' ' + result.perName}
                    artistName={''}
                    pass={'live/'+result.livePerId}
                />
            </div>    

            <CopyButton 
                copyText={result.liveName + ' ' + result.perName}
                buttonText={'ライブ名コピー'}
                tootipText={'ライブ名をコピーしました'}
                placement='bottom'
            />
            </div>
            <div  className="w-fit
                pt-2 text-base font-sans break-all
                "
            >
                <p>公式ページ：
                    <a 
                    className ="
                    underline
                    text-slate-400
                    hover:text-sky-300 
                    fill-slate-500
                    hover:fill-sky-500 
                    "
                    href={result.officialPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        <span>
                        {result.officialPage} 
                        <span className="pl-0.5">
                        <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path></svg>
                        </span>
                        </span>
                    </a>
                </p>
            </div>
        </section>
        
        {/* 映像 */}
        {
        movies === undefined || movies.length === 0
        ?<></>
        :
        <section className="mt-10">
            <Movie results={movies}/>
        </section>
        }
        {/* 製品 */}
        {
        products === undefined || products.length === 0
        ?<></>
        :
        <section className="mt-10">
            <Products results={products}/>
        </section>
        }
        {/* セットリスト */}
        <section className="mt-10">
            <SetLists livePerId={result.livePerId} type={result.type}/>
        </section>
        {/* 出演者 */}
        <section className="mt-10">
            <Performer livePerId={result.livePerId}/>
        </section>

        </article>
    )
    }