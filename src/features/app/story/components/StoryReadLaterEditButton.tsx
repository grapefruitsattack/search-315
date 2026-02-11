'use client'
import { useState } from "react";
import { flushSync } from "react-dom";
import { useRouter } from 'next/navigation'
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {DeleteReadingData}  from "@/features/app/actions/DeleteReadingData";


export default function StoryReadLaterEditButton(
  { storyId, login, isRead, isReadLeater }
  : { storyId: string, login: boolean, isRead: boolean, isReadLeater: boolean }
) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  if(isRead===true) return(<></>);

  return(
  <>
    {loading
    ?          
    <div className="flex text-xs mobileL:text-sm tablet:text-base">
      <div
        className={`
          flex justify-center w-[14em] py-2 tablet:px-5 rounded-full bg-blue-800 items-center
          font-mono  text-white fill-white 
          bg-zinc-200 text-zinc-500 fill-zinc-400
        `} >
          <Spinner />削除中
      </div>
    </div>
    :
    <form
      className=''
      action={async () => {
        if(login){
          try {
            flushSync(() => setLoading(true));
            await DeleteReadingData(storyId,1);
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                  setLoading(false);
                  resolve();
                }, 1000);
            });
            toast.success(
              'このストーリーを「後で読む」リストから削除しました'
              ,{position:'bottom-right'})
          } catch (e:any) {
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                  setLoading(false);
                  resolve();
                }, 500);
            });
            if(e.message==='No user session found'){
              router.refresh()
            }else{
              toast.error(
                "削除できませんでした"
                ,{description:'何度も失敗する場合、リロード後再度お試しください',duration:8000,position:'bottom-right'});
            };
          }
        };
      }}
    >
      <div className="flex text-xs mobileL:text-sm tablet:text-base">
        <button 
          className='
            flex w-[14em] h-fit py-2 rounded-full bg-gray-500 items-center w-fit h-fit
            font-mono text-white
            transition-all duration-300
            hover:ring-2 hover:ring-gray-500 hover:ring-offset-2 
            active:scale-90
          ' 
          disabled={loading}
          type={login?'submit':'button'}
        >
          <div className={`flex mx-auto `}>
            {/* Google Fonts Icons */}
            <svg className='fill-white mr-0 w-[18px] h-[18px] mobileL:w-[24px] mobileL:h-[24px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M840-680H600v-80h240v80ZM200-120v-640q0-33 23.5-56.5T280-840h240v80H280v518l200-86 200 86v-278h80v400L480-240 200-120Zm80-640h240-240Z"/>
            </svg>
              <span className={`flex my-auto`}>{'「後で読む」から削除'}</span>
          </div>
        </button>
      </div>
    </form> 
    }
  </>
  );
}