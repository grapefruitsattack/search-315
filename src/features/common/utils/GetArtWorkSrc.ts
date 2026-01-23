
const dummySeriesId:string[] 
    = [
        'AD'
        ,'SH'
        ,'PM'
        ,'CODS'
        ,'8ST'
        ,'9ST'
        ,'MESP'
        ,'UOS'
        ,''
        ,'MTS' //TODO 該当アートワーク作成後削除
        ,'FBF' //TODO 該当アートワーク作成後削除
    ];

export default function GetArtWorkSrc
(sereisId: string, isSoloColle: number, isUnitColle: number)
:string
{
    if(isSoloColle===1){
        return 'solocoll';
    }else if(isUnitColle===1){
        return 'unitcoll';
    }else if(dummySeriesId.includes(sereisId)){
        return 'dummy';
    };
    return sereisId;
}