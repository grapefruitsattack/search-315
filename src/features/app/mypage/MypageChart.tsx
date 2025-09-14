'use client'
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { StoryCntData, SingingMaster } from '@/data/types';
import singingMaster from '@/data/singingMaster.json';
import GetUnitIdolName from "@/features/common/utils/GetUnitIdolName";
import { GetPercentageInfo } from "@/features/common/utils/PercentageUtils";
import {ShareSearch315Modal} from "@/features/app/shareModal/ShareSearch315Modal";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function MypageChart(
  { storyCntData }
  : { storyCntData:StoryCntData }
): JSX.Element {
  const idols: SingingMaster[] = singingMaster.filter(data=>data.personFlg===1);
  const units: SingingMaster[] = singingMaster.filter(data=>data.personFlg===0);
  const router = useRouter();
  const currentPath: string = usePathname();

  const [displayData, setDisplayData] 
    = useState({
        storyCnt:storyCntData.all_story_cnt,
        readStoryCnt:storyCntData.read_all_story_cnt,
        allOrFree:'all'
    });
  useEffect(() => {
    if(displayData.allOrFree==='free'){
      setDisplayData({
          storyCnt:storyCntData.free_story_cnt,
          readStoryCnt:storyCntData.read_free_story_cnt,
          allOrFree:displayData.allOrFree});
    }else{
      setDisplayData({
          storyCnt:storyCntData.all_story_cnt,
          readStoryCnt:storyCntData.read_all_story_cnt,
          allOrFree:displayData.allOrFree});
    }
  }, [storyCntData]);

  const [selectInfos, setSelectInfos] = useState({ placeholder:'ユニットを選択', selectItems:units });

  const {percentageStr,endAngle} = GetPercentageInfo(displayData.readStoryCnt,displayData.storyCnt);

  const chartData = [
    { browser: "main", visitors: 110, fill: "var(--color-main)", }, 
  ];
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    main: {
      label: "Main",
      color: "#00f2ffff",
    },
  } satisfies ChartConfig
 

    return (<>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>
            <div className="flex flex-col items-center text-center leading-7">
              <div className="inline font-normal">
                <p className="inline text-lg">{`あなたは`}</p>
                <p className="inline text-lg ">{`全`}</p>
                <p className="inline text-xl font-bold text-red-500 px-[3px]">{`${displayData.storyCnt}`}</p>
                <p className="inline text-lg">{`個の`}</p>
                <p className={`inline text-lg px-[3px] ${storyCntData.res_info_id===''?'':'text-red-500 font-bold'}`}>{`${getStoryPrefix(storyCntData.res_info_id)}`}</p>
                <p className="inline text-lg ">{`${storyCntData.res_info_id===''?'':'出演'}ストーリー中`}</p>
              </div>
              <div>
                <p className="inline text-red-500 px-1 text-4xl">{displayData.readStoryCnt}</p>
                <p className="inline ">{`ストーリーを読破しました！`}</p>
              </div>
            </div>
          </CardTitle>
          {/* <CardDescription></CardDescription> */}
        </CardHeader>
        <CardContent className="flex-1 pb-0" >
        <ChartContainer 
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] "
        >
          <RadialBarChart
            data={chartData}
            endAngle={endAngle}
            innerRadius={100}
            outerRadius={160}
            dataKey={'readStory'}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[112, 88]}
            />
            <RadialBar dataKey="visitors" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 26}
                          className="fill-muted-foreground text-sm"
                        >
                          {`${getStoryPrefix(storyCntData.res_info_id)}ストーリー`}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          <tspan className="fill-foreground text-xl font-bold ">
                            {percentageStr==='100%'?'':'約'}
                          </tspan>
                          {percentageStr}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          読了済み
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid grid-col grid-cols-1 gap-2 text-sm ">
        <div className="flex justify-center ">
        <div 
            className={`
              w-full lg:w-[240px] inline-block row-span-1 lg:pr-2 pr-1 h-8 
            `}
        >
        <ShareSearch315Modal 
            buttonText="読破状況をシェア"
            shareText={`${storyCntData.res_info_id===''?'':'出演'}ストーリー |  サーチサイコー\n#SideM #search315`} 
            pass={'unit/'}
          />
        </div>
        </div>
        <div className="flex justify-center items-center">
          <Select onValueChange={(value)=>{router.push(`/mypage/chart/?q=${value==='all'?'':value}`, { scroll: false });}}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={selectInfos.placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={0} value={'all'}>{'全ユニット'}</SelectItem>
              {selectInfos.selectItems.map((data, index) => (
                <SelectItem key={index+1} value={data.singingInfoId}>{data.singingInfoName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="">{`出演`}</p>
          <MypageChartRadioButton
            radioName="allOrFree"
            data={[
                { filterId: "all", labelStr: "全" },
                { filterId: "free", labelStr: "無料" },
            ]}
            selectedId={displayData.allOrFree}
            onChange={(id) => {
              if(id==='free'){
                setDisplayData({
                    storyCnt:storyCntData.free_story_cnt,
                    readStoryCnt:storyCntData.read_free_story_cnt,
                    allOrFree:'free'});
              }else{
                setDisplayData({
                    storyCnt:storyCntData.all_story_cnt,
                    readStoryCnt:storyCntData.read_all_story_cnt,
                    allOrFree:'all'});
            }}
          }
          ></MypageChartRadioButton>
          <p className="">{`ストーリーの読破状況を見る`}</p>
        </div>
        <div>{'※現在公式媒体で読むことが可能なストーリーをカウント対象としています'}</div>
      </CardFooter>
    </Card>
    </>
      );
  };


function getStoryPrefix(infoId: string){
  if(infoId==='') return 'SideM';
  return GetUnitIdolName(infoId,0,1);
};

type FilterData = {
  filterId: string;
  labelStr: string;
};

function MypageChartRadioButton({
    radioName,
    data,
    selectedId,
    onChange
}: {
    radioName: string;
    data: FilterData[];
    selectedId: string; // 現在選択中のfilterId
    onChange: (filterId: string) => void;
}) {
  return (
    <div className="flex flex-row flex-wrap gap-0 divide-x-2 divide-gray-300">
      {data.map((item) => (
        <label
          key={item.filterId}
          className="flex flex-row relative cursor-pointer"
        >
          <input
            type="radio"
            name={radioName}
            id={item.filterId}
            checked={selectedId === item.filterId}
            className="hidden peer"
            onChange={(e) => {
              onChange(item.filterId);
            }}
          />
          <div
            className={`text-left justify-center px-2 py-0 lg:py-1
              text-stone-500
              peer-checked:text-green-400
              font-sans text-sm lg:text-base 
              bg-stone-200/20 peer-checked:bg-stone-200/0
              hover:bg-green-200/20 hover:text-green-400
              border-2
              peer-checked:border-green-300 peer-checked:border-2
              peer-checked:rounded-none
              drop-shadow-md peer-checked:drop-shadow-none
              transition-all duration-500 ease-out
              select-none`}
          >
            {item.labelStr}
          </div>
        </label>
      ))}
    </div>
  );
}
