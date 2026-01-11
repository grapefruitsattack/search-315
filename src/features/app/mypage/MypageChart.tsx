'use client'
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { UserChartData, SingingMaster } from '@/data/types';
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
  BarChart, XAxis, YAxis, Tooltip, Bar, BarRectangleItem, Cell
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
  { userChartData }
  : { userChartData:UserChartData[] }
): JSX.Element {
  const idols: SingingMaster[] = singingMaster.filter(data=>data.personFlg===1);
  const units: SingingMaster[] = singingMaster.filter(data=>data.personFlg===0);
  const router = useRouter();
  const currentPath: string = usePathname();

  const unknownUserChartData: UserChartData = {seq_id:0,info_id:'',info_type:'',all_story_cnt:0,free_story_cnt:0,read_all_story_cnt:0,read_free_story_cnt:0};
  const allStoryData: UserChartData = userChartData.find(data=>data.info_id==='sidem')||{...unknownUserChartData, info_id:'sidem'};
  userChartData.map((e)=>{
    return {id: ''}
  });
  const [displayData, setDisplayData]
    = useState({
        storyCnt:allStoryData.all_story_cnt,
        readStoryCnt:allStoryData.read_all_story_cnt,
        allOrFree:'all',
        selectedUserChartData:allStoryData
    });
  useEffect(() => {
    if(displayData.allOrFree==='free'){
      setDisplayData({
          storyCnt:allStoryData.free_story_cnt,
          readStoryCnt:allStoryData.read_free_story_cnt,
          allOrFree:displayData.allOrFree,
          selectedUserChartData:allStoryData});
    }else{
      setDisplayData({
          storyCnt:allStoryData.all_story_cnt,
          readStoryCnt:allStoryData.read_all_story_cnt,
          allOrFree:displayData.allOrFree,
          selectedUserChartData:allStoryData});
    }
  }, [userChartData]);

  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedIdol, setSelectedIdol] = useState('');

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

  const barchartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]

    return (<>
      <section className='flex flex-col justify-center gap-2'>
        <div className="grid grid-cols-2 gap-2">
          <Card className="flex flex-col font-normal text-base mobileL:text-lg">
            <CardContent className="py-2">
              <p className="">現在配信中のSideMストーリー数</p>
              <p className="text-3xl mobileL:text-4xl">{allStoryData.all_story_cnt}</p>
            </CardContent>
          </Card>
          <Card className="flex flex-col font-normal text-base mobileL:text-lg">
            <CardContent className="py-2">
              <p className="">あなたの読破済みストーリー数</p>
              <p className="text-3xl mobileL:text-4xl">{allStoryData.read_all_story_cnt}</p>
            </CardContent>
          </Card>
        </div>
        {/* 棒グラフ */}

        <div className="">
        <ChartContainer config={chartConfig} className=" w-full max-h-[100vw]">
          <BarChart layout="vertical" accessibilityLayer data={barchartData}>
            <XAxis type="number"/>
            <YAxis   dataKey="month" type="category" />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4}  background={{ fill: '#eee' }} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />

          </BarChart>
        </ChartContainer>
        </div>
        {/* 円グラフ */}
        <div 
          className="flex flex-col gap-2 w-fit rounded-md border"
          >
          {/* 表示条件指定部 */}
          <div className="">
            <div className="flex flex-col gap-3 w-max">
              <div className=''>
                <MypageChartRadioButton
                  radioName="allOrFree"
                  data={[
                      { filterId: "all", labelStr: "全て" },
                      { filterId: "free", labelStr: "無料ストーリーのみ" },
                  ]}
                  selectedId={displayData.allOrFree}
                  onChange={(id) => {
                    if(id==='free'){
                      setDisplayData({
                          ...displayData,
                          storyCnt:displayData.selectedUserChartData.free_story_cnt,
                          readStoryCnt:displayData.selectedUserChartData.read_free_story_cnt,
                          allOrFree:'free'});
                    }else{
                      setDisplayData({
                          ...displayData,
                          storyCnt:displayData.selectedUserChartData.all_story_cnt,
                          readStoryCnt:displayData.selectedUserChartData.read_all_story_cnt,
                          allOrFree:'all'});
                  }}
                }
                ></MypageChartRadioButton>
              </div>
              <div className="flex flex-row flex-wrap gap-y-1 gap-x-2">
                <Select 
                  name="select-unit" value={selectedUnit}
                  onValueChange={(value)=>{
                    setSelectedUnit(value);
                    setSelectedIdol('');
                    const selectedStoryData: UserChartData = userChartData.find(data=>data.info_id===value)||{...unknownUserChartData, info_id:value};
                    setDisplayData({
                        ...displayData,
                        storyCnt:displayData.allOrFree==='free'?selectedStoryData.free_story_cnt:selectedStoryData.all_story_cnt,
                        readStoryCnt:displayData.allOrFree==='free'?selectedStoryData.read_free_story_cnt:selectedStoryData.read_all_story_cnt,
                        selectedUserChartData:selectedStoryData
                    });
                  }}
                  >
                  <SelectTrigger className="w-[145px] mobileM:w-[150px] mobileL:w-[170px] h-[35px]">
                    <SelectValue placeholder={'ユニット'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key={0} value={'sidem'}>{'全ユニット'}</SelectItem>
                    {units.map((data, index) => (
                      <SelectItem key={index+1} value={data.singingInfoId}>{data.singingInfoName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select name="select-idol"  value={selectedIdol}
                  onValueChange={(value)=>{
                    setSelectedIdol(value);
                    setSelectedUnit('');
                    const selectedStoryData: UserChartData = userChartData.find(data=>data.info_id===value)||{...unknownUserChartData, info_id:value};
                    setDisplayData({
                        ...displayData,
                        storyCnt:displayData.allOrFree==='free'?selectedStoryData.free_story_cnt:selectedStoryData.all_story_cnt,
                        readStoryCnt:displayData.allOrFree==='free'?selectedStoryData.read_free_story_cnt:selectedStoryData.read_all_story_cnt,
                        selectedUserChartData:selectedStoryData
                    });
                  }}
                  >
                  <SelectTrigger className="w-[145px] mobileM:w-[150px] mobileL:w-[170px] h-[35px]">
                    <SelectValue placeholder={'アイドル'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key={0} value={'sidem'}>{'全アイドル'}</SelectItem>
                    {idols.map((data, index) => (
                      <SelectItem key={index+1} value={data.singingInfoId}>{data.singingInfoName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {/* チャート表示部 */}
          <div className="p-1 max-w-[500px]">
            <div className="flex flex-col items-center text-center leading-7">
              <div className="inline font-normal text-base mobileL:text-lg">
                <p className="inline ">{`あなたは`}</p>
                <p className={`inline px-[3px] ${displayData.selectedUserChartData.info_id==='sidem'?'':'text-red-500 font-bold'}`}>{`${getStoryPrefix(displayData.selectedUserChartData.info_id)}`}</p>
                <p className="inline ">{`${displayData.selectedUserChartData.info_id==='sidem'?'':'出演'}`}</p>
                <p className={`inline ${displayData.allOrFree==='free'?' pl-[2px]':''}`}>{`${displayData.allOrFree==='free'?'無料':''}ストーリーを`}</p>
              </div>
              <div className="inline font-bold">
                <p className="inline text-red-500 px-1 text-3xl mobileL:text-4xl">{displayData.readStoryCnt}</p>
                <p className="inline text-red-500 px-1 text-3xl mobileL:text-2xl">{`/`}{displayData.storyCnt}</p>
                <p className="inline text-xl mobileL:text-2xl ">{`読破しました！`}</p>
              </div>
            </div>
            <div>
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
                                {`${getStoryPrefix(displayData.selectedUserChartData.info_id)}ストーリー`}
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
            </div>
            <div className="grid grid-col grid-cols-1 gap-2 text-sm ">
              <div className="flex justify-center ">
              <div 
                  className={`
                    w-full lg:w-[240px] inline-block row-span-1 lg:pr-2 pr-1 h-8 
                  `}
              >
              <ShareSearch315Modal 
                  buttonText="読破状況をシェア"
                  shareText={`${displayData.selectedUserChartData.info_id==='sidem'?'':'出演'}ストーリー |  サーチサイコー\n#SideM #search315`} 
                  pass={'unit/'}
                />
              </div>
              </div>
              <div>{'※現在公式媒体で読むことが可能なストーリーをカウント対象としています'}</div>
            </div>
          </div>
        </div>
      </section>
    </>
      );
  };


function getStoryPrefix(infoId: string){
  if(infoId==='sidem') return 'SideM';
  if(infoId==='CFP03') return 'アスラン＝BBⅡ世';
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
    <div className="flex flex-row flex-wrap h-fit gap-0 divide-x-2 divide-gray-300 bg-white w-fit">
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
            className={`text-left justify-center px-2 py-1
              text-stone-500
              peer-checked:text-green-400
              font-sans text-sm tablet:text-base 
              bg-stone-200/20 peer-checked:bg-stone-200/0
              hover:bg-green-200/20 hover:text-green-400
              border-2
              peer-checked:border-green-300 peer-checked:border-2
              peer-checked:rounded-none
              shadow-inner peer-checked:shadow-inner-none
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
