"use client";
import UnitBlock from "@/features/common/components/UnitBlock";

export default function TopPage({ }: { }) {


    return (
    
    <section 
      className="min-h-screen flex-col items-center justify-between 
      pb-72 px-0 mobileM:px-1 mobileL:px-2 tablet:px-4 tablet:px-8 lg:px-8"
    >
    
      <div 
        className="mt-5 mb-32 px-1 mobileL:px-0
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
    </section>
        
      )
}