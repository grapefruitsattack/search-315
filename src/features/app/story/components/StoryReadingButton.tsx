'use client';
import SetLocalDateCookie  from "../../../common/utils/SetLocalDateCookie";
import {UpdateReadingData}  from "../../actions/UpdateReadingData";
import {DeleteReadingData}  from "../../actions/DeleteReadingData";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
 
export default function StoryReadingButton(
  { storyId, isRead, isReadLeater }: { storyId: string, isRead: boolean, isReadLeater: boolean }) {
 

    const dt = new Date();
    const serverDate = [
      dt.getFullYear().toString(),
      ('0' + (dt.getMonth() + 1)).slice(-2),
      ('0' + dt.getDate()).slice(-2),
    ].join('-');

    if(isRead){
    return(<>
          {/* クライアントの現在時刻をCookieにセット */}
          <SetLocalDateCookie />
          <Toaster />
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
                mobileM:my-0.5 my-1 
              '>
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

    return(<>
          {/* クライアントの現在時刻をCookieにセット */}
          <SetLocalDateCookie />
          <Toaster />
              <div className="grid tablet:grid-cols-[4fr_2fr] lg:grid-cols-1 grid-cols-1 w-full h-full gap-3">
                <form
                  className=' w-full h-full'
                  action={async () => {
                      const localDate = serverDate;
                      await UpdateReadingData(storyId,localDate,0)}}
                  >
                    <button
                        className='w-full h-full py-2
                        rounded-xl
                        border-2 border-gray-400 
                        hover:border-cyan-500
                        bg-gray-300 text-gray-900 
                        hover:bg-cyan-500 hover:text-white font-sans font-black leading-tight
                        transition-all duration-500 ease-out
                        fill-gray-900 hover:fill-white
                        text-sm mobileL:text-lg lg:text-xl
                        '
                        type="submit"
                    >
                      <div className='
                        flex justify-center items-center font-sans font-black 
                        mobileM:my-0.5 my-1 
                      '>
                      <div>「既読」に追加</div>
                      </div>
                    </button>
                </form>
                {isReadLeater
                ?
                  <form
                    className=' w-full h-full'
                    action={async () => {
                      console.log('test')
                        await DeleteReadingData(storyId,1).then(() => {
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
                        <div>
                        <svg 
                        className="flex icon icon-tabler icon-tabler-copy group-hover:hidden mr-0.5 w-[20px] h-[20px] lg:w-[22px] lg:h-[22px]" 
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 24 24"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>
                        </svg></div>
                        <div className='group-hover:hidden'>「後で読む」に追加済み</div>
                        <div className='hidden group-hover:flex'>「後で読む」を編集</div>
                        </div>
                      </button>
                  </form>
                :
                  <form
                    className=' w-full h-full'
                    action={async () => {
                        const localDate = serverDate;
                        await UpdateReadingData(storyId,localDate,1)}
                      }
                    >
                      <button
                          className='w-full h-full py-0.5
                          rounded-xl
                          border-2 border-gray-300
                          hover:border-2 hover:border-amber-500
                          bg-gray-200 text-gray-900 
                          hover:bg-amber-500 hover:text-white
                          transition-all duration-500 ease-out
                          fill-gray-600 hover:fill-white
                          text-sm mobileL:text-lg lg:text-xl
                          font-sans font-black leading-tight
                          '
                          type="submit"
                      >
                        <div className='
                          flex justify-center items-center font-sans font-black 
                          mobileM:my-0.5 my-1 
                        '>
                        <div>「後で読む」に追加</div>
                        </div>
                      </button>
                  </form>
                }
              </div>
            </>)

    }
}
