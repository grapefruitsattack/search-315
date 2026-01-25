import {
  useDisclosure, 
 } from "@chakra-ui/react";
import type { ShareModalTabInfo } from '@/data/types';  
import {ShareModalTest} from "./ShareModalTest";

export const ShareModalButton = (
  { tabs, initTabId, buttonText }: { tabs: ShareModalTabInfo[], initTabId: string, buttonText: string }
) => {
    const disclosure = useDisclosure();
    return(
      <>
        <button className={`bg-sky-200`} onClick={(disclosure.onOpen)}>
          {'共有'}
        </button>
        <ShareModalTest disclosure={disclosure} initTabId={initTabId} tabs={tabs} />
      </>
    )
}