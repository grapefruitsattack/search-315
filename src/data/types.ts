export type Albums = {
  sereisId: string;
  albumId: string;
  albumTitleFull: string;
  albumTitle: string;
  subscFlg: number;
  colleFlg: number;
  isSoloColle: number;
  isUnitColle: number;
  releaseDate: string;
  displayArtist: string;
  artist: string;
  releasePage: string;
  trialYoutubeId: string;
  description: string;
};

export type SingingMaster = {
  singingInfoId: string;
  personFlg: number;
  singingInfoName: string;
  singingInfoShortName: string;
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
  artist: string;
  commonSong: string;
  trialYoutubeId: string;
  type: string;
  subscFlg: number;
  execFlg: number;
  originalFlg: number;
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
  title: string;
  siteType: string;
  url: string;
  embedUrl: string;
  thumbnailUrl: string;
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
  title: string;
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

export type Story = {
  storyId: string;
  media: number;
  category: string;
  website: string;
  headTitle: string;
  storyTitle: string;
  releaseDate: Date;
  subCnt: number;
  voiceAtRelease: number;
  voice: number;
  still: number;
  url: string;
  relationExists: number;
  info_story: {
    infoId: string;
    personFlg: number;
  }[];
  howtoview_story: {
    howToView: string;
  }[];
  m_sub_story: SubStory[];
};

export type SubStory = {
  subStoryId: string;
  subStoryNo: string;
  media: number;
  category: string;
  subStoryTitle: string;
  releaseDate: Date;
  voiceAtRelease: number;
  url: string;
  info_sub_story: {
    infoId: string;
    personFlg: number;
  }[];
};

export type RelationStory = {
  storyId: string;
  m_story: Story;
};

export type CreditMaster = {
  creditId: string;
  name: string;
};

export type SongCredit = {
  songId: string;
  songTitle: string;
  creditType: string;
  creditId: string;
  displayName: string;
};