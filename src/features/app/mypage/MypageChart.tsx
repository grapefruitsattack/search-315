'use client'
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { UserChartData, DisplayUserChartData, SingingMaster } from '@/data/types';
import singingMaster from '@/data/singingMaster.json';
import GetUnitIdolName from "@/features/common/utils/GetUnitIdolName";
import { GetPercentageInfo } from "@/features/common/utils/PercentageUtils";
import {ShareModalButton} from "@/features/app/shareModal/ShareModalButton";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  BarChart, XAxis, YAxis, Tooltip, Bar, BarRectangleItem, Cell, LabelList, TooltipContentProps, RenderableText
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

const colors = ['#a3f197','#fdd488','#fcfa99','#61dffe','#ffe553','#54db54','#b27aea','#ff7e7e','#ffffff','#CC66CC','#fdc2e5','#FF70E2','#4A4A4A','#818df8','#84a6d3','#56e0d5'];

const percentageFormatter = (val:any)=>{return val===100||val===0?`${val}%`:`${Math.abs(Number(val)).toFixed(1)}%`};

export default function MypageChart(
  { userChartData }
  : { userChartData:DisplayUserChartData[] }
): JSX.Element {
  const idols: SingingMaster[] = singingMaster.filter(data=>data.personFlg===1);
  const units: SingingMaster[] = singingMaster.filter(data=>data.personFlg===0);

  const unknownUserChartData: DisplayUserChartData = {seq_id:0,info_id:'',info_type:'',info_name:'',all_story_cnt:0,free_story_cnt:0,read_all_story_cnt:0,read_free_story_cnt:0,all_percentage:0,all_end_angle:0,free_percentage:0,free_end_angle:0};
  const allStoryData: DisplayUserChartData = userChartData.find(data=>data.info_id==='sidem')||{...unknownUserChartData, info_id:'sidem'};
  const barChartAllData: {index:number;info_id:string;info_name:string;story_cnt:number;read_cnt:number;percentage:number;}[] = [];
  const barChartFreeData: {index:number;info_id:string;info_name:string;story_cnt:number;read_cnt:number;percentage:number;}[] = [];
  userChartData.map((data,index)=>{
    if(data.info_type==='unit'){
      barChartAllData.push({
        index: index,
        info_id: data.info_id,
        info_name: data.info_name,
        story_cnt: data.all_story_cnt,
        read_cnt: data.read_all_story_cnt,
        percentage: data.all_percentage,
      });
      barChartFreeData.push({
        index: index,
        info_id: data.info_id,
        info_name: data.info_name,
        story_cnt: data.free_story_cnt,
        read_cnt: data.read_free_story_cnt,
        percentage: data.free_percentage,
      });
    }
  });
  const [barChartDisplayData, barPieChartDisplayData]
    = useState({
        allOrFree:'all',
        selectedData:barChartAllData
    });

  const [pieChartDisplayData, setPieChartDisplayData]
    = useState({
        storyCnt:allStoryData.all_story_cnt,
        readStoryCnt:allStoryData.read_all_story_cnt,
        allOrFree:'all',
        selectedUserChartData:allStoryData
    });
  useEffect(() => {
    if(pieChartDisplayData.allOrFree==='free'){
      setPieChartDisplayData({
          storyCnt:allStoryData.free_story_cnt,
          readStoryCnt:allStoryData.read_free_story_cnt,
          allOrFree:pieChartDisplayData.allOrFree,
          selectedUserChartData:allStoryData});
    }else{
      setPieChartDisplayData({
          storyCnt:allStoryData.all_story_cnt,
          readStoryCnt:allStoryData.read_all_story_cnt,
          allOrFree:pieChartDisplayData.allOrFree,
          selectedUserChartData:allStoryData});
    }
  }, [userChartData]);

  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedIdol, setSelectedIdol] = useState('');

  const {percentageStr,endAngle} = GetPercentageInfo(pieChartDisplayData.readStoryCnt,pieChartDisplayData.storyCnt);

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
  const CustomTooltip = ({ active, payload, label }: TooltipContentProps<string | number, string>) => {
    const isVisible = active && payload && payload.length;
    return (
      <div className="custom-tooltip bg-white p-1" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
        {isVisible && (
          <>
            <p className="label">{`${label} ${payload[0].payload.percentage}% 読了済み`}</p>
            <p className="data">{`${'既読ストーリー'} : ${payload[0].payload.read_cnt}`}</p>
            <p className="data">{`${'全ストーリー'} : ${payload[0].payload.story_cnt}`}</p>
          </>
        )}
      </div>
    );
  };
  const barClick = (_: BarRectangleItem, index: number, value: any) => {
    const element = document.getElementById('pieChart');
    if(element!==null){
      const targetDOMRect = element.getBoundingClientRect();
      const targetTop = targetDOMRect.top + window.pageYOffset;
      window.scrollTo({
        top: targetTop-70,
        behavior: 'smooth'
      });
      console.log('barClick');
      console.log(index);
    }
  };

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

        <div className="">
        </div>
        <Card className="py-0">
          <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
              <CardTitle>あなたの読了状況</CardTitle>
              <CardDescription>
                ※現在公式媒体で閲覧が可能なストーリーをカウント対象としています
              </CardDescription> 
            </div>
          <div className="flex ">
            <button
              key={0}
              data-active={true}
              className="break-keep data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
              onClick={() => {}}
            >
              <span className="text-muted-foreground text-base break-keep">
                {'全ストーリー'}
              </span>
              <span className="font-bold">
                <p className="inline text-red-500 px-1 text-3xl mobileL:text-4xl">{allStoryData.read_all_story_cnt}</p>
                <p className="inline text-red-500 px-1 text-3xl mobileL:text-2xl">{`/`}{allStoryData.all_story_cnt}</p>
              </span>
            </button>
            <button
              key={1}
              data-active={false}
              className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
              onClick={() => {}}
            >
              <span className="text-muted-foreground text-base break-keep">
                {'無料ストーリー'}
              </span>
              <span className="font-bold">
                <p className="inline text-red-500 px-1 text-3xl mobileL:text-4xl">{allStoryData.read_free_story_cnt}</p>
                <p className="inline text-red-500 px-1 text-3xl mobileL:text-2xl">{`/`}{allStoryData.free_story_cnt}</p>
              </span>
            </button>
          </div>
          </CardHeader>
          <CardContent className="flex flex-col items-stretch border-b !p-0 lg:flex-row">


          {/* 棒グラフ */}
          <ChartContainer config={chartConfig} className=" flex-1 min-w-0 w-fit min-h-[50vw]">
            <BarChart 
              layout="vertical" 
              accessibilityLayer 
              data={barChartAllData}
              barCategoryGap={0}
            >
              <XAxis 
                domain={[0, 100]} type="number"
                tickFormatter={percentageFormatter}
              />
              <YAxis 
                dataKey="info_name" type="category" hide={true} 
              />
              <Tooltip content={CustomTooltip}/>
              <Bar className=""
                dataKey="percentage" fill='#00C49F' radius={4} 
                onClick={barClick} 
              >
                <LabelList
                  className="" 
                  dataKey="info_name"
                  cursor="pointer"
                  onClick={(index)=>{
                    console.log(index)
                  }}
                  content={({ x, y, width, height, index, value }) => {
                    const color = colors[index||0];
                    return (
                    <g >
                      <text
                        //style="stroke-width:10;stroke:#000;fill:#fff;paint-order:stroke;"
                        stroke="#ffffff" 
                        paintOrder={'stroke'}
                        strokeWidth={4}
                        className="text-xl font-bold"
                        x={Number(x)+10}
                        y={Number(y)+Number(height)/2}
                        fill={'black'}
                        textAnchor="start"
                        dominantBaseline="middle"
                        cursor="pointer"
                        onClick={()=>{
                          console.log(index)
                        }}
                      >
                        {value}
                      </text>
                      </g >
                    );
                    }}
                  />
                {barChartAllData.map((_entry, index, value) => (

                  <Cell cursor="pointer" key={`cell-${index}`} fill={colors[index % colors.length]} stroke='#8a8888' />

                ))}

              </Bar>
            </BarChart>
          </ChartContainer>

          </CardContent>
          </Card>


        {/* 棒グラフ */}
        <div className="">
        <ChartContainer config={chartConfig} className=" w-full min-h-[50vw]">
          <BarChart 
            layout="vertical" 
            accessibilityLayer 
            data={barChartAllData}
            barCategoryGap={0}
          >
            <XAxis 
              domain={[0, 100]} type="number"
              tickFormatter={percentageFormatter}
            />
            <YAxis 
              dataKey="info_name" type="category" hide={true} 
            />
            <Tooltip content={CustomTooltip}/>
            <Bar className=""
              dataKey="percentage" fill='#00C49F' radius={4}  background={{ fill: '#e1e1e1' }}
              onClick={barClick} 
            >
              <LabelList
                className="" 
                dataKey="info_name"
                cursor="pointer"
                onClick={(index)=>{
                  console.log(index)
                }}
                content={({ x, y, width, height, index, value }) => {
                  const color = colors[index||0];
                  return (
                  <g >
                    <text
                      //style="stroke-width:10;stroke:#000;fill:#fff;paint-order:stroke;"
                      stroke="#ffffff" 
                      paintOrder={'stroke'}
                      strokeWidth={4}
                      className="text-xl font-bold"
                      x={Number(x)+10}
                      y={Number(y)+Number(height)/2}
                      fill={'black'}
                      textAnchor="start"
                      dominantBaseline="middle"
                      cursor="pointer"
                      onClick={()=>{
                        console.log(index)
                      }}
                    >
                      {value}
                    </text>
                    </g >
                  );
                  }}
                />
              {barChartAllData.map((_entry, index, value) => (

                <Cell cursor="pointer" key={`cell-${index}`} fill={colors[index % colors.length]} stroke='#8a8888' />

              ))}

            </Bar>
          </BarChart>
        </ChartContainer>
        </div>
        {/* 円グラフ */}
        <div 
          className="flex flex-col gap-2 w-fit rounded-md border"
          >
          {/* 表示条件指定部 */}
          <div className="" id="pieChart">
            <div className="flex flex-col gap-3 w-max">
              <div className=''>
                <MypageChartRadioButton
                  radioName="allOrFree"
                  data={[
                      { filterId: "all", labelStr: "全て" },
                      { filterId: "free", labelStr: "無料ストーリーのみ" },
                  ]}
                  selectedId={pieChartDisplayData.allOrFree}
                  onChange={(id) => {
                    if(id==='free'){
                      setPieChartDisplayData({
                          ...pieChartDisplayData,
                          storyCnt:pieChartDisplayData.selectedUserChartData.free_story_cnt,
                          readStoryCnt:pieChartDisplayData.selectedUserChartData.read_free_story_cnt,
                          allOrFree:'free'});
                    }else{
                      setPieChartDisplayData({
                          ...pieChartDisplayData,
                          storyCnt:pieChartDisplayData.selectedUserChartData.all_story_cnt,
                          readStoryCnt:pieChartDisplayData.selectedUserChartData.read_all_story_cnt,
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
                    const selectedStoryData: DisplayUserChartData = userChartData.find(data=>data.info_id===value)||{...unknownUserChartData, info_id:value};
                    setPieChartDisplayData({
                        ...pieChartDisplayData,
                        storyCnt:pieChartDisplayData.allOrFree==='free'?selectedStoryData.free_story_cnt:selectedStoryData.all_story_cnt,
                        readStoryCnt:pieChartDisplayData.allOrFree==='free'?selectedStoryData.read_free_story_cnt:selectedStoryData.read_all_story_cnt,
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
                    const selectedStoryData: DisplayUserChartData = userChartData.find(data=>data.info_id===value)||{...unknownUserChartData, info_id:value};
                    setPieChartDisplayData({
                        ...pieChartDisplayData,
                        storyCnt:pieChartDisplayData.allOrFree==='free'?selectedStoryData.free_story_cnt:selectedStoryData.all_story_cnt,
                        readStoryCnt:pieChartDisplayData.allOrFree==='free'?selectedStoryData.read_free_story_cnt:selectedStoryData.read_all_story_cnt,
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
                <p className={`inline px-[3px] ${pieChartDisplayData.selectedUserChartData.info_id==='sidem'?'':'text-red-500 font-bold'}`}>{`${getStoryPrefix(pieChartDisplayData.selectedUserChartData.info_id)}`}</p>
                <p className="inline ">{`${pieChartDisplayData.selectedUserChartData.info_id==='sidem'?'':'出演'}`}</p>
                <p className={`inline ${pieChartDisplayData.allOrFree==='free'?' pl-[2px]':''}`}>{`${pieChartDisplayData.allOrFree==='free'?'無料':''}ストーリーを`}</p>
              </div>
              <div className="inline font-bold">
                <p className="inline text-red-500 px-1 text-3xl mobileL:text-4xl">{pieChartDisplayData.readStoryCnt}</p>
                <p className="inline text-red-500 px-1 text-3xl mobileL:text-2xl">{`/`}{pieChartDisplayData.storyCnt}</p>
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
                                {`${getStoryPrefix(pieChartDisplayData.selectedUserChartData.info_id)}ストーリー`}
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
                <ShareModalButton
                  buttonText="読破状況をシェア"
                  initTabId="search315"
                  tabs={[
                    {
                      id:'search315',
                      title:'サーチ315',
                      disabled:false,
                      shareText:`${pieChartDisplayData.selectedUserChartData.info_id==='sidem'?'':'出演'}ストーリー |  サーチサイコー\n#SideM #search315`,
                      shareUrl:`https://search315.com/`
                    }
                  ]}
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
