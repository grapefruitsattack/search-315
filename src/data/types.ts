export type Albums = {
  sereisId: string;
  albumId: string;
  albumTitleFull: string;
  albumTitle: string;
  colleFlg: number;
  isSoloColle: number;
  isUnitColle: number;
  releaseDate: string;
  displayArtist: string;
  releasePage: string;
  youtubeId: string;
  trialYoutubeId: string;
  description: string;
};

export type SingingMaster = {
  singingInfoId: string;
  personFlg: number;
  singingInfoName: string;
  singingInfoReadingName: string;
  singingInfoRomajiName: string;
  color: string;
  url: string;
};

export type SongInfo = {
  albumId: string;
  trackNo: number;
  songId: string;
  singingInfoId: string;
  releaseDate: string;
  type: string;
};

export type SongMaster = {
  trackNo: number;
  albumId: string;
  songId: string;
  songTitle: string;
  displayArtist: string;
  commonSong: string;
  youtubeId: string;
  trialYoutubeId: string;
  execFlg: number;
  colleFlg: number;
  isSoloColle: number;
  isUnitColle: number;
  releaseDate: string;
  AlbumSereisId: string;
  albumTitleFull: string;
  albumTitle: string;
  description: string;
};

export type SubscUrls = {
  id: string;
  title: string;
  youtubeId: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  amazonMusicUrl: string;
  lineMusicUrl: string;
  awaUrl: string;
  towerRecordsMusic: string;
};

export type MvInfo = {
  songId: string;
  mvType: string;
  url: string;
  songName: string;
};

export type LiveMaster = {
  liveId: string;
  perId: string;
  livePerId: string;
  displayLiveName: string;
  displayPerName: string;
  liveName: string;
  perName: string;
  perDate: string;
  officialPage: string;
  type: string;
};

export type LiveSetLists = {
  livePerId: string;
  trackNo: number;
  songId: string;
  coverFlg: string;
  name: string;
  displayArtist: string;
};

export type LiveProduct = {
  productId: string;
  productName: string;
  livePerId: string;
  releasePage: string;
  releaseDate: string;
};

export type LiveMovie = {
  productId: string;
  youtubeId: string;
  type: string;
  typeName: string;
  livePerId: string;
};

export type Tabs = {
  title: string;
  id: string;
  icon: string;
  color: string;
  disabled: boolean;
  content: JSX.Element;
};

export type LivePerformer = {
  livePerId: string;
  singingInfoId: string;
};