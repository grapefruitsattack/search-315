

import liveMaster from '@/data/liveMaster.json';
import type { LiveMaster } from '@/data/types';
import Link from 'next/link';

const liveType = [
  {typeId:'',typeName:'ライブ'},
  {typeId:'pm',typeName:'プロミ'},
  {typeId:'3dlive',typeName:'3Dライブ'},
  {typeId:'ex',typeName:'外部・合同'},
  {typeId:'anime',typeName:'アニメイベント'},
];

export default function LiveBlock(
  { livePerId,liveId }
  : { livePerId: string, liveId: string }
) {
  const liveInfo: LiveMaster
    = livePerId===''
      ?liveMaster.find(data=>liveId===data.liveId) as LiveMaster
      :liveMaster.find(data=>livePerId===data.livePerId) as LiveMaster;
  const liveTypeName: string = liveType.find(data=>data.typeId===liveInfo.type)?.typeName||'';
  const dateStr : string
    = livePerId===''
      ?liveMaster.filter(data=>liveId===data.liveId).map(data=>data.perDate).join(',')
      :liveInfo.perDate;
  const perDateArray: string[] 
    = dateStr.split(',').map(str=>{
      return new Date(
        Number(str.substring(0,4))
        ,Number(str.substring(4,6))-1
        ,Number(str.substring(6,8))).toLocaleDateString("ja-JP")
    });

return(<>
  <div key={livePerId===''?liveId:livePerId} className = "flex flex-col mt-auto">
    <Link 
      href={{ pathname: `/live/${liveInfo.livePerId}`}}
      className={`z-40
        text-xs ml-1 px-1 w-fit rounded-t-md text-black
        ${liveInfo.type===''
            ?'bg-cyan-300 '
          :liveInfo.type==='3dlive'
            ?'bg-green-300 '
          :liveInfo.type==='pm'
            ?'bg-pink-300'
          :liveInfo.type==='ex'
            ?'bg-purple-300'
          :'bg-stone-300'
        }
      `}
    >
      {liveTypeName}
    </Link>
      <Link
      className ={`
      group
      rounded-md
      bg-white
      hover:outline-[0.2rem]
      outline-none outline-offset-0
      ${liveInfo.type===''
          ?'outline-cyan-300 hover:outline-cyan-300'
        :liveInfo.type==='3dlive'
          ?'outline-green-300 hover:outline-green-300'
        :liveInfo.type==='pm'
          ?'outline-pink-300 hover:outline-pink-300'
        :liveInfo.type==='ex'
          ?'outline-purple-300 hover:outline-purple-300'
        :'outline-stone-300 hover:outline-stone-300'
      }
      w-full
      grid
      lg:text-base text-sm
      leading-tight
      font-sans
      rounded-md px-1 pt-1 py-1 p-0.5
      w-fit h-fit
      `}
      href={{ pathname: `/live/${liveInfo.livePerId}`}}
      >
        <div className='flex flex-wrap text-xs text-stone-500 ml-1'>
          {perDateArray.map((data,index)=><p key={index}>{`${data}${(index+1)!==perDateArray.length?'、':''}`}</p>)}
        </div>
        <div className={`
          flex flex-wrap place-content-center
          underline underline-offset-2 
          decoration-1 group-hover:decoration-[0.16rem]
          ${liveInfo.type===''
              ?'decoration-cyan-300'
            :liveInfo.type==='3dlive'
              ?'decoration-green-300'
            :liveInfo.type==='pm'
              ?'decoration-pink-300'
            :liveInfo.type==='ex'
              ?'decoration-purple-300'
            :'decoration-stone-300'
          }
          `}>
        <p className ='after:content-["\00A0"] text-center'>{liveInfo.displayLiveName+''}</p>
        <p className ={`${livePerId===''&&'hidden'} text-center`}>{liveInfo.displayPerName}</p>
        </div>
      </Link>
  </div>
</>)
}