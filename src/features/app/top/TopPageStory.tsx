'use client'
import { useState } from "react";
import Link from 'next/link';
import type { SingingMaster,Story,UserReadingData } from '@/data/types';
import StoryBlock from "@/features/common/components/story/StoryBlock";
import StoryCarousel from "@/features/common/components/StoryCarousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster } from 'sonner';
import { Bell, BookOpen } from "lucide-react";

export default function TopPageStory(
  { post }
  : {
    post:
    {freeStoryData: {story:Story;userReadingData: UserReadingData | null;}[],
    paidStoryData: {story:Story;userReadingData: UserReadingData | null;}[],
    freeStoryCnt: number,
    paidStoryCnt: number,
    login:boolean}
  })
  
{
  const login = post.login;

  const allStoryData = post.freeStoryData.concat(post.paidStoryData).sort((a,b)=>a.story.seq < b.story.seq ? 1 : -1).slice(0,6);
  const StoryDataArray = [
    {story:allStoryData,type:'all',typeName:'すべて',cnt:post.freeStoryCnt+post.paidStoryCnt
      ,query: {order:'desc', htv: 0}
    },
    {story:post.freeStoryData,type:'free',typeName:'無料',cnt:post.freeStoryCnt
      ,query: {order:'desc', htv: 1}},
    {story:post.paidStoryData,type:'paid',typeName:'有償',cnt:post.paidStoryCnt
      ,query: {order:'desc', htv: 3}},
  ];

  const [selectedStoryType, setSelectedStoryType] = useState<string>('all');
  const selectedStory =
    StoryDataArray.find(data => data.type === selectedStoryType)
    ?? StoryDataArray[0];

  return (
    <>
    <Toaster position="top-center"/>
    <Card className="shadow-lg ">
      <CardHeader>
        <div 
          className="flex items-center w-full py-2 pl-4
            bg-gray-100 text-gray-700 mobileL:text-2xl mobileS:text-xl text-lg font-bold
            border-b "
        > 
          <BookOpen className="mr-1 text-indigo-700" />
          {'最新ストーリー'}
        </div>
      </CardHeader>
      <CardContent>
        <div className="pb-4">
          <div 
            className={`
              flex flex-wrap px-2 pt-2
              mt-2 mb-4 gap-1 font-bold text-base
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
          <div className='tablet:hidden'>
            <StoryCarousel StoryArray={selectedStory.story} displayCnt={1} login={login} uniqueCarouselKey={`toppage-${selectedStory.type}`} />
          </div>

          <div className='flex tablet:mt-4 pr-2 tablet:pr-0 pt-[42px] tablet:pt-0'>
              <Link
                className='flex z-10 items-center w-fit gap-1
                border-2 border-green-700 text-green-800 bg-white
                text-sm tablet:text-base font-bold ml-auto
                '
                href={{ pathname: '/search/story', query: selectedStory.query}}
              >
                <span className='ml-1'>{'全'}</span>
                <span className=''>{selectedStory.cnt}</span>
                <span className='mr-1'>{`${selectedStory.type==='all'?'':selectedStory.typeName}ストーリーを見る`}</span>
                <span className='bg-green-700 fill-white'>
                  <svg className='w-[22px] h-[22px] tablet:w-[24px] tablet:h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 -950 900 950">
                  <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
                  </svg>
              </span>
              </Link>
          </div>
        </div>
      </CardContent>
    </Card>
    </>)
};