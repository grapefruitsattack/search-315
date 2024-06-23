
import { SearchFilterTypeCheck } from '../../app/search/const/SearchFilterType';
import type { SongMaster, SongInfo, Tabs } from '../../../data/types';
import songMaster from '../../../data/songMaster.json';
import singingMaster from '../../../data/singingMaster.json';

export default function SearchSong(
  singingInfoIds: string[], AlbumSeriesIds: string[], otherFilterStatus: string[]
  , songInfo: SongInfo[], searchMode: string
): SongMaster[] {

  let searchResultsTemp: SongInfo[] = songInfo;

  /**
   * アイドル・ユニットから検索
   */
  //無効なパラメータの削除
  singingInfoIds = singingInfoIds.filter(targetId=>singingMaster.find(data=>targetId===data.singingInfoId));
  //検索パラメータが有効かチェック
  if(singingInfoIds.length === 0 || (singingInfoIds.length === 1 && singingInfoIds[0]==='')){
    //パラメータが空の場合アイドル・ユニットで絞り込みを行わない
    searchResultsTemp = songInfo;
  }else if(searchMode==='and'){
    //AND検索
    singingInfoIds.forEach(targetId => {
      const searchResultsTarget: String[] 
        = songInfo.filter(data => data.singingInfoId === targetId).map(data=>data.songId);
      searchResultsTemp = searchResultsTemp.filter(data => searchResultsTarget.includes(data.songId));
    });
  } else {
    //OR検索
    searchResultsTemp = songInfo.filter(data => singingInfoIds.includes(data.singingInfoId));
  };

  /**
   * 絞り込み処理
   */
  let validFilter = false;
  let ResultsByFilterTemp: String[] = [];
  otherFilterStatus.forEach(targetStatus => {
    if(SearchFilterTypeCheck(targetStatus, 'SongInfo')){
      validFilter = true;
      ResultsByFilterTemp = ResultsByFilterTemp.concat(songInfo.filter(data => data.type === targetStatus).map(data=>data.songId));
    } else if(SearchFilterTypeCheck(targetStatus, 'SongMaster')){
      validFilter = true;
      ResultsByFilterTemp = ResultsByFilterTemp.concat(songMaster.filter(data => data.type.indexOf(targetStatus) > -1).map(data=>data.songId));
    } else if(SearchFilterTypeCheck(targetStatus, 'Other') && targetStatus === 'colle'){
      validFilter = true;
      ResultsByFilterTemp = ResultsByFilterTemp.concat(songMaster.filter(data => data.colleFlg === 1).map(data=>data.songId));
    };
  });
  searchResultsTemp = validFilter?searchResultsTemp.filter(data => ResultsByFilterTemp.includes(data.songId)):searchResultsTemp;
  otherFilterStatus.forEach(targetStatus => {
    if(SearchFilterTypeCheck(targetStatus, 'Other')){
      let ResultsByFilterTarget: String[] = [];
      switch (targetStatus) {
        case 'org' :
          ResultsByFilterTarget = songMaster.filter(data => data.originalFlg === 1).map(data=>data.songId);
          searchResultsTemp = searchResultsTemp.filter(data=>ResultsByFilterTarget.includes(data.songId));
          break;
        case 'sbsc' :
          ResultsByFilterTarget = songMaster.filter(data => data.subscFlg === 1).map(data=>data.songId);
          searchResultsTemp = searchResultsTemp.filter(data=>ResultsByFilterTarget.includes(data.songId));
          break;
        default:
          break;
      }
    };
  });


  const distinctSongIds :string[] 
    = Array.from(new Set(searchResultsTemp.map(data => {
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
        );
      if(res != null){songMasterResults.push(res)};
    });

    return songMasterResults;
}