import singingMaster from '@/data/singingMaster.json';
import { CATEGORY } from '@/features/common//const/StoryInfoConst'

export function CheckSingingInfoParm(infoIdParms: string[], excludeUnit: boolean): string[]
{
    const resultParams: string[] = [];
    const idols = singingMaster.filter(data=>excludeUnit!==true||data.personFlg===1).map((data)=> data.singingInfoId);
    infoIdParms.forEach((infoId)=>{
        if(idols.includes(infoId)) resultParams.push(infoId);
    });

    return resultParams;
}
export function CheckStoryCategoryParm(categoryParms: string[]): string[]
{
    type CategoryKey = keyof typeof CATEGORY;
    const keys: CategoryKey[] = Object.keys(CATEGORY) as CategoryKey[];
    const categoryIds: string[] = [];
    keys.forEach((key) => {
      const item = CATEGORY[key];
      categoryIds.push(item.id);
    });

    const resultParams: string[] = [];
    categoryParms.forEach((categoryId)=>{
        if(categoryIds.includes(categoryId)) resultParams.push(categoryId);
    });
    
    return resultParams;
}