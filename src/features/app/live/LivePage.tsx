'use client'
import liveMaster from '../../../data/liveMaster.json';
import CommonPage from "../../common/components/CommonPage";
import LiveContent from "./components/LiveContent";
import type { SongMaster,LiveMaster } from '../../../data/types';

export default function LivePage({ livePerId }: { livePerId: string }) {

    const result : LiveMaster | undefined 
      = liveMaster.find(data => data.livePerId === livePerId);
      
    return (
        <>

        <title>{ `${result === undefined?'':result.displayLiveName+'\u00a0'+result.displayPerName
            +'\u00a0\u00a0|\u00a0\u00a0'}サーチサイコー`}</title>
        
            {result === undefined
            ?<div>結果なし</div>
            :<LiveContent result={result} />
            }
        </>
      );
}