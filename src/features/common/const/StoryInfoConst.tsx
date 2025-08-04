export const MEDIA = {
  moba: {id:1,name:'モバエム'},
  gs: {id:2,name:'サイスタ'},
  proe: {id:3,name:'アイマスポータル'},
};
export const CATEGORY = {
  main: {id:'main',name:'メインストーリー',mediaId:2},
  mobaEvent: {id:'moba_event',name:'イベントストーリー',mediaId:1},
  gsEvent: {id:'gs_event',name:'イベントストーリー',mediaId:2},
  idolEpisode: {id:'idole',name:'アイドルエピソード',mediaId:2},
  comicNomral: {id:'comicn',name:'雑誌通常号',mediaId:1},
  comicSpecial: {id:'comics',name:'雑誌特別号',mediaId:1},
  SideMemories: {id:'smemo',name:'SideMemories',mediaId:1},
  dailyOneFrame: {id:'dof',name:'日常での１コマ',mediaId:1},
  episodeZero: {id:'epiz',name:'エピソードゼロ',mediaId:2},
  connectWithMusic: {id:'cwm',name:'楽曲連動ストーリー',mediaId:3},
  connectWithStage: {id:'cws',name:'ライブ連動ストーリー',mediaId:3},
  connectWithOthers: {id:'cwo',name:'連動ストーリー',mediaId:3},
  idolOneFrame: {id:'iof',name:'アイドルたちの１コマ',mediaId:3},
};
export const WEBSITE = {
  youtube: {id:'yt',name:'YouTube'},
  asobiStory: {id:'asb',name:'アソビストーリー'},
};
export const HOW_TO_VIEW = {
  asbLogin: {id:'asb_login',name:'アソビストアログイン'},
  asbPremium: {id:'asb_prem',name:'アソストプレ会員特典'},
  asbPurchase: {id:'asb_pur',name:'バナコイン購入'},
  asbSerialcodeCD: {id:'asb_scode_cd',name:'CD封入シリアルコード'},
  asbSerialcode: {id:'asb_scode',name:'シリアルコード'},
};

export function getMediaByCategory(categoryId:string):number{
  type CategoryKey = keyof typeof CATEGORY;
  const keys: CategoryKey[] = Object.keys(CATEGORY) as CategoryKey[];
  const targetKey = keys.find((key)=>CATEGORY[key].id===categoryId)||"mobaEvent";

  return CATEGORY[targetKey].mediaId||1;
};
export function getCategoryByMedia(mediaId:number):{categoryId:string,name:string}[]{
  type CategoryKey = keyof typeof CATEGORY;
  const keys: CategoryKey[] = Object.keys(CATEGORY) as CategoryKey[];
  const result: {categoryId:string,name:string}[] = [];
  
  keys.forEach((key) => {
    const item = CATEGORY[key];
    if(item.mediaId === mediaId) result.push({categoryId:item.id,name:item.name});
  });

  return result;
};
export function getMediaArrayByCategory(categoryIds:string[]):number[]{
  type MediaKey = keyof typeof MEDIA;
  const keys: MediaKey[] = Object.keys(MEDIA) as MediaKey[];
  const result: number[] = [];

  keys.forEach((key) => {
    const item = MEDIA[key];
    let isExist: boolean = true;
    for(const data of getCategoryByMedia(item.id)){
      if(!(categoryIds.includes(data.categoryId))){
        isExist = false;
        break;
      };
    };
  });

  return result;
};
export function getAllMediaWithCategoryArray():{mediaId:number,categoryIds:string[]}[]{
  type MediaKey = keyof typeof MEDIA;
  type CategoryKey = keyof typeof CATEGORY;
  const mediaKeys: MediaKey[] = Object.keys(MEDIA) as MediaKey[];
  const categoryKeys: CategoryKey[] = Object.keys(CATEGORY) as CategoryKey[];
  const result: {mediaId:number,categoryIds:string[]}[] = [];
  mediaKeys.forEach((mediaKey) => {
    const media = MEDIA[mediaKey];
    const targetCategoryIds: string[] = [];
    categoryKeys.forEach((categoryKey) => {
      if(MEDIA[mediaKey].id===CATEGORY[categoryKey].mediaId) targetCategoryIds.push(CATEGORY[categoryKey].id);
    });
    result.push({mediaId:MEDIA[mediaKey].id,categoryIds:targetCategoryIds});
  });

  return result;
}