'use client'
import { useState } from "react";
import { flushSync } from "react-dom";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import {UpdateReadingData}  from "@/features/app/actions/UpdateReadingData";
import {DeleteReadingData}  from "@/features/app/actions/DeleteReadingData";

export default function StoryReadButton(
  { storyId, readingDate, }
  : { storyId: string, readingDate: string, }
) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedDate, setDate] = useState<Date | undefined>(new Date(readingDate));
  const timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateTimeFormat = new Intl.DateTimeFormat('ja-JP',{timeZone:timezone});
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [loading, setLoading] = useState<string>('');

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
    <Popover 
      open={popoverOpen} 
      onOpenChange={()=>popoverOpenFunction()}>
      <PopoverTrigger asChild>
        <button  id="mainbutton"
          className='
            flex py-2 px-2 tablet:px-5 rounded-full bg-gray-600 items-center w-fit h-fit
            font-mono text-xs mobileL:text-sm tablet:text-base text-white fill-white
            transition-all duration-300
            hover:ring-2 hover:ring-gray-600 hover:ring-offset-2
            active:scale-90
            disabled:bg-zinc-200 disabled:text-zinc-500 disabled:fill-zinc-400
            disabled:hover:ring-0 disabled:hover:ring-offset-0 disabled:active:scale-100
          ' 
          disabled={loading!==''}
        >
          {/* Google Fonts Icons */}
          <svg className=' mr-1 w-[18px] h-[18px] mobileL:w-[24px] mobileL:h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
          </svg>
          {'既読情報を編集'}
        </button>
      </PopoverTrigger>
      <PopoverContent  className="flex flex-col w-auto overflow-hidden p-2 gap-2 border border-2 border-zinc-300 bg-zinc-200" align="start" side="bottom"  avoidCollisions={false}>
        <div className="border p-2 border-zinc-100 rounded-sm bg-white">
          <div className="text-base font-bold">{'変更'}</div>
            <div className="flex gap-2">
              <button className='flex justify-between w-30 tablet:w-40 p-2 rounded border shadow-md
                text-gray-900 fill-sky-300 bg-white hover:bg-sky-100 
                transition-all duration-500 ease-out'
                onClick={()=>setCalendarOpen(!calendarOpen)}
                >
                <span className='px-0 mobileS:px-2 font-sans text-xs mobileS:text-sm tablet:text-base '>{dateTimeFormat.format(selectedDate)}</span>
                <span className='px-0 mobileS:px-2 font-sans'>
                <svg className='w-[14px] h-[14px] mobileS:w-[20px] mobileS:h-[20px] tablet:w-[22px] tablet:h-[22px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20">
                  <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path>
                </svg>
                </span>
              </button>
              {loading==='editing'
                ?
                <div className="flex text-xs mobileL:text-sm tablet:text-base">
                  <div
                    className='
                      flex justify-center w-[10em] py-2 tablet:px-5 rounded-full bg-blue-800 items-center
                      font-mono  text-white fill-white 
                      bg-zinc-200 text-zinc-500 fill-zinc-400
                    ' >
                      <Spinner />変更中
                  </div>
                </div>
                :
                <form
                  className=''
                  action={async () => {
                    try {
                      flushSync(() => setLoading('editing'));
                      await UpdateReadingData(storyId,dateTimeFormat.format(selectedDate),0);
                      await new Promise<void>((resolve) => {
                          setTimeout(() => {
                            setLoading('');
                            resolve();
                          }, 1000);
                      });
                      setPopoverOpen(false);
                      toast.success(
                        '読了日を'+dateTimeFormat.format(selectedDate)+'に変更しました'
                        ,{position:'bottom-right'})
                    } catch (e) {
                      await new Promise<void>((resolve) => {
                          setTimeout(() => {
                            setLoading('');
                            resolve();
                          }, 500);
                      });
                      toast.error(
                        "編集できませんでした"
                        ,{description:'何度も失敗する場合、リロード後再度お試しください',duration:8000,position:'bottom-right'})
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
                    disabled={(selectedDate?.toDateString()===new Date(readingDate).toDateString())||loading!==''}
                  >
                    <div className={`flex mx-auto `}>
                      {/* Google Fonts Icons */}
                      <svg className='mr-0 w-[18px] h-[18px] mobileL:w-[24px] mobileL:h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
                      </svg>
                      <span className={`flex my-auto `}>{'読了日変更'}</span>
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
                setDate(date);
              }}
              captionLayout={'dropdown'}
              startMonth={new Date(2013, 12)}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
            />
        </div>
        <div className="border p-2 border-zinc-100 rounded-sm bg-white">
          <div className="text-base font-bold pb-1">{'削除'}</div>
            {loading==='deleting'
              ?
              <div className="flex text-xs mobileL:text-sm tablet:text-base">
                <div
                  className='
                    flex justify-center w-full py-2 tablet:px-5 rounded-full bg-blue-800 items-center
                    font-mono  text-white fill-white 
                    bg-zinc-200 text-zinc-500 fill-zinc-400
                  ' >
                    <Spinner />削除中
                </div>
              </div>
              :
              <form
                className=''
                action={async () => {
                  try {
                    flushSync(() => setLoading('deleting'));
                    await DeleteReadingData(storyId,0);
                    await new Promise<void>((resolve) => {
                        setTimeout(() => {
                          setLoading('');
                          resolve();
                        }, 1000);
                    });
                    setPopoverOpen(false);
                    toast.success(
                      'このストーリーを既読から削除しました'
                      ,{position:'bottom-right'});
                  } catch (e) {
                    await new Promise<void>((resolve) => {
                        setTimeout(() => {
                          setLoading('');
                          resolve();
                        }, 500);
                    });
                    toast.error(
                      "削除できませんでした"
                      ,{description:'何度も失敗する場合、リロード後再度お試しください',duration:8000,position:'bottom-right'});
                  }
                }}
              >
                <div className="flex text-xs mobileL:text-sm tablet:text-base">
                  <button 
                    className='
                      flex w-full h-fit py-2 tablet:px-5 rounded-full bg-red-700 items-center
                      font-mono text-white fill-white 
                      transition-all duration-300
                      hover:ring-2 hover:ring-red-600 hover:ring-offset-2 
                      active:scale-90 
                      disabled:bg-zinc-200 disabled:text-zinc-500 disabled:fill-zinc-400
                      disabled:hover:ring-0 disabled:hover:ring-offset-0 disabled:active:scale-100
                    ' 
                    disabled={loading!==''}
                  >
                    <div className={`flex mx-auto `}>
                      {/* Google Fonts Icons */}
                      <svg className='mr-0 w-[18px] h-[18px] mobileL:w-[24px] mobileL:h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                      </svg>
                      <span className={`flex my-auto `}>{'既読から削除'}</span>
                    </div>
                  </button>
                </div>
              </form>
            }
        </div>
      </PopoverContent>
    </Popover>
    </>
  );
}