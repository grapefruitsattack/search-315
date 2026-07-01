
import { Metadata } from 'next'
import songMaster from '@/data/songMaster.json';
import CommonPage from "@/features/common/components/CommonPage";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LyricShareResultPage = dynamic(() => import("@/features/app/song/LyricShareResultPage"), { ssr: true });

export function generateStaticParams() {
  // return [
  //   { id: "SL01_1" },
  //   { id: "SL01_3" },
  //   { id: "SL01_5" },
  //   { id: "SL02_1" },
  // ];
  return songMaster.map((e)=>{
    return {id: e.songId}
  });
}

const Songs = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <Suspense>
    <CommonPage>
    <LyricShareResultPage songId={id} />
    </CommonPage>
    </Suspense>
  );
}
export default Songs;