'use client'
import type { LivePerformer,SingingMaster } from '@/data/types';
import livePerformer from '@/data/livePerformer.json';
import singingMaster from '@/data/singingMaster.json';
import IdolBadge from '@/features/common/components/IdolBadge';
import { UserRound } from 'lucide-react';

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
      {livePerformerResults.length === 0
        ?<></>
        :<>
          <div 
            className="
              mobileL:text-2xl text-xl font-mono flex items-center w-full mb-2
              after:h-[0.5px] after:grow after:bg-indigo-800/50 after:ml-[1rem] 
              text-indigo-900 font-bold
            "
          >
            <UserRound className="mr-1 text-indigo-700" />
            {'出演'}
          </div>


          <div 
            className='flex flex-wrap relative text-sm font-mono gap-y-2 gap-x-1 tablet:gap-y-1 tablet:gap-x-2
            mobileM:mx-1 mobileS:mx-2 mx-1'
          >


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
                  return (<IdolBadge id={result.singingInfoId} useShortName={0} size={'normal'} key={index} linkType=''/>);
                })}

          </div>
        </>
      }
    </>
    )
}