'use server'
import { cache } from 'react';
import Link from 'next/link';
import { headers } from "next/headers";
import { auth, createSupabaseClient, createSupabaseClientWithLogin } from "@/auth";
import type { Story,UserReadingData } from '@/data/types';
import m_story from '@/data/m_story.json';
import StoryBlock from "@/features/common/components/story/StoryBlock";
import { MEDIA, CATEGORY, getCategoryByMedia } from '@/features/common/const/StoryInfoConst';
import CategoryBadge from '@/features/common/components/story/CategoryBadge';
import FisherYatesShuffl from '@/features/common/utils/FisherYatesShuffl';

async function getData(
  unitId: string
):Promise<{
  freeStoryData: {story:Story;userReadingData: UserReadingData | null;}[],
  paidStoryData: {story:Story;userReadingData: UserReadingData | null;}[],
  archiveStoryData: {story:Story;userReadingData: UserReadingData | null;}[],
  freeStoryCnt: number,
  paidStoryCnt: number,
  archiveStoryCnt: number,
  login:boolean
}> {
  const session = await auth.api.getSession({
      headers: await headers(),
  });
  const supabase = session?.user
      ?await createSupabaseClientWithLogin(session)
      :await createSupabaseClient()
  ;
  const userId: string | null
    = session?.user
      ?session.user.id||null
      :null;

  //ストーリー情報取得
  const displayPageSize: number = 3;
  const unitPrefix: string = unitId.substring(0,3);
  const unitStoryData: Story[] 
    = m_story.filter((data)=>
      data.infoStory.some(infoData=>infoData.infoId.substring(0,3)===unitPrefix)
    );
console.log(unitStoryData)
  const freeStoryData: Story[] = unitStoryData.filter((data)=>data.howtoviewStory.some((htvData)=>['asb_prem','asb_pur','asb_scode_cd','asb_scode'].includes(htvData)===false));
  const paidStoryData: Story[] = unitStoryData.filter((data)=>data.howtoviewStory.some((htvData)=>['asb_prem','asb_pur','asb_scode_cd','asb_scode'].includes(htvData)===true));
  const archiveStoryData: Story[] = unitStoryData.filter((data)=>[1,2].includes(data.media));
  const randArray = FisherYatesShuffl(archiveStoryData.length)
  const randArchiveStoryData: Story[] = [];
  randArchiveStoryData.push(archiveStoryData[randArray[0]-1]);
  randArchiveStoryData.push(archiveStoryData[randArray[1]-1]);
  randArchiveStoryData.push(archiveStoryData[randArray[2]-1]);

  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve(
        {
          freeStoryData:freeStoryData.slice(0,displayPageSize).map(data=>{return {story:data,userReadingData:null}})
          ,paidStoryData:paidStoryData.slice(0,displayPageSize).map(data=>{return {story:data,userReadingData:null}})
          ,archiveStoryData:randArchiveStoryData.map(data=>{return {story:data,userReadingData:null}})
          ,freeStoryCnt:freeStoryData.length
          ,paidStoryCnt:paidStoryData.length
          ,archiveStoryCnt:archiveStoryData.length
          ,login:session?.user?true:false
        }
      );
    }, 500); // ある程度の時間をローディング表示
  });
}


export default async function UnitPageStory(
  { unitId }: { unitId: string;}): Promise<JSX.Element> 
{
  const post = await getData(unitId);
  const login = post.login;
  
  return (
    <>
    <section className="flex items-center ">
      <div 
        className="flex flex-col tablet:flex-row justify-start w-fit
        text-2xl font-mono pb-1
        "
      >
        <div className='flex items-center justify-start'>
          {/* MingCute Icon */}
          <svg className="" xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <g id="document_3_line" fill='none'>
            <path d='M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z'/>
            <path className="fill-green-700" d='M18 2a2 2 0 0 1 2 2v11.586A2 2 0 0 1 19.414 17L15 21.414a2 2 0 0 1-1.414.586H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2H6v16h6v-4.5a1.5 1.5 0 0 1 1.5-1.5H18zm-.414 12H14v3.586zM10 11a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2zm5-4a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2Z'/></g>
          </svg>
          {'新着ストーリー'}
        </div>
        <div className=' ml-4 tablet:ml-2 ml-4'>
            <Link
              className='flex z-10 items-center w-fit gap-1
              border-2 border-green-700 text-green-800 bg-white
              text-sm tablet:text-base font-bold
              '
              href={{ pathname: '/search/story', query: {q: unitId, order:'desc'}}}
            >
              <span className='ml-1'>{'全'}</span>
              <span className=''>{post.freeStoryCnt}</span>
              <span className='mr-1'>{'ストーリーを見る'}</span>
              <span className='bg-green-700 fill-white'>
                <svg className='w-[22px] h-[22px] tablet:w-[24px] tablet:h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 -950 900 950">
                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
                </svg>
            </span>
            </Link>
        </div>
      </div>
      <div className='h-[0.5px] grow bg-slate-900/50 ml-[1rem] '>
      {''}
      </div>
    </section>
      <div className={`
          items-start gap-4 grid-cols-1 tablet:grid-cols-3 mt-2
          grid
      `}>
        {post.freeStoryData.map((result, index) => (
          <StoryBlock 
            key={index} 
            storyId={result.story.storyId} 
            media={result.story.media} 
            category={result.story.category} 
            website={result.story.website}
            headTitle={result.story.headTitle} 
            storyTitle={result.story.storyTitle} 
            releaseDate={result.story.releaseDate} 
            infoStory={result.story.infoStory} 
            howtoviewStory={result.story.howtoviewStory}
            url={result.story.url} 
            pp={result.story.pp||0}
            login={login}
            userReadLater={result.userReadingData===null?null:result.userReadingData.read_later}
            displayLogin={true}
          />
        ))}
      </div>
    <section className="grid grid-flow-row-dense items-start pb-8 gap-4 grid-cols-1 lg:grid-cols-3 w-full">
      {/* {recentStoryData.length===0 
            ? <div>結果なし</div>
            :recentStoryData.map((data, index) => (
            <div className="flex flex-col justify-center items-start " key={index}>
              <StoryBlock 
                key={index} 
                storyId={data.story_id}
                category={data.category}
                website={data.website}
                headTitle={data.head_title}
                infoStory={data.info_id}
                howtoviewStory={[]}
                media={data.media}
                storyTitle={data.story_title}
                url={data.url}
                pp={data.pp}
                login={login}
                userReadLater={data.user_read_later}
                displayLogin={true}
              />
            </div>))} */}
    </section>

    <section 
      className="
      text-2xl font-mono flex items-center w-full pb-1
      after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
      "
    >
      {/* Remix Icon */}
      <svg className="fill-pink-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM11 14H13V16H11V14ZM8.56731 8.81346C8.88637 7.20919 10.302 6 12 6C13.933 6 15.5 7.567 15.5 9.5C15.5 11.433 13.933 13 12 13H11V11H12C12.8284 11 13.5 10.3284 13.5 9.5C13.5 8.67157 12.8284 8 12 8C11.2723 8 10.6656 8.51823 10.5288 9.20577L8.56731 8.81346Z"></path>
      </svg>
      {''}
    </section>

    {/* アイマスポータル */}
    <section 
      className="
      text-2xl font-mono flex items-center w-full pb-4
      after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
      "
    >
      <div 
        className='rounded-lg p-1 text-sm tablet:text-xl
        border-2 border-teal-500 text-teal-700 font-bold 
        '
      >
        {MEDIA.proe.name}
      </div>
    </section>


    {/* モバエム */}
    <section 
      className="
      text-2xl font-mono flex items-center w-full pb-4
      after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
      "
    >
      <div 
        className='rounded-lg p-1 text-sm tablet:text-xl
        border-2 border-teal-500 text-teal-700 font-bold 
        '
      >
        {MEDIA.moba.name}
      </div>
    </section>
    <section 
      className="
      grid grid-cols-1 tablet:grid-cols-2
      gap-x-4 gap-y-4
      "
    ></section>

</>)
};


// function StoryInfoBlock(
//   { unitId, categoryId, storyCnt, storyData, titleJsx, howtoviews, descriptionJsx, backgroundColor, login }
//   : { 
//     unitId: string;
//     categoryId: string;
//     storyCnt: number;
//     storyData: StorySearchResult;
//     titleJsx: JSX.Element;
//     howtoviews: string[];
//     descriptionJsx: JSX.Element;
//     backgroundColor: string;
//     login: boolean;
//   }
//   ): JSX.Element
// {

//   return(
//   <div className='flex flex-col'>
//     {titleJsx}
//     <div 
//       className={`rounded-b-lg rounded-r-lg px-1 pb-2 ${backgroundColor}`}
//     >
//       {howtoviews.length <= 0
//       ?<></>
//       :
//       <div className='flex flex-wrap text-xs mobileM:text-sm px-1 pt-1 gap-1'>
//         {howtoviews.map((str, index) => (
//         <a key={index} className="justify-center border border-red-500 text-red-600 font-bold bg-white rounded-sm px-1">
//           {str}
//         </a>
//         ))}
//       </div>
//       }
//       <div className='text-xs mobileM:text-sm p-1 mb-1'>
//         {descriptionJsx}
//       </div>
//       <div className='text-sm w-fit rounded-t-lg ml-1 px-1 bg-green-600/50 text-white'>
//         <p>
//         {'最新ストーリー'}
//         </p>
//       </div>
//       <div className="flex flex-col justify-center items-start ">
//           <StoryBlock 
//             storyId={storyData.story_id}
//             media={null}
//             category={null}
//             website={storyData.website}
//             headTitle={storyData.head_title}
//             storyTitle={storyData.story_title}
//             releaseDate={''}
//             infoStory={[{personFlg:1,infoId:'JUP01'}]} 
//             howtoviewStory={[]}
//             url={storyData.url}
//             pp={storyData.pp}
//             login={login}
//             userReadLater={storyData.user_read_later}
//             displayLogin={true}
//           />
//       </div>
//       <div className='flex justify-end mt-2 text-base font-bold'>
//         <div className=' '>
//           <Link
//             className='flex z-10 items-center w-fit border-2 border-green-700 text-green-800 bg-white
//             shadow shadow-green-500/50
//             '
//             href={{ pathname: '/search/story', query: {q: unitId, c: categoryId, order:'desc'}}}
//           >
//           <span className='ml-1'>{'ほか'}</span>
//           <span className='mx-1'>{storyCnt}</span>
//           <span className='mr-2'>{'ストーリーを見る'}</span>
//           <span className='bg-green-700 fill-white'>
//             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -950 900 950" width="24px">
//             <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
//             </svg>
//           </span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// };