'use client'
import songMaster from '@/data/songMaster.json';
import type { SongMaster,Albums } from '@/data/types';
import SongList from "@/features/common/components/SongList";
import { Music } from "lucide-react";

export default function AlbumSongs({ album }: { album: Albums }) {

  const results : SongMaster[]
      = songMaster.filter(data => data.albumId === album.albumId) || [];

  return(
    <>
      <div
          className="
            mobileL:text-2xl text-xl font-mono flex items-center w-full
            after:h-[0.5px] after:grow after:bg-indigo-800/50 after:ml-[1rem] 
            text-indigo-900 font-bold
          "
      >
        <Music className="mr-1 text-indigo-700" />
        {'アルバム収録曲'}
      </div>
      <section className={`
        max-w-[700px]
        items-start gap-0 grid-cols-1 mt-5
        lg:grid grid 
        tablet:px-0 mobileS:px-2 px-0
      `}>
      {results.map((result, index) => (
        <SongList
          key={index} 
          index={index} 
          songId={result.songId}
          displayArtist={result.artist!==album.artist}
          useArtistBadge={1}
          displayArtwork={false}
          displayReleaseDate={false}
        />
      ))}
      </section>
    </>
  );
}