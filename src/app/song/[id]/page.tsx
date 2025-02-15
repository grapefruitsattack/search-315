
import { Metadata } from 'next'
import songMaster from '../../../data/songMaster.json';
import dynamic from "next/dynamic";

const SongPage = dynamic(() => import("../../../features/app/song/SongPage"), { ssr: true });

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
    <SongPage songId={id} />
  );
}
export default Songs;