'use client';
import { useState, useEffect } from "react";
import SetLocalDateCookie  from "../../../common/utils/SetLocalDateCookie";
import {UpdateReadingData}  from "../../actions/UpdateReadingData";
import {DeleteReadingData}  from "../../actions/DeleteReadingData";
import { DayPicker } from "react-day-picker";
import { Toaster } from "@/components/ui/sonner"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "sonner"
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
  { storyId, isRead, isReadLeater }: { storyId: string, isRead: boolean, isReadLeater: boolean }
): JSX.Element {
  
    //既読編集モーダル用
    const { isOpen, onClose, onOpen } = useDisclosure();

    const [date, setDate] = useState<Date>();
    
    const [loading, setLoading] = useState<boolean>(false);

    if(isRead){
    // 既読済みの場合
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
    // 未読の場合
    return(<>
          {/* クライアントの現在時刻をCookieにセット */}
          <SetLocalDateCookie />
          <Toaster />
              <div className="grid tablet:grid-cols-[4fr_2fr] lg:grid-cols-1 grid-cols-1 w-full h-full gap-3">
                <div
                  className=' w-full h-full'
                  // action={async () => {
                  //     await UpdateReadingData(storyId,0)}}
                  >
                    <button
                        className='w-full h-full py-2
                        rounded-xl drop-shadow-md
                        border-2 border-cyan-500 
                        hover:border-cyan-500
                        bg-white text-cyan-500 
                        hover:bg-cyan-500 hover:text-white font-sans font-black leading-tight
                        transition-all duration-500 ease-out
                        fill-cyan-500 hover:fill-white
                        text-sm mobileL:text-lg lg:text-xl
                        '
                        onClick={() => {
                            onOpen();
                        }}
                    >
                      <div className='
                        flex justify-center items-center font-sans font-black 
                        mobileM:my-0.5 my-1 
                      '>
                      <div>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" >
                        <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                      </div>
                      <div>「既読」に追加する</div>
                      </div>
                    </button>
                    <div className={`flex items-center h-max `}>
                        {/* モーダル部 */}
                        <Modal 
                        isOpen={isOpen} onClose={onClose}
                        >
                        <ModalOverlay />
                        <ModalContent minW="50vw" w="calc(100vw - 20px - 2rem)">
                        <ModalHeader>
                        <div className="flex justify-between items center border-b border-gray-200 py-2">
                          <div className="flex items-center justify-center">
                            <p className="text-xl font-bold text-gray-800">「既読」に追加</p>
                          </div>
                          <button
                            className="bg-gray-300 hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full"
                            onClick={onClose}
                          >
                            <svg 
                              className="icon icon-tabler icon-tabler-x"
                              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                              <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path></svg>
                          </button>
                        </div>
                        </ModalHeader>
                        <ModalBody>
                        <div className="h-auto mx-4 p-4 rounded-xl">
                        
                            <Calendar
                              mode="single"
                              defaultMonth={date}
                              selected={date}
                              onSelect={setDate}
                              captionLayout={'dropdown'}
                              startMonth={new Date(2000, 1)}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              className="rounded-lg border shadow-sm"
                            />
                        </div>
                        </ModalBody>
                        </ModalContent >
                        </Modal>
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
                          console.log('OK')
                          toast("ok")
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