
import { Metadata } from 'next'
import liveMaster from '../../../data/liveMaster.json';
import { LiveMaster } from '../../../data/types';
import dynamic from "next/dynamic";

const LivePage = dynamic(() => import("../../../features/app/live/LivePage"), { ssr: true });

export function generateStaticParams() {
  // return [
  //   { id: "SL01_1" },
  //   { id: "SL01_3" },
  //   { id: "SL01_5" },
  //   { id: "SL02_1" },
  // ];
  return liveMaster.map((e)=>{
    return {id: e.livePerId}
  });
}
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const liveInfo: LiveMaster | undefined = liveMaster.find((data)=>data.livePerId === params.id);
  return { title: 
    `${liveInfo === undefined?'':liveInfo.displayLiveName+'\u00a0'+liveInfo.displayPerName
    +'\u00a0\u00a0|\u00a0\u00a0'}サーチサイコー` };
}
export default function Songs({ params }: { params: { id: string } }) {

  return (
    <LivePage livePerId={params.id} />
  );
}