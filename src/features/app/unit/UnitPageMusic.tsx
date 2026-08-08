'use client'
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import singingMaster from '@/data/singingMaster.json';
import songMaster from '@/data/songMaster.json';
import songInfoAsc from '@/data/songInfoAsc.json'
import type { SongMaster,SingingMaster } from '@/data/types';
import SongCarousel from "@/features/common/components/SongCarousel";
import UnitPageMemberTabController from "./components/UnitPageMemberTabController";
import UnitMusic from "./UnitMusic";
import IdolMusic from "./IdolMusic";

export default function UnitPageMusic({ unitId,unitMember }: { unitId: string; unitMember: SingingMaster[] }) {

    return (<>
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
    </>);
}