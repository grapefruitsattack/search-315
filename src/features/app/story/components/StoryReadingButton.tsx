'use client';
import { useState, useEffect } from "react";
import GetLocalDate  from "@/features/common/utils/GetLocalDate";
import {UpdateReadingData}  from "../../actions/UpdateReadingData";
import {DeleteReadingData}  from "../../actions/DeleteReadingData";
import { DayPicker } from "react-day-picker";
import { Toaster } from "@/components/ui/sonner"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "sonner"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure, 
  Tooltip
 } from "@chakra-ui/react";
import { format } from "date-fns";
 
export default function StoryReadingButton(
  { storyId, login, isRead, isReadLeater }
  : { storyId: string, login: boolean, isRead: boolean, isReadLeater: boolean }
): JSX.Element {
  const newDate: Date = new Date();
  //既読編集モーダル用
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedDate, setDate] = useState<Date | undefined>(undefined);
  
  const [loading, setLoading] = useState<boolean>(false);

  const timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateTimeFormat = new Intl.DateTimeFormat('ja-JP',{timeZone:timezone});

  if(isRead){
  // 既読済みの場合
    return(<>
      <Toaster position="top-center"/>
        <div className="grid grid-cols-[2fr_5fr] w-full h-full">
        <button
            className='rounded-l-lg border-2 border-cyan-500 w-full h-full
            font-sans font-black leading-tight
            bg-cyan-500 text-white
            transition-all duration-500 ease-out
            fill-white
            text-sm mobileL:text-base lg:text-lg
            '
        >
          <div className='
            flex flex-wrap justify-center items-center font-sans font-black 
            mobileM:my-0.5 my-1'>
            <div>
            <svg 
            className="flex icon icon-tabler icon-tabler-copy group-hover:hidden mr-0.5 w-[20px] h-[20px] lg:w-[22px] lg:h-[22px]" 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 24 24"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>
            </svg></div>
            既読
          </div>
        </button>
        <button
          className='
          w-full h-full py-2
          rounded-r-lg
          border-2 border-cyan-500
          hover:border-cyan-500
          bg-white text-cyan-600
          hover:bg-cyan-500 hover:text-white font-sans font-black leading-tight
          transition-all duration-500 ease-out
          fill-cyan-600 hover:fill-white
          text-sm mobileL:text-lg lg:text-xl
          '
        >
          <div className='
            flex flex-wrap justify-center items-center font-sans font-black 
            mobileM:my-0.5 my-1 
          '>
            既読情報を編集する
          </div>
        </button>
        </div>
    </>)

  }else{
  // 未読の場合
  return(<>
    <Toaster position="top-center"/>
    <div className="grid tablet:grid-cols-1 grid-cols-1 w-full h-full gap-3">

    <div className="flex bg-sky-50 p-2 rounded-md border-2 border-cyan-500 gap-2 mobileS:gap-4 tablet:gap-6">
      <div className="">
        <label>{'読了日'}</label>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
        <button className='flex justify-between w-30 tablet:w-40 p-2 rounded border shadow-md
          text-gray-900 fill-sky-300 bg-white hover:bg-sky-100 
          transition-all duration-500 ease-out'
          >
          <span className='px-0 mobileS:px-2 font-sans text-xs mobileS:text-sm tablet:text-base '>{selectedDate===undefined?'読了日':dateTimeFormat.format(selectedDate)}</span>
          <span className='px-0 mobileS:px-2 font-sans '>
          <svg className='w-[14px] h-[14px] mobileS:w-[20px] mobileS:h-[20px] tablet:w-[22px] tablet:h-[22px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20"><path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path>
          </svg>
          </span>
        </button>
      </PopoverTrigger>
        <PopoverContent  className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  timeZone={timezone}
                  mode="single"
                  defaultMonth={selectedDate===undefined?newDate:selectedDate}
                  selected={selectedDate}
                  onSelect={(date) => {
                    setDate(date)
                    setPopoverOpen(false)
                  }}
                  captionLayout={'dropdown'}
                  startMonth={new Date(2000, 1)}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  className="rounded-lg border shadow-sm"
                />
          </PopoverContent>
      </Popover>
      </div>
      <div
        className='self-end w-full h-fit'>
        <form
          className=' w-full h-full'
          action={async () => {
              await UpdateReadingData(storyId,selectedDate===undefined?'':dateTimeFormat.format(selectedDate),0)
              .then(() => {
                setLoading(true);
                return new Promise<void>((resolve) => {
                  window.setTimeout(() => {
                    setLoading(false);
                    resolve();
                  }, 1500);
                });
              })
              .then(() => {
                toast("ok")
              }).catch((e) => {
                console.log('エラー')
                toast("エラー")
              })
            }}
          >
          <button
              className='w-full h-full py-2
              rounded-xl hover:shadow-lg hover:shadow-cyan-200
              hover:border-cyan-500
              bg-cyan-500 text-white
              hover:bg-cyan-500 hover:text-white font-sans font-black leading-tight
              transition-all duration-500 ease-out
              fill-white hover:fill-white
              text-sm mobileS:text-base mobileL:text-lg tablet:text-xl
              '
              onClick={() => {
                  //onOpen();
              }}
          >
            <div className='
              flex justify-center items-center font-sans font-black 
              mobileM:my-0.5 my-1 
            '>
            <div>
            <svg className='w-[20px] h-[20px] mobileS:w-[22px] mobileS:h-[22px] tablet:w-[24px] tablet:h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            </div>
            <div>「既読」に追加</div>
            </div>
          </button>
        </form>
      </div>
    </div>
      {isReadLeater
      ?
        <form
          className=' w-full h-full'
          action={async () => {
              await DeleteReadingData(storyId,1)
              .then(() => {
                setLoading(true);
                window.setTimeout(function(){setLoading(false);}, 500);
              })
              .then(() => {
                console.log('OK')
                toast("ok")
              }).catch((e) => {
                console.log('エラー')
                console.log(e)
                toast("エラー")
              }).finally(() => {
                console.log('finish')
              })
              }
            }
          >
            <button
                className='w-full h-full py-0.5
                rounded-xl
                border-2 border-amber-300
                hover:border-2 hover:border-amber-500
                bg-amber-200 text-amber-900 
                hover:bg-amber-500 hover:text-white
                transition-all duration-500 ease-out
                fill-amber-900 hover:fill-white
                text-sm mobileL:text-lg lg:text-xl
                font-sans font-black leading-tight
                group
                '
                type="submit"
            >
              <div className='
                flex justify-center items-center font-sans font-black 
                mobileM:my-0.5 my-1 
              '>
              {loading
                ?<div className=''>loading</div>
                :<div className=''>「後で読む」から削除</div>
              }
              </div>
            </button>
        </form>
      :
        <form
          className=' w-full h-full'
          action={async () => {
              await UpdateReadingData(storyId,'',1)
              .then(() => {
                setLoading(true);
                return new Promise<void>((resolve) => {
                  window.setTimeout(() => {
                    setLoading(false);
                    resolve();
                  }, 1500);
                });
              })
              .then(() => {
                toast("ok")
              }).catch((e) => {
                console.log('エラー')
                toast("エラー")
              })
            }}
          >
            <button
                className='w-full h-full py-0.5
                rounded-xl drop-shadow-md 
                border-2 border-amber-500
                hover:border-2 hover:border-amber-500
                bg-white text-amber-500 
                hover:bg-amber-500 hover:text-white
                transition-all duration-500 ease-out
                fill-amber-500 hover:fill-white
                text-sm mobileL:text-lg lg:text-xl
                font-sans font-black leading-tight
                '
                type="submit"
            >
              <div className='
                flex justify-center items-center font-sans font-black 
                mobileM:my-0.5 my-1 
              '>
              {loading
                ?<div className=''>loading</div>
                :<>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" >
                  <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </div>
                <div>「後で読む」に追加</div>
                </>
              }
              </div>
            </button>
        </form>
      }
    </div>
  </>)

  }
}
function isReadEditModal(
  { storyId, isRead, isReadLeater }: { storyId: string, isRead: boolean, isReadLeater: boolean }
): JSX.Element {
  return(<></>)
}