'use client'
import liveMaster from '@/data/liveMaster.json';
import type { SongMaster,LiveMaster } from '@/data/types';
import LiveContent from "./components/LiveContent";
import { isUndefined } from 'swr/dist/_internal';
import { notFound } from 'next/navigation';

export default function LivePage({ livePerId }: { livePerId: string }) {

  const result : LiveMaster | undefined 
    = liveMaster.find(data => data.livePerId === livePerId) as LiveMaster;

  if(result===undefined) notFound();

  const liveId = result.liveId;

  const LiveData : LiveMaster[]
    = liveMaster.filter(data => data.liveId === liveId) as LiveMaster[];

  return (
      <>

      <title>{ `${result === undefined?'':result.displayLiveName+'\u00a0'+result.displayPerName
          +'\u00a0\u00a0|\u00a0\u00a0'}サーチサイコー`}</title>
      
          {result === undefined
          ?<div>結果なし</div>
          :<LiveContent selectedLivePerId={livePerId} LiveData={LiveData} />
          }
      </>
    );
}