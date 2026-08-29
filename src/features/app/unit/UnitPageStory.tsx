'use client'
import { useEffect, useState } from "react";
import Link from 'next/link';
import type { SingingMaster,Story,UserReadingData } from '@/data/types';
import StoryBlock from "@/features/common/components/story/StoryBlock";
import StoryCarousel from "@/features/common/components/StoryCarousel";
import { Toaster } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell, House, BookOpen, ArrowRight } from "lucide-react";

export default function UnitPageStory(
  { unitId,unitMember,post }
  : {
    unitId: string; unitMember: SingingMaster[];
    post:
    {freeStoryData: {story:Story;userReadingData: UserReadingData | null;}[],
    paidStoryData: {story:Story;userReadingData: UserReadingData | null;}[],
    archiveStoryData: {story:Story;userReadingData: UserReadingData | null;}[],
    freeStoryCnt: number,
    paidStoryCnt: number,
    archiveStoryCnt: number,
    login:boolean}
  })
  
{
  const login = post.login;
  const searchQueryId = unitMember.map(data=>data.singingInfoId).join(' ');

  const allStoryData = post.freeStoryData.concat(post.paidStoryData).sort((a,b)=>a.story.seq < b.story.seq ? 1 : -1).slice(0,6);
  const StoryDataArray = [
    {story:allStoryData,type:'all',typeName:'すべて',cnt:post.freeStoryCnt+post.paidStoryCnt
      ,query: {q: searchQueryId, order:'desc', htv: 0}
    },
    {story:post.freeStoryData,type:'free',typeName:'無料',cnt:post.freeStoryCnt
      ,query: {q: searchQueryId, order:'desc', htv: 1}},
    {story:post.paidStoryData,type:'paid',typeName:'有償',cnt:post.paidStoryCnt
      ,query: {q: searchQueryId, order:'desc', htv: 3}},
  ];

  const [selectedStoryType, setSelectedStoryType] = useState<string>('all');
  const selectedStory =
    StoryDataArray.find(data => data.type === selectedStoryType)
    ?? StoryDataArray[0];
  
  return (
    <>
    <Toaster position="top-center"/>
    <Card  className="shadow-lg ">
      <CardHeader>
        <div 
          className="flex items-center w-full py-2 pl-4
            bg-gray-100 text-gray-700 mobileL:text-2xl mobileS:text-xl text-lg font-bold
            border-b "
        > 
          <BookOpen className="mr-1 text-indigo-700" />
          {'ストーリー'}
        </div>
      </CardHeader>
      <CardContent className='py-4'>
        <div 
            className="
                text-2xl font-mono flex items-center w-full pl-1 pr-8
                after:h-[0.5px] after:grow after:bg-indigo-700/50 after:ml-[1rem] 
                text-base tablet:text-lg font-bold
            "
        >
          <Bell className=" text-indigo-500 w-[20px]"  />
          {'新着ストーリー'}
        </div>
        <div 
          className={`
            flex flex-wrap px-2
            mt-2 mb-4 gap-1 font-bold 
          `}
        >
            {StoryDataArray.map((data,index)=>
            <button
              className={`border border-2 rounded-xl px-2 py-[2px]
                ${selectedStory.type===data.type
                  ?'bg-green-400 border-green-400 text-stone-50 pointer-events-none'
                  :'bg-stone-200/20 border-stone-200 text-stone-500 '}
              `}
              key={data.type}
              onClick={()=>setSelectedStoryType(data.type)}
              aria-disabled={selectedStory.type===data.type}
            >
              {data.typeName}
            </button>
            )}
        </div>
        <div className='tablet:hidden'>
          <StoryCarousel StoryArray={selectedStory.story} displayCnt={1} login={login} uniqueCarouselKey={`unit-new-${selectedStory.type}-${unitId}`} />
        </div>
        <div 
          className="hidden tablet:flex h-fit w-full rounded-md overflow-x-scroll overflow-y-hidden"
        >
          <div 
            className="flex flex-row flex-nowrap
            gap-4 lg:px-4 px-2 pt-2 pb-6
            "
          >
          {selectedStory.story.map((result, index) => (
            <div key={index} className="pc:min-w-[290px] min-w-[260px]">
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
            </div>
          ))}
          </div>
        </div>

        <div className='flex tablet:mt-4 pr-2 tablet:pr-2 pt-[42px] tablet:pt-0'>
          <Link
            className='
              flex py-1 ml-auto gap-1 px-2 tablet:px-5 rounded-full bg-gray-200 items-center w-fit h-fit
              font-mono text-xs mobileL:text-sm tablet:text-base 
              transition-all duration-300
              hover:ring-2 hover:ring-zinc-600 hover:ring-offset-2 hover:bg-zinc-200
              active:scale-90
            '
            href={{ pathname: '/search/story', query: selectedStory.query}}
          >
            <span className='ml-1'>{'全'}</span>
            <span className='font-bold'>{selectedStory.cnt}</span>
            <span className='mr-1'>{`${selectedStory.type==='all'?'':selectedStory.typeName}ストーリーを見る`}</span>
            <span className=''>
              <ArrowRight 
                className=' w-[22px] tablet:w-[24px]'
              />
          </span>
          </Link>
        </div>


        <div className="flex items-center pt-8">
          <div 
            className="flex flex-col tablet:flex-row justify-start w-fit
            text-base tablet:text-lg font-bold font-mono  pl-1
            "
          >
            <div className='flex items-center justify-start'>
              <House className=" text-indigo-500 w-[20px]" />
              <div>
                {'アーカイブストーリー'}
              </div>
            </div>
            <div className='pl-[20px] mobileM:pl-[24px]'>
              {'(ランダム表示)'}
            </div>
          </div>
          <div className='h-[0.5px] grow bg-indigo-700/50 ml-[1rem] pr-8'>
          {''}
          </div>
        </div>
        <div className='tablet:hidden'>
          <StoryCarousel StoryArray={post.archiveStoryData} displayCnt={1} login={login} uniqueCarouselKey={`unit-archive-${unitId}`} />
        </div>
        <div 
          className="hidden tablet:flex h-fit w-full rounded-md overflow-x-scroll overflow-y-hidden"
        >
          <div 
            className="flex flex-row flex-nowrap
            gap-4 lg:px-4 px-2 pt-2 pb-6
            "
          >
            {post.archiveStoryData.map((result, index) => (
              <div key={index} className="pc:min-w-[290px] min-w-[260px]">
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
              </div>
            ))}
          </div>
        </div>
        <div className='flex tablet:mt-4 pr-2 tablet:pr-2 pt-[42px] tablet:pt-0'>
            <Link
              className='
                flex flex-wrap py-1 ml-auto gap-1 px-2 tablet:px-5 rounded-full bg-gray-200 items-center w-fit h-fit
                font-mono text-xs mobileL:text-sm tablet:text-base 
                transition-all duration-300
                hover:ring-2 hover:ring-zinc-600 hover:ring-offset-2 hover:bg-zinc-200
                active:scale-90
              '
              href={{ pathname: '/search/story', query: {q: searchQueryId, order:'desc', htv: 2}}}
            >
              <span className='ml-1'>{'全'}</span>
              <span className='font-bold'>{post.archiveStoryCnt}</span>
              <span className='mr-1'>{'アーカイブストーリーを見る'}</span>
              <span className=''>
                <ArrowRight 
                  className=' w-[22px] tablet:w-[24px]'
                />
            </span>
            </Link>
        </div>
      </CardContent>
    </Card>
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