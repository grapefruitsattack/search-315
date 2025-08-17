import singingMaster from '../../../data/singingMaster.json';
import { CATEGORY } from '../const/StoryInfoConst'

export function CheckSingingInfoParm(infoIdParms: string[]): string[]
{
    const resultParams: string[] = [];
    const idols = singingMaster.map((data)=> data.singingInfoId);
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