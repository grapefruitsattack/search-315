
import { Metadata } from 'next'
import albumMaster from '../../../data/albumMaster.json';
import dynamic from "next/dynamic";

const AlbumPage = dynamic(() => import("../../../features/app/album/AlbumPage"), { ssr: true });

export function generateStaticParams() {
  // return [
  //   { id: "SL01_1" },
  //   { id: "SL01_3" },
  //   { id: "SL01_5" },
  //   { id: "SL02_1" },
  // ];
  return albumMaster.map((e)=>{
    return {id: e.albumId}
  });
}

const Albums = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <AlbumPage albumId={id} />
  );
}
export default Albums;