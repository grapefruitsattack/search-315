'use client'
import { Suspense, cache } from "react";
import UnitPageMain from "@/features/app/unit/UnitPageMain";
import UnitPageMusic from "@/features/app/unit/UnitPageMusic";
import UnitPageStory from "@/features/app/unit/UnitPageStory";
import UnitPageTabs from "@/features/app/unit/components/UnitPageTabs";

export default function UnitPage({ unitId, type }
  : { unitId: string; type: string; }) 
{

  return(
    <article className=" pb-96 font-sans">
      <UnitPageMain unitId={unitId} type={type}/>
    <section  className="w-full mt-5 px-2 mobileS:px-10 lg:px-16 bg-white lg:max-w-[1500px] lg:m-auto">
    <UnitPageTabs type={type}/>
    {type==='story'
      ?
      <Suspense fallback={<>{'story loading'}</>}>
      {/* @ts-ignore Server Component */}
      <UnitPageStory unitId={unitId}/>
      </Suspense>
      :<UnitPageMusic unitId={unitId}/>
    }
    </section>
    </article>
  )
}