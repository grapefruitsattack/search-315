'use client'
import Link from 'next/link';
import Image from 'next/image';
import HeaderDrawerButton from './HeaderDrawerButton';
import UserButton from "./UserButton";

export default function CommonHeader() {


    //検索結果画面共有ボタン
    // const searchParams = useSearchParams();
    // let isSearchPage: boolean = false;
    // let search: string[] = [];
    // let filter: string[] = [];
    // let shareStr: string = '';
    // let sharePass: string = '';
    // if(usePathname()==='/search/'){
    //     const order :string = searchParams.get('order') || 'desc';
    //     const subscExists :number = Number(searchParams.get('subsc')) || 0;
    //     const colleFlg :number = Number(searchParams.get('colle')) || 0;
    //     isSearchPage = true;
    //     search = searchParams.get('q')?.split(' ')||[];
    //     filter = searchParams.get('f')?.split(' ')||[];
    //     const searchTargetStr: string = getSearchTargetStr(search);
    //     switch (searchParams.get('tab')) {
    //         case 'song' :
    //         case null :
    //             shareStr = searchTargetStr===''?'曲検索結果':'「'+searchTargetStr+'」曲一覧';
    //             sharePass = `search/?q=${search.join('+')}&tab=song&order=${order}&f=${filter.join('+')}`;
    //             break;
    //         case 'album':
    //             shareStr = searchTargetStr===''?'アルバム検索結果':'「'+searchTargetStr+'」アルバム一覧';
    //             sharePass = `search/?q=${search.join('+')}&tab=album&order=${order}&f=${filter.join('+')}`;
    //             break;
    //         default:
    //             shareStr = '検索結果';
    //             sharePass = `search/?q=${search.join('+')}`;
    //             break;
    //     }
    // }

    //雪を積もらせる
    //ローカルストレージ
    //const jsonStr = localStorage.getItem('snowParam');
    // const currentSnowParam: {snowIsValid: string, noticeCheckedYear: string} 
    //     = jsonStr===null?{snowIsValid:'1',noticeCheckedYear:''}:JSON.parse(jsonStr);
    const currentSnowParam: {snowIsValid: string, noticeCheckedYear: string}  = {snowIsValid:'0',noticeCheckedYear:''};
    //const snowImgSrc: string ='/snow/artworksnow'+String(Math.floor(Math.random() * 3)+1)+'.png';

    
    return (
        <>
        <div className={`w-[100vw] max-w-5xl items-center justify-between font-mono text-sm lg:flex visible pc:collapse`}>
            <div className="z-50 py-1 tablet:py-2 fixed left-0 top-0 flex flex-row w-[100vw] items-center  justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl ">  
            <HeaderDrawerButton/>

            <code className="font-mono font-bold">
                <Link
                    className ="relative"
                    href={`/`}
                    rel="noopener noreferrer"
                >
                <Image className="tablet:w-[200px] w-[150px] h-[50px]" src="/search315_logo.svg" width="200" height="200" alt="ホームアイコン" />
                <Image
                className={currentSnowParam.snowIsValid==='0'
                    ?'hidden':` absolute left-[3px] top-[3px] tablet:left-[4px] tablet:top-[-5px] h-auto tablet:w-[195px] w-[146px]  `}
                src={'/snow/logosnow.png'}
                alt="logosnow"
                width={195}
                height={195}
                />
                </Link>
            </code>
            <div className="absolute right-2 pr-2" >
            {/* @ts-ignore Server Component */}
            <UserButton/>
            </div>
            </div>
        </div>
        </>
        );
    }