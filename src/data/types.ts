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
  singingInfoName: string;
};

export type Story = {
  storyId: string;
  media: number;
  category: string;
  website: string;
  headTitle: string;
  storyTitle: string;
  releaseDate: string;
  subCnt: number;
  voiceAtRelease: number;
  voice: number;
  still: number;
  url: string;
  infoStory: InfoStory[];
  howtoviewStory: string[];
  mSubStory: SubStory[];
  relationStory: {
    storyId: string;
    media: number;
    category: string;
    website: string;
    headTitle: string;
    storyTitle: string;
    releaseDate: Date;
    voiceAtRelease: number;
    voice: number;
    url: string;
    infoStory: InfoStory[];
  }[];
};

export type InfoStory = {
  infoId: string;
  personFlg: number;
}

export type SubStory = {
  subStoryId: string;
  subStoryNo: string;
  media: number;
  category: string;
  subStoryTitle: string;
  releaseDate: Date;
  voiceAtRelease: number;
  url: string;
  infoSubStory: InfoStory[];
};

export type StorySearchResult = {
  story_id: string;
  media: number;
  category: string;
  website: string;
  head_title: string;
  story_title: string;
  release_date: Date;
  voice_at_release: number;
  voice: number;
  still: number;
  url: string;
  info_id: InfoStory[];
  is_valid: number;
  user_read_later: number|null;
};

export type UserReading = {
  id: string;
  storyId: string;
  readingDate: Date;
  readLater: number;
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

export type StoryCntData = {
  all_story_cnt: number;
  read_all_story_cnt: number;
  free_story_cnt: number;
  read_free_story_cnt: number;
  res_info_id: string;
};