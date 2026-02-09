'use client'
import { useState } from "react";
import { flushSync } from "react-dom";
import { Calendar } from "@/components/ui/calendar";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useDisclosure, 
 } from "@chakra-ui/react";
import {UpdateReadingData}  from "@/features/app/actions/UpdateReadingData";
import LoginModal from '@/features/common/components/login/LoginModal';

export default function StoryReadButton(
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

  function popoverOpenFunction(){
    const element = document.getElementById('mainbutton');
    if(!popoverOpen && element!==null && (element.getBoundingClientRect().bottom+80)>window.innerHeight){
      const targetDOMRect = element.getBoundingClientRect();
      const targetTop = targetDOMRect.top + window.pageYOffset;
      window.scrollTo({
        top: targetTop-70,
        behavior: 'smooth'
      });
    }
    setCalendarOpen(false);
    setPopoverOpen(!popoverOpen);
  }

  return(
    <>
    <LoginModal disclosure={disclosure} description="ログインすると「既読」に登録できます！" />
    <Popover 
      open={login?popoverOpen:false} 
      onOpenChange={()=>{
        if(login) popoverOpenFunction()
      }} >
    <PopoverTrigger asChild>
      <button  id="mainbutton"
        className='
          flex py-2 px-2 tablet:px-5 rounded-full bg-zinc-100 items-center w-fit h-fit
          font-mono text-xs mobileL:text-sm tablet:text-base text-blue-700 fill-blue-700
          transition-all duration-300
          hover:ring-2 hover:ring-blue-600 hover:ring-offset-2 hover:bg-zinc-200
          active:scale-90
          disabled:bg-zinc-200 disabled:text-zinc-500 disabled:fill-zinc-400
          disabled:hover:ring-0 disabled:hover:ring-offset-0 disabled:active:scale-100
        ' 
        onClick={()=>{ if(!login) disclosure.onOpen() }}
        disabled={loading}
      >
        {/* Google Fonts Icons */}
        <svg className='mr-0 w-[18px] h-[18px] mobileL:w-[24px] mobileL:h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
        </svg>
        {'既読に追加'}
      </button>
    </PopoverTrigger>
    <PopoverContent  className="w-auto overflow-hidden p-2 border border-2 border-zinc-300 bg-zinc-100" align="start" side="bottom"  avoidCollisions={false}>
      <div className="text-sm tablet:text-base font-bold">{'読了日'}</div>
      <div className="flex gap-2 text-xs mobileS:text-sm tablet:text-base">
        <button className='flex justify-between 
          w-30 tablet:w-40 p-2 rounded border shadow-md
          text-gray-900 fill-sky-300 bg-white hover:bg-sky-100 
          transition-all duration-500 ease-out'
          onClick={()=>setCalendarOpen(!calendarOpen)}
          >
          <span className='px-0 mobileS:px-2 font-sans  '>{dateTimeFormat.format(selectedDate)}</span>
          <span className='px-0 mobileS:px-2 font-sans'>
          <svg className='w-[14px] h-[14px] mobileS:w-[20px] mobileS:h-[20px] tablet:w-[22px] tablet:h-[22px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20">
            <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path>
          </svg>
          </span>
        </button>
        {loading
          ?
          <div className="flex text-xs mobileL:text-sm tablet:text-base">
            <div
              className='
                flex justify-center w-[10em] py-2 tablet:px-5 rounded-full bg-blue-800 items-center
                font-mono  text-white fill-white 
                bg-zinc-200 text-zinc-500 fill-zinc-400
              ' >
                <Spinner />追加中
            </div>
          </div>
          :
          <form
            className=''
            action={async () => {
              try {
                flushSync(() => setLoading(true));
                await UpdateReadingData(storyId,dateTimeFormat.format(selectedDate),0);
                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                      setLoading(false);
                      resolve();
                    }, 1000);
                });
                setPopoverOpen(false);
                toast.success(
                  '既読に追加しました'
                  ,{position:'bottom-right'})
              } catch (e) {
                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                      setLoading(false);
                      resolve();
                    }, 500);
                });
                toast.error(
                  "追加できませんでした"
                  ,{description:'何度も失敗する場合、リロード後再度お試しください',duration:8000,position:'bottom-right'});
                window.location.reload();
              }
            }}
          >
            <div className="flex text-xs mobileL:text-sm tablet:text-base">
            <button 
              className='
                flex w-[10em] h-fit py-2 tablet:px-5 rounded-full bg-blue-800 items-center
                font-mono text-white fill-white 
                transition-all duration-300
                hover:ring-2 hover:ring-blue-600 hover:ring-offset-2 
                active:scale-90 
                disabled:bg-zinc-200 disabled:text-zinc-500 disabled:fill-zinc-400
                disabled:hover:ring-0 disabled:hover:ring-offset-0 disabled:active:scale-100
              ' 
              disabled={loading}
            >
              <div className={`flex mx-auto `}>
                {/* Google Fonts Icons */}
                <svg className='mr-0 w-[18px] h-[18px] mobileL:w-[24px] mobileL:h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                </svg>
                <span className={`flex my-auto `}>{'既読に追加'}</span>
              </div>
            </button>
            </div>
          </form>
        }
      </div>
      <Calendar
        className={`rounded-lg border shadow-sm mt-2 ${calendarOpen?'':'hidden'}`}
        timeZone={timezone}
        mode="single"
        defaultMonth={selectedDate}
        selected={selectedDate}
        onSelect={(date) => {
          setDate(date)
        }}
        captionLayout={'dropdown'}
        startMonth={new Date(2013, 12)}
        disabled={(date) =>
          date > new Date() || date < new Date("1900-01-01")
        }
      />
      <div className={`pt-2 mx-auto w-[220px] mobileL:w-[280px] tablet:w-[300px] text-xs mobileL:text-sm break-all ${isReadLeater===false?' hidden':''}`}>
        {'既読に追加すると、「後で読む」リストからは削除されます'}
      </div>
    </PopoverContent>
    </Popover>
    </>
  );
}