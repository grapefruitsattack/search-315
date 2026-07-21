"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { UserReadingData,Story } from '@/data/types';
import SongList from "@/features/common/components/SongList";
import StoryBlock from "@/features/common/components/story/StoryBlock";

export default function StoryCarousel(
  { StoryArray,displayCnt,login}
  : { StoryArray: {story: Story;userReadingData: UserReadingData | null;}[], displayCnt: number, login:boolean }
) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // const displayStory: Story[][] = StoryArray.reduce(
  //       (newarr, _, i) => (i % displayCnt ? newarr : [...newarr, StoryArray.slice(i, i + displayCnt)]),
  //       [] as Story[][]
  //   );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if(displayCnt!==3){
    return (
      <div className="mx-auto  py-0">
        <Carousel className="w-full " setApi={setApi}
          opts={{
            loop: false,
            align: "start",
          }}>
          <CarouselContent className="pl-4 -ml-[7px] mr-2">
            {StoryArray.map((result,mainIndex) => (
              <CarouselItem 
                className={`basis-[calc(100%-35px)] mr-auto pl-4  ${mainIndex !== current - 1&&'opacity-50 pointer-events-none'}`} 
                key={mainIndex}
              >
                  <div className={`py-1`} key={result.story.storyId}>
                    <StoryBlock
                      key={result.story.storyId}
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={`top-[calc(100%+0.5rem)] left-0 translate-y-0 ml-4 tablet:ml-0`} />
          <CarouselNext className="top-[calc(100%+0.5rem)] left-2 translate-x-full translate-y-0 ml-4 tablet:ml-0" />
        </Carousel>
        {/* <div className={`${count===1?'collapse':'flex'} my-2  mr-4 text-sm mobileM:text-base items-center justify-end gap-2`}>
          {`${current}/${count}`}
        </div> */}
      </div>
    );
  }

  if(displayCnt===3){
    return (
      <div className="mx-auto  py-4">
        <Carousel className="w-full " setApi={setApi}
          opts={{
            loop: false,
            align: "start",
          }}>
          <CarouselContent className="pl-4 -ml-[7px] mr-2">
            {StoryArray.map((result,mainIndex) => (
              <CarouselItem 
                className={`basis-[32%] mr-auto pl-4  ${!(mainIndex >= current-1 && mainIndex <= current+1)&&'opacity-50 pointer-events-none'}`} 
                key={mainIndex}
              >
                  <div className={`py-1`} key={result.story.storyId}>
                    <StoryBlock
                      key={result.story.storyId}
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={`top-[calc(100%+0.5rem)] left-0 translate-y-0 ml-4 tablet:ml-0`} />
          <CarouselNext className="top-[calc(100%+0.5rem)] left-2 translate-x-full translate-y-0 ml-4 tablet:ml-0" />
        </Carousel>
        <div className={`${count===1?'collapse':'flex'} my-2  mr-4 text-sm mobileM:text-base items-center justify-end gap-2`}>
          {`${current}/${count}`}
        </div>
      </div>
    );
  }
}
