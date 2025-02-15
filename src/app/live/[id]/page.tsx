
import { Metadata } from 'next'
import liveMaster from '../../../data/liveMaster.json';
import { LiveMaster } from '../../../data/types';
import dynamic from "next/dynamic";
import { Suspense } from "react";

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

const Lives = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <Suspense>
    <LivePage livePerId={id} />
    </Suspense>
  );
}
export default Lives;