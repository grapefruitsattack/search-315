
import type { SongMaster, SongInfo, Tabs } from '../../../data/types';
import songMaster from '../../../data/songMaster.json';

export default function SearchSongForSingingInfoId(
  singingInfoId: string[], songInfo: SongInfo[], subscExists :number, colleFlg :number 
): SongMaster[] {
    const songInfoResults 
      = singingInfoId.length > 0 && (singingInfoId[0].trim()!=='')
        ?songInfo.filter(data => singingInfoId.includes(data.singingInfoId))
        :songInfo;

    const distinctSongIds :string[] = Array.from(new Set(songInfoResults.map(data => {
        return data.songId;
      })));
      
    const songInfoDistinctResults: SongInfo[] = [];
    distinctSongIds.forEach(distinctSongId => {
      const res = songInfo.find((data) => data.songId === distinctSongId);
      if(res != null){songInfoDistinctResults.push(res)};
    });
    const songMasterResults: SongMaster[] = [];
    songInfoDistinctResults.forEach(distinctSongId => {
      const res = songMaster.find((data) =>
      data.albumId === distinctSongId.albumId && data.trackNo === distinctSongId.trackNo
      && (subscExists === 0 || data.subscFlg === 1)
      && (colleFlg === 0 || data.colleFlg === 0)
     );
      if(res != null){songMasterResults.push(res)};
    });

    return songMasterResults;
}