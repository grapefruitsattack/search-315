'use client'
import CommonPage from "../../common/components/CommonPage";
import songMaster from '../../../data/songMaster.json';
import albumMaster from '../../../data/albumMaster.json';
import type { SongMaster,Albums } from '../../../data/types';
import SongContent from "./components/SongContent";

export default function SearchPage({ songId }: { songId: string }) {

    const result : SongMaster | undefined 
      = songMaster.find(data => data.songId === songId);
    const album : Albums | undefined 
      = albumMaster.find(data => data.albumId === result?.albumId);

    return (
      <>
        <title>{  `${result?.songTitle} ${'\u00a0'}|${'\u00a0\u00a0'}サーチサイコー`}</title>
          {result === undefined || album === undefined
          ?<div>結果なし</div>
          :<SongContent result={result} albumResult={album}/>
          }
      </>
    );
}