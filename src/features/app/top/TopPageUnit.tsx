'use client'
import UnitBlock from "@/features/common/components/UnitBlock";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function TopPageUnit({ }: { }) {

  return(
  <Card className="shadow-lg ">
    <CardHeader>
      <div 
        className="flex items-center w-full py-2 pl-4
          bg-gray-100 text-gray-700 mobileL:text-2xl mobileS:text-xl text-lg font-bold
          border-b "
      > 
        <Sparkles className="mr-1 text-teal-500" />
        {'ユニットページへ'}
      </div>
    </CardHeader>
    <CardContent className='py-4'>
      <div 
        className=" px-2 mobileM:px-4 tablet:px-4
          grid text-center align-middle grid-cols-2 lg:mb-0 mobileL:grid-cols-4 gap-3"
      >
        <UnitBlock id="JUP00" />
        <UnitBlock id="DRS00" />
        <UnitBlock id="ALT00" />
        <UnitBlock id="BEI00" />
        <UnitBlock id="DBL00" />
        <UnitBlock id="FRM00" />
        <UnitBlock id="SAI00" />
        <UnitBlock id="HIJ00" />
        <UnitBlock id="SSK00" />
        <UnitBlock id="CFP00" />
        <UnitBlock id="MFM00" />
        <UnitBlock id="SEM00" />
        <UnitBlock id="KGD00" />
        <UnitBlock id="FLG00" />
        <UnitBlock id="LGN00" />
        <UnitBlock id="CLF00" />
      </div>
    </CardContent>
  </Card>
  )
}