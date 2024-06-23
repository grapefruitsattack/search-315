export const SearchFilterTypes: {
    filterType: string;
    name: string;
    dataType: string;
}[]=[
    {filterType:'cover',name:'カバー曲',dataType:'SongInfo'}
    ,{filterType:'u',name:'ユニット曲',dataType:'SongInfo'}
    ,{filterType:'s',name:'ソロ曲',dataType:'SongInfo'}
    ,{filterType:'imas',name:'アイマス',dataType:'SongMaster'}
    ,{filterType:'prs',name:'PRS',dataType:'SongMaster'}
    ,{filterType:'psvote',name:'パッション投票',dataType:'SongMaster'}
    ,{filterType:'type',name:'属性曲',dataType:'SongMaster'}
    ,{filterType:'all',name:'全体曲',dataType:'SongMaster'}
    ,{filterType:'anniv',name:'周年曲',dataType:'SongMaster'}
    ,{filterType:'colle',name:'ユニコレ・ソロコレ',dataType:'Other'}
    ,{filterType:'org',name:'オリジナル曲のみ（別Ver曲を非表示）',dataType:'Other'}
    ,{filterType:'sbsc',name:'サブスク対応曲のみ',dataType:'Other'}
];

export function SearchFilterTypeCheck(filterType: string, dataType: string):boolean
{
    let result: boolean = false;
    SearchFilterTypes.forEach(target => {
        if(target.dataType === dataType && target.filterType === filterType){result = true};
    });
    return result;
};
