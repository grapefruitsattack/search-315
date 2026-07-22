'use client'
import type { LivePerformer,SingingMaster } from '@/data/types';
import livePerformer from '@/data/livePerformer.json';
import singingMaster from '@/data/singingMaster.json';
import IdolBadge from '@/features/common/components/IdolBadge';

export default function Performer({ livePerId }: { livePerId: string }) {

    const livePerformerResults: LivePerformer[] 
        = livePerformer.filter(data=>data.livePerId === livePerId && (data.singingInfoId.substring(3, 5) !== '00'||data.singingInfoId===''))||[];

    const results: {singingInfoId: string; singingInfoName: string;}[]
        = livePerformerResults.map(data=>{
            return {singingInfoId:data.singingInfoId,singingInfoName:singingMaster.find(s=>s.singingInfoId===data.singingInfoId)?.singingInfoName||data.singingInfoName}
        });
    const resultsSlice: {singingInfoId: string; singingInfoName: string;}[][] =[
        results.slice(0,Math.floor(results.length/2))
            ,results.slice(Math.floor(results.length/2),results.length)
        ];
    

    return(
    <>
        <div 
            className="
                text-2xl font-mono flex items-center w-full mb-2
                after:h-[0.5px] after:grow after:bg-slate-900/50 after:ml-[1rem] 
            "
        >
            
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" fill="rgba(55,124,126,1)"></path></svg>
          {'出演'}
        </div>

        {livePerformerResults.length === 0
          ?<></>
          :<>
            <div className='flex flex-wrap relative text-sm font-mono gap-y-2 gap-x-1 tablet:gap-y-1 tablet:gap-x-2 mb-8'>


                {livePerformerResults.map(
                  (result, index) => {
                    if(result.singingInfoId === "") {
                      return (
                      <div 
                        key={result.singingInfoName}
                        className='
                        bg-sky-300 
                        justify-center font-bold rounded-sm py-0.5 px-2
                        text-xs mobileS:text-sm tablet:text-base
                        '
                      >
                        {result.singingInfoName}
                      </div>
                      )
                    }
                    return (<IdolBadge id={result.singingInfoId} useShortName={0} size={'normal'} key={index}/>);
                  })}

            </div>
          </>
        }
    </>
    )
}