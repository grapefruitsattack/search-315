'use client'
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure, 
 } from "@chakra-ui/react";
import type { Video } from '@/data/types';
 import { ExternalLink } from 'lucide-react';


export const YoutubeModal 
= ({ video, disclosure }
: { video: Video, disclosure: any, }) => {

  const siteTitle = 
    video.siteType==='asobichannel'
      ?'アソビチャンネル'
      :video.siteType==='asobistage'?'アソビステージ':'YouTube';

  return (
  <>
  {/* モーダル部 */}
  <Modal 
      isOpen={disclosure.isOpen} onClose={disclosure.onClose} size={'xl'}
  >
      <ModalOverlay />
      <ModalContent >
        <ModalCloseButton />
        <ModalBody p={1}>
          <div className="flex flex-col bg-white rounded-md text-center pt-10 pb-2">
              <div>
                <iframe 
                    className="w-full aspect-video" 
                    src={video.embedUrl} >
                </iframe>
              </div>
              <div className="flex flex-row mx-auto mt-2 gap-2">
                <a className="
                  flex py-2 px-2 gap-1 tablet:px-5 rounded-full bg-zinc-100 items-center w-fit h-fit
                  font-mono text-xs mobileL:text-sm tablet:text-base 
                  transition-all duration-300
                  hover:ring-2 hover:ring-zinc-600 hover:ring-offset-2 hover:bg-zinc-200
                  active:scale-90
                "
                  href={video.url}
                  onClick={(e) => {}}
                  target="_blank" rel="noopener noreferrer">
                  {`${siteTitle}で見る`}
                  <ExternalLink className='mt-auto' width="16" height="16"/>
                </a>
                <a className={`${video.tiktokUrl===''&&' hidden '}
                  flex py-2 px-2 gap-1 tablet:px-5 rounded-full bg-zinc-100 items-center w-fit h-fit
                  font-mono text-xs mobileL:text-sm tablet:text-base 
                  transition-all duration-300
                  hover:ring-2 hover:ring-zinc-600 hover:ring-offset-2 hover:bg-zinc-200
                  active:scale-90
                  `}
                  href={video.url}
                  onClick={(e) => {}}
                  target="_blank" rel="noopener noreferrer">
                  {`TikTokで見る`}
                  <ExternalLink className='mt-auto' width="16" height="16"/>
                </a>
              </div>
            </div>
        </ModalBody>
      </ModalContent>
    </Modal>

  </>
  );
};