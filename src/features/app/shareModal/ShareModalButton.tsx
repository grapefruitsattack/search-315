'use client'
import {
  useDisclosure, 
 } from "@chakra-ui/react";
import type { ShareModalTabInfo } from '@/data/types';  
import {ShareModal} from "./ShareModal";

export const ShareModalButton = (
  { tabs, initTabId, buttonText }: { tabs: ShareModalTabInfo[], initTabId: string, buttonText: string }
) => {

  const disclosure = useDisclosure();

  return(
    <>
      <button 
        className='
          flex py-2 px-2 gap-1 tablet:px-5 rounded-full bg-zinc-100 items-center w-fit h-fit
          font-mono text-xs mobileL:text-sm tablet:text-base 
          transition-all duration-300
          hover:ring-2 hover:ring-zinc-600 hover:ring-offset-2 hover:bg-zinc-200
          active:scale-90
        ' 
        onClick={(disclosure.onOpen)}
      >
        {/* Google Fonts Icons */}
        <svg className="fill-zinc-600 w-[18px] h-[18px] mobileL:w-[24px] mobileL:h-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h120v80H240v400h480v-400H600v-80h120q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm200-240v-447l-64 64-56-57 160-160 160 160-56 57-64-64v447h-80Z"/>
        </svg>
        {buttonText}
      </button>
      <ShareModal disclosure={disclosure} initTabId={initTabId} tabs={tabs} />
    </>
  );
}