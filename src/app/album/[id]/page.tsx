
import { Metadata } from 'next'
import type { Albums } from '@/data/types';
import albumMaster from '@/data/albumMaster.json';
import CommonPage from "@/features/common/components/common/CommonPage";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AlbumContent from "@/features/app/album/components/AlbumContent";
import StoryWithAlbum from "@/features/app/album/components/StoryWithAlbum";

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
  const album : Albums
    = albumMaster.find(data => data.albumId === id) as Albums;
  return (
    <Suspense>
    <CommonPage>
    <title>{ `${album.albumTitleFull} ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
      <article className=" pb-96 px-0 mobileM:px-1 mobileL:px-2 tablet:px-4 tablet:px-8 bg-white lg:max-w-[1000px] lg:m-auto font-mono">
        <AlbumContent album={album} />
        <div className='mt-8'>
          <Suspense fallback={<></>}>
            <StoryWithAlbum albumId={album.albumId}/>
          </Suspense>
        </div>
      </article>
    </CommonPage>
    </Suspense>
  );
}
export default Albums;