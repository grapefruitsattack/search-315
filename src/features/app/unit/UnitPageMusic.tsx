'use client'
import type { SongMaster,SingingMaster } from '@/data/types';
import UnitPageMemberTabController from "./components/UnitPageMemberTabController";
import UnitMusic from "./UnitMusic";
import IdolMusic from "./IdolMusic";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";

export default function UnitPageMusic({ unitId,unitMember }: { unitId: string; unitMember: SingingMaster[] }) {

    return (<Card className="shadow-lg ">
    <CardHeader>
      <div 
        className="flex items-center w-full py-2 pl-4
          bg-gray-100 text-gray-700 mobileL:text-2xl mobileS:text-xl text-lg font-bold
          border-b "
      > 
        <Music className="mr-1 text-indigo-700" />
        {'楽曲'}
      </div>
    </CardHeader>
    <CardContent className='py-4'>
    <UnitPageMemberTabController
      unitId={unitId}
      unitMember={unitMember}
    >
      {(member) =>
        member === 'unit'
          ? <UnitMusic unitId={unitId} />
          : <IdolMusic idolId={member} />
      }

    </UnitPageMemberTabController>
    </CardContent>
    </Card>);
}