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
import StoryBlock from "@/features/common/components/story/StoryBlock";

export default function StoryCarousel(
  { StoryArray,displayCnt,login,uniqueCarouselKey}
  : { StoryArray: {story: Story;userReadingData: UserReadingData | null;}[], displayCnt: number, login:boolean, uniqueCarouselKey: string }
) {
  const CAROUSEL_KEY = `story-carousel-${uniqueCarouselKey}`;

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  
  // Carousel API の初期化時
  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    // 前回の位置を復元
    const saved = sessionStorage.getItem(CAROUSEL_KEY);


    const index = Number(saved !== null?'0':saved);

    if (
      Number.isInteger(index) &&
      index >= 0 &&
      index < api.scrollSnapList().length
    ) {
      // Emblaの初期化が完全に終わってから復元
      requestAnimationFrame(() => {
        api.scrollTo(index, true);
      });
    }
    

    const handleSelect = () => {
      const index = api.selectedScrollSnap();

      setCurrent(index + 1);

      sessionStorage.setItem(
        CAROUSEL_KEY,
        String(index)
      );
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, CAROUSEL_KEY]);


  if(StoryArray.length<=displayCnt) {
    return(
      <div className={`py-1`} key={StoryArray[0].story.storyId}>
        <StoryBlock
          key={StoryArray[0].story.storyId}
          storyId={StoryArray[0].story.storyId} 
          media={StoryArray[0].story.media} 
          category={StoryArray[0].story.category} 
          website={StoryArray[0].story.website}
          headTitle={StoryArray[0].story.headTitle} 
          storyTitle={StoryArray[0].story.storyTitle} 
          releaseDate={StoryArray[0].story.releaseDate} 
          infoStory={StoryArray[0].story.infoStory} 
          howtoviewStory={StoryArray[0].story.howtoviewStory}
          url={StoryArray[0].story.url} 
          pp={StoryArray[0].story.pp||0}
          login={login}
          userReadLater={StoryArray[0].userReadingData===null?null:StoryArray[0].userReadingData.read_later}
          displayLogin={true}
        />
      </div>
    )
  }

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
