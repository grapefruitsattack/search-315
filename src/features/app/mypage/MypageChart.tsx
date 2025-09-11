'use client'
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { StoryCntData, SingingMaster } from '@/data/types';
import singingMaster from '@/data/singingMaster.json';
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

  const [displayData, setDisplayData] = useState({storyCnt:storyCntData.all_story_cnt,readStoryCnt:storyCntData.read_all_story_cnt});
  useEffect(() => {
    setDisplayData({storyCnt:storyCntData.all_story_cnt,readStoryCnt:storyCntData.read_all_story_cnt});
  }, [storyCntData]);

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
      color: "#80ffff",
    },
  } satisfies ChartConfig
 

    return (<>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>
            <div className="flex flex-col items-center text-center leading-7">
              <div>
                {`あなたは`}
                <p className="inline text-red-500 px-1 text-4xl">{displayData.readStoryCnt}</p>
                {`個の`}
                <p className="inline pl-1 ">{'SideM'}</p>
                {`ストーリーを読破しました！`}
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
              polarRadius={[106, 94]}
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
                          {`全${displayData.storyCnt}ストーリー中`}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          <tspan className="fill-foreground text-xl font-bold ">{'約'}</tspan>{percentageStr}
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div>{'※現在公式媒体で読むことが可能なストーリーをカウント対象としています'}</div>
        <div 
            className={`
            w-auto inline-block row-span-1 lg:pr-2 pr-1 h-8
            `}
        >
        <ShareSearch315Modal 
            buttonText="このページをシェア"
            shareText={` |  サーチサイコー\n#SideM #search315`} 
            pass={'unit/'}
          />
        </div>
        <div>
          <Select onValueChange={(value)=>{router.push('/mypage/chart/?q='+value);}}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="ユニット・アイドル別表示" />
            </SelectTrigger>
            <SelectContent>
              {singingMaster.map((data, index) => (
                <SelectItem key={index} value={data.singingInfoId}>{data.singingInfoName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardFooter>
    </Card>
    </>
      );
  }