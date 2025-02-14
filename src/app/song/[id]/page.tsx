
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
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const songTitle: string = songMaster.find((data)=>data.songId === params.id)?.songTitle||'';
  return { title: `${songTitle} ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー` };
}
export default function Songs({ params }: { params: { id: string } }) {

  return (
    <SongPage songId={params.id} />
  );
}