
import type { SongMaster, SongInfo, Albums } from '../../../data/types';
import albumMaster from '../../../data/albumMaster.json';

export default function SearchSongForSingingInfoId(
  singingInfoId: string[], songInfo: SongInfo[], subscExists :number, colleFlg :number 
): Albums[] {
    const songInfoResults = songInfo.filter(data => singingInfoId.includes(data.singingInfoId));

    const distinctAlbumIds :string[] = Array.from(new Set(songInfoResults.map(data => {
        return data.albumId;
      })));
      
    const albumMasterResults: Albums[] = [];
    distinctAlbumIds.forEach(albumId => {
      const res = albumMaster.find((data) =>
      data.albumId === albumId
      && (subscExists === 0 || data.subscFlg === 0)
      && (colleFlg === 0 || data.colleFlg === 0)
     );
      if(res != null){albumMasterResults.push(res)};
    });

    return albumMasterResults;
}