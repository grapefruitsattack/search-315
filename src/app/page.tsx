"use client"
import CommonPage from "../features/common/components/CommonPage";
import IdolBlock from "../features/common/components/IdolBlock";
import UnitBlock from "../features/common/components/UnitBlock";
import { motion,AnimatePresence } from 'framer-motion'


interface ItemCSS extends React.CSSProperties{
  '--c':string
}

export default function Home() {
  return (
    
    <CommonPage>
    <AnimatePresence mode="wait">
      <motion.div
        key={'Home'}
        initial={{ opacity: 0 }} // 初期状態
        animate={{ opacity: 1 }} // マウント時
        exit={{ opacity: 0 }}    // アンマウント時
      >
<section className="min-h-screen flex-col items-center justify-between pt-24 pb-72 px-12 lg:px-24">


<p className={`
  border-JUP00 hover:bg-JUP00/50 text-JUP00
  border-DRS00 hover:bg-DRS00/50 text-DRS00
  border-ALT00 hover:bg-ALT00/50 text-ALT00
  border-BEI00 hover:bg-BEI00/50 text-BEI00
  border-DBL00 hover:bg-DBL00/50 text-DBL00
  border-FRM00 hover:bg-FRM00/50 text-FRM00
  border-SAI00 hover:bg-SAI00/50 text-SAI00
  border-HIJ00 hover:bg-HIJ00/50 text-HIJ00
  border-SSK00 hover:bg-SSK00/50 text-SSK00
  border-CFP00 hover:bg-CFP00/50 text-CFP00
  border-MFM00 hover:bg-MFM00/50 text-MFM00
  border-SEM00 hover:bg-SEM00/50 text-SEM00
  border-KGD00 hover:bg-KGD00/50 text-KGD00
  border-FLG00 hover:bg-FLG00/50 text-FLG00
  border-LGN00 hover:bg-LGN00/50 text-LGN00
  border-CLF00 hover:bg-CLF00/50 text-CLF00
  border-JUP01 text-JUP01
  border-JUP02 text-JUP02
  border-JUP03 text-JUP03
  border-DRS01 text-DRS01
  border-DRS02 text-DRS02
  border-DRS03 text-DRS03
  border-ALT01 text-ALT01
  border-ALT02 text-ALT02
  border-BEI01 text-BEI01
  border-BEI02 text-BEI02
  border-BEI03 text-BEI03
  border-DBL01 text-DBL01
  border-DBL02 text-DBL02
  border-FRM01 text-FRM01
  border-FRM02 text-FRM02
  border-FRM03 text-FRM03
  border-SAI01 text-SAI01
  border-SAI02 text-SAI02
  border-SAI03 text-SAI03
  border-HIJ01 text-HIJ01
  border-HIJ02 text-HIJ02
  border-HIJ03 text-HIJ03
  border-HIJ04 text-HIJ04
  border-HIJ05 text-HIJ05
  border-SSK01 text-SSK01
  border-SSK02 text-SSK02
  border-CFP01 text-CFP01
  border-CFP02 text-CFP02
  border-CFP03 text-CFP03
  border-CFP04 text-CFP04
  border-CFP05 text-CFP05
  border-MFM01 text-MFM01
  border-MFM02 text-MFM02
  border-MFM03 text-MFM03
  border-SEM01 text-SEM01
  border-SEM02 text-SEM02
  border-SEM03 text-SEM03
  border-KGD01 text-KGD01
  border-KGD02 text-KGD02
  border-KGD03 text-KGD03
  border-FLG01 text-FLG01
  border-FLG02 text-FLG02
  border-FLG03 text-FLG03
  border-LGN01 text-LGN01
  border-LGN02 text-LGN02
  border-LGN03 text-LGN03
  border-CLF01 text-CLF01
  border-CLF02 text-CLF02
  border-CLF03 text-CLF03
  
  `}>
</p>

<section className="mt-5 mb-32 grid text-center align-middle grid-cols-2 lg:mb-0 lg:grid-cols-4 gap-3">
        
        <UnitBlock id="JUP00" />
        <IdolBlock id="JUP01" />
        <IdolBlock id="JUP02" />
        <IdolBlock id="JUP03" />
        <UnitBlock id="DRS00" />
        <IdolBlock id="DRS01" />
        <IdolBlock id="DRS02" />
        <IdolBlock id="DRS03" />
        <UnitBlock id="ALT00" />
        <div className="inline-block lg:hidden"></div>
        <IdolBlock id="ALT01" />
        <IdolBlock id="ALT02" />
        <div className="hidden lg:inline-block"></div>
        <UnitBlock id="BEI00" />
        <IdolBlock id="BEI01" />
        <IdolBlock id="BEI02" />
        <IdolBlock id="BEI03" />
        <UnitBlock id="DBL00" />
        <div className="inline-block lg:hidden"></div>
        <IdolBlock id="DBL01" />
        <IdolBlock id="DBL02" />
        <div className="hidden lg:inline-block"></div>
        <UnitBlock id="FRM00" />
        <IdolBlock id="FRM01" />
        <IdolBlock id="FRM02" />
        <IdolBlock id="FRM03" />
        <UnitBlock id="SAI00" />
        <IdolBlock id="SAI01" />
        <IdolBlock id="SAI02" />
        <IdolBlock id="SAI03" />
        <UnitBlock id="HIJ00" />
        <IdolBlock id="HIJ01" />
        <IdolBlock id="HIJ02" />
        <IdolBlock id="HIJ03" />
        <div className="hidden lg:inline-block"></div>
        <IdolBlock id="HIJ04" />
        <IdolBlock id="HIJ05" />
        <div className="hidden lg:inline-block"></div>
        <UnitBlock id="SSK00" />
        <div className="inline-block lg:hidden"></div>
        <IdolBlock id="SSK01" />
        <IdolBlock id="SSK02" />
        <div className="hidden lg:inline-block"></div>
        <UnitBlock id="CFP00" />
        <IdolBlock id="CFP01" />
        <IdolBlock id="CFP02" />
        <IdolBlock id="CFP03" />
        <div className="hidden lg:inline-block"></div>
        <IdolBlock id="CFP04" />
        <IdolBlock id="CFP05" />
        <div className="hidden lg:inline-block"></div>
        <UnitBlock id="MFM00" />
        <IdolBlock id="MFM01" />
        <IdolBlock id="MFM02" />
        <IdolBlock id="MFM03" />
        <UnitBlock id="SEM00" />
        <IdolBlock id="SEM01" />
        <IdolBlock id="SEM02" />
        <IdolBlock id="SEM03" />
        <UnitBlock id="KGD00" />
        <IdolBlock id="KGD01" />
        <IdolBlock id="KGD02" />
        <IdolBlock id="KGD03" />
        <UnitBlock id="FLG00" />
        <IdolBlock id="FLG01" />
        <IdolBlock id="FLG02" />
        <IdolBlock id="FLG03" />
        <UnitBlock id="LGN00" />
        <IdolBlock id="LGN01" />
        <IdolBlock id="LGN02" />
        <IdolBlock id="LGN03" />
        <UnitBlock id="CLF00" />
        <IdolBlock id="CLF01" />
        <IdolBlock id="CLF02" />
        <IdolBlock id="CLF03" />





      </section>
  </section>
        </motion.div>
  </AnimatePresence>
    
</CommonPage>
  )
}
