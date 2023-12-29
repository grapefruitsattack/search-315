
const dummySeriesId:string[] 
    = [
        'AD'
        ,'SH'
        ,'PM'
        ,'CODS'
        ,''
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