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
import type { SongMaster } from '@/data/types';
import SongList from "@/features/common/components/SongList";

export default function SongCarousel(
  { songArray,displaySongCnt,displayArtist,useArtistBadge}
  : { songArray: SongMaster[], displaySongCnt: number, displayArtist:boolean, useArtistBadge: boolean }
) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const displaySong: SongMaster[][] = songArray.reduce(
        (newarr, _, i) => (i % displaySongCnt ? newarr : [...newarr, songArray.slice(i, i + displaySongCnt)]),
        [] as SongMaster[][]
    );

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

  return (
    <div className="mx-auto  py-4">
      <Carousel className="w-full " setApi={setApi}
        opts={{
          loop: false,
          align: "start",
          containScroll: false,
        }}>
        <CarouselContent>
          {displaySong.map((data,mainIndex) => (
            <CarouselItem 
              className={`basis-[calc(100%-35px)] mr-auto ${mainIndex !== current - 1&&'opacity-50 pointer-events-none'}`} 
              key={mainIndex}
            >
              <div className={`
                items-start gap-y-0 gap-x-2 
                lg:grid grid 
                grid-cols-1 pt-1 pl-1
              `}>
                {data.map((result, index) => (
                <div className={``} key={result.songId}>
                  <SongList
                    key={result.songId}
                    index={index} 
                    song={result}
                    displayArtist={displayArtist}
                    useArtistBadge={useArtistBadge}
                    displayArtwork={true}
                    displayReleaseDate={true}
                  />
                </div>
                ))}
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
