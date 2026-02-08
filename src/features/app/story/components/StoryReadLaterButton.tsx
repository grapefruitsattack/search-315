'use client'
import { useState } from "react";
import { flushSync } from "react-dom";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {UpdateReadingData}  from "@/features/app/actions/UpdateReadingData";
import LoginModal from '@/features/common/components/login/LoginModal';


export default function StoryReadLaterButton(
  { storyId, login, isRead, isReadLeater }
  : { storyId: string, login: boolean, isRead: boolean, isReadLeater: boolean }
) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setDate] = useState<Date | undefined>(new Date());
  const timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateTimeFormat = new Intl.DateTimeFormat('ja-JP',{timeZone:timezone});
  const disclosure = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);


  return(
    <>
      <button 
        className='
          flex py-2 px-2 tablet:px-5 rounded-full bg-zinc-100 items-center w-fit h-fit
          font-mono text-xs mobileL:text-sm tablet:text-base text-blue-700
          transition-all duration-300
          hover:ring-2 hover:ring-blue-600 hover:ring-offset-2 hover:bg-zinc-200
          active:scale-90
        ' 
      >
        {/* Google Fonts Icons */}
        <svg className='fill-blue-700 mr-0 w-[18px] h-[18px] mobileL:w-[24px] mobileL:h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/></svg>        {'後で読む'}
      </button>
    </>
  );
}