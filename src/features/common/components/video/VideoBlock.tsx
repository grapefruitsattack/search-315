'use client'

import { useState } from 'react';
import Image from 'next/image';
import type { Video,ShareModalTabInfo } from '@/data/types';
import m_video from '@/data/m_video.json';
import {YoutubeModal} from "@/features/common/components/video/YoutubeModal";
import {YoutubeShortModal} from "@/features/common/components/video/YoutubeShortModal";
import {ShareModal} from "@/features/app/shareModal/ShareModal";
import {
  useDisclosure, 
 } from "@chakra-ui/react";
 import { EllipsisVertical,ExternalLink } from 'lucide-react';
 import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const VideoBlock = ({ videoId }: { videoId: string }) => {

  const video: Video = m_video.find(data=>data.videoId===videoId) as Video;
  if(video===undefined) return(<></>);

  const siteTitle = 
    video.siteType==='asobichannel'
      ?'アソビチャンネル'
      :video.siteType==='asobistage'?'アソビステージ':'YouTube';
  const shareModalTabInfo: ShareModalTabInfo[] =[
    {
    title:siteTitle,disabled:false,id:video.siteType,shareUrl:video.url,
    shareText:`${video.title}  |  ${siteTitle}\n#SideM #search315`
  }];
  if(video.tiktokUrl!==''){
    shareModalTabInfo.push({
    title:'TikTok',disabled:false,id:'tiktok',shareUrl:video.tiktokUrl,
    shareText:`${video.title}  |  ${'TikTok'}\n#SideM #search315`
    });
  }
  
  const maxThumbnailUrl: string = video.thumbnailUrl.replace('mqdefault','maxresdefault');
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const youtubeModalDisclosure = useDisclosure();
  const shareModalDisclosure = useDisclosure();

  return (
  <>
  <div className='max-w-[500px] w-full' >
    {/* ボタン部 */}
    <button className='rounded-lg border border-teal-500 
         text-sm font-sans leading-tight
        w-full
        transition-all duration-500 ease-out
        '
        onClick={youtubeModalDisclosure.onOpen}>
        <div className="relative flex justify-center items-center aspect-video w-full rounded-lg overflow-hidden fill-blue-900/50 hover:fill-blue-900/80 duration-200">
          {['asobichannel','asobistage'].includes(video.siteType) ? (
            <div className="absolute inset-0 bg-gray-200" />
          ) : (
            <Image
              className="object-cover object-center rounded-lg w-full h-full"
              src={imageError?video.thumbnailUrl:maxThumbnailUrl}
              alt="サムネイル"
              width={1280}
              height={720}
              onError={() => {
                setImageError(true);
              }}
            />
          )}
        <div className="w-full h-full bg-slate-500 mix-blend-screen absolute"></div>
        <svg className='h-[35%] absolute' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z"></path></svg>
        <svg className='h-[50%] absolute' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path></svg>
    </div>
    </button>
    <div className='flex'>
      <p className='
        font-sans font-black lg:text-base text-sm 
        line-clamp-2 w-full
      '>
          {video.displayTitle}
      </p>
      <DropdownMenu >
          <DropdownMenuTrigger>
            <div 
              className='py-1 hover:bg-stone-300 h-fit rounded text-stone-500 hover:text-stone-900 cursor-pointer'
            >
              <EllipsisVertical className=""/>
            </div>
          </DropdownMenuTrigger>
        <DropdownMenuContent >
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <a className="flex w-full h-full"
                href={video.url}
                onClick={(e) => e.stopPropagation()}
                target="_blank" rel="noopener noreferrer">
                {`${siteTitle}で見る`}
                <ExternalLink className='mt-auto' width="16" height="16"/>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem className={`${video.tiktokUrl===''&&'hidden'}`}>
              <a className="flex w-full h-full"
                href={video.tiktokUrl}
                onClick={(e) => e.stopPropagation()}
                target="_blank" rel="noopener noreferrer">
                TikTokで見る
                <ExternalLink className='mt-auto' width="16" height="16"/>
              </a>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={()=>shareModalDisclosure.onOpen()}>
              共有
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
  {/* モーダル部 */}
  {video.siteType==='youtubeshort'
    ?<YoutubeShortModal title={video.title} embedUrl={video.embedUrl} disclosure={youtubeModalDisclosure}/>
    :<YoutubeModal title={video.title} embedUrl={video.embedUrl} disclosure={youtubeModalDisclosure}/>
  }
  <ShareModal key={video.videoId} tabs={shareModalTabInfo} initTabId={video.siteType} disclosure={shareModalDisclosure}/>
    

  </>
  );
};