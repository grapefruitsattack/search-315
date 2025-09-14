
import type { SingingMaster } from '../../../data/types';
import singingMaster from '../../../data/singingMaster.json';

export default function GetUnitIdolName(
    id: string, useShortName: number, replaceSpace: number
  ): string {

    const data: SingingMaster | undefined  = singingMaster.find(data => data.singingInfoId === id);
    const name: string 
        = useShortName===0?data?.singingInfoName||'': data?.singingInfoShortName||'';
    const personFlg: number = data===undefined?0:data.personFlg;
    if(personFlg===0) return name;
    return replaceSpace===1?name.replace(/\s+/g, ""):name;
}