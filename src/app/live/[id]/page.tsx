
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { notFound } from 'next/navigation';
import type { LiveMaster } from '@/data/types';
import liveMaster from '@/data/liveMaster.json';
import CommonPage from "@/features/common/components/common/CommonPage";
import LiveContent from "@/features/app/live/components/LiveContent";
import StoryWithLive from "@/features/app/live/components/StoryWithLive";

export function generateStaticParams() {
  // return [
  //   { id: "SL01_1" },
  //   { id: "SL01_3" },
  //   { id: "SL01_5" },
  //   { id: "SL02_1" },
  // ];
  //const liveIdArray: string[] = Array.from(new Set(liveMaster.map(data=>data.liveId)));
  return liveMaster.map((e)=>{
    return {id: e.livePerId}
  });
}

const Lives = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const result : LiveMaster | undefined 
    = liveMaster.find(data => data.livePerId === id) as LiveMaster;

  if(result===undefined) notFound();

  const liveId = result.liveId;

  const LiveData : LiveMaster[]
    = liveMaster.filter(data => data.liveId === liveId) as LiveMaster[];
    
  return (
    <Suspense>
    <CommonPage>
      <title>{ `${result === undefined?'':result.displayLiveName+'\u00a0'+result.displayPerName
          +'\u00a0\u00a0|\u00a0\u00a0'}サーチサイコー`}</title>
      <article className=" pb-96 px-2 mobileS:px-12 lg:px-24 bg-white lg:max-w-[1500px] lg:m-auto font-mono">
        <LiveContent selectedLivePerId={id} LiveData={LiveData} />
        <Suspense fallback={<></>}>
          <StoryWithLive livePerId={id} liveId={liveId}/>
        </Suspense>
      </article>
    </CommonPage>
    </Suspense>
  );
}
export default Lives;