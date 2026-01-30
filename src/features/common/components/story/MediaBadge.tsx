'use client'
import {MEDIA} from '@/features/common/const/StoryInfoConst';
import { GetStoryMediaName } from '@/features/common/utils/Story/GetStoryInfomation';

export default function MediaBadge({ id, size }: { id: number, size: string }) {

  if(id===MEDIA.proe.id) return(<></>);

  const mediaName: string = GetStoryMediaName(id);
  let bgColor: string = 'bg-teal-400';
  let borderColor: string = 'border-teal-500';
    
  switch (id) { 
      case MEDIA.moba.id:
          bgColor = 'bg-blue-500';
          borderColor = 'border-blue-700';
          break;
      case MEDIA.proe.id:
          bgColor = 'bg-teal-400';
          borderColor = 'border-teal-500';
          break;
      case MEDIA.gs.id:
          bgColor = 'bg-sky-400';
          borderColor = 'border-sky-500';
          break;
      default:
          break;
  }
  return(
  <div 
      className={`
          flex w-fit 
          rounded-lg 
          font-mono font-bold 
          text-white
          border-2
          ${bgColor} ${borderColor} 
          ${size==='block'
              ?` rounded-md text-xs mobileS:text-sm px-1 py-0.5 gap-1`
              :` rounded-lg p-1 text-sm tablet:text-xl gap-1 tablet:gap-2 `}
      `}
  >
      <p className={``}>{mediaName}</p>
  </div>
  );
  }
