"use client"

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Video } from '@/data/types';
import m_video from '@/data/m_video.json';
import {VideoBlock} from "@/features/common/components/video/VideoBlock";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"


export function VideoCarousel({ videoIdArray }: { videoIdArray: string[] }) {
  const videoArray: Video[] = videoIdArray.map(id=>m_video.find(data=>data.videoId===id) as Video);

  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [thumbApi, setThumbApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return
      mainApi.scrollTo(index)
    },
    [mainApi, thumbApi]
  )

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return
    const index = mainApi.selectedScrollSnap()
    setSelectedIndex(index)
    thumbApi.scrollTo(index)
  }, [mainApi, thumbApi])

  useEffect(() => {
    if (!mainApi) return
    onSelect()
    mainApi.on("select", onSelect)
    mainApi.on("reInit", onSelect)
    return () => {
      mainApi.off("select", onSelect)
      mainApi.off("reInit", onSelect)
    }
  }, [mainApi, onSelect])

  return (
    <div className="flex w-full max-w-[500px] flex-col gap-3 p-4 bg-white pb-12">
      <Carousel setApi={setMainApi} className="w-full">
        <CarouselContent>
          {videoArray.map((data, index) => (
            <CarouselItem className="rounded-lg" key={index}>
              <div className="bg-white relative overflow-hidden rounded-xl">
              <VideoBlock videoId={data.videoId}/>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={`top-[calc(125%+0.5rem)] left-0 translate-y-0 ml-4 tablet:ml-0`} />
        <CarouselNext className="top-[calc(125%+0.5rem)] left-2 translate-x-full translate-y-0 ml-4 tablet:ml-0" />
      </Carousel>

      <Carousel
        setApi={setThumbApi}
        opts={{
          containScroll: "keepSnaps",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 flex-row">
          {videoArray.map((data, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 cursor-pointer pl-2 sm:basis-1/4"
              onClick={() => onThumbClick(index)}
            >
              <div
                className={cn(
                  "w-full aspect-video relative overflow-hidden rounded-lg border-2 transition-all",
                  index === selectedIndex
                    ? "border-primary opacity-100"
                    : "border-transparent opacity-40 hover:opacity-70"
                )}
              >
                {['asobichannel','asobistage'].includes(data.siteType)
                ?<div className="absolute inset-0 bg-gray-200" />
                :
                <img
                  src={['asobichannel','asobistage'].includes(data.siteType)?'http://img.youtube.com/vi/cllEYfDCrdU/mqdefault.jpg':data.thumbnailUrl}
                  alt={`Thumb ${index + 1}`}
                  width={400}
                  height={400}
                  className="h-full w-full "
                />
                }
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
