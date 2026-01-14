import type { UserChartData, DisplayUserChartData, SingingMaster } from '@/data/types';
import singingMaster from '@/data/singingMaster.json';
import { GetPercentageInfo } from "@/features/common/utils/PercentageUtils";

export function conversionUserChartData(userChartData: UserChartData[]): DisplayUserChartData[]{

  const unknownUserChartData: UserChartData = {seq_id:0,info_id:'',info_type:'',all_story_cnt:0,free_story_cnt:0,read_all_story_cnt:0,read_free_story_cnt:0};
  const allStoryData: UserChartData = userChartData.find(data=>data.info_id==='sidem')||{...unknownUserChartData, info_id:'sidem'};
  const result: DisplayUserChartData[] = [];
  userChartData.map((e)=>{
    const m: SingingMaster | undefined = singingMaster.find(data=>data.singingInfoId===e.info_id);
    const allPercentageInfo = GetPercentageInfo(e.read_all_story_cnt,e.all_story_cnt);
    const freePercentageInfo = GetPercentageInfo(e.read_free_story_cnt,e.free_story_cnt);
    if(m?.personFlg === 0 || m?.personFlg === 1){
      result.push({
        ...e,
        info_type: m?.personFlg === 1?'idol':'unit',
        info_name: m?.singingInfoName||'',
        all_percentage: parseFloat(allPercentageInfo.percentageStr),
        all_end_angle: allPercentageInfo.endAngle,
        free_percentage: parseFloat(freePercentageInfo.percentageStr),
        free_end_angle: freePercentageInfo.endAngle,
      });
    }else{
      result.push({
        ...e,
        info_type: '',
        info_name: m?.singingInfoName||'',
        all_percentage: parseFloat(allPercentageInfo.percentageStr),
        all_end_angle: allPercentageInfo.endAngle,
        free_percentage: parseFloat(freePercentageInfo.percentageStr),
        free_end_angle: freePercentageInfo.endAngle,
      });
    };
  });
  return result;
}