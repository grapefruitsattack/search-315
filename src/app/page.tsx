
import CommonPage from "../features/common/components/CommonPage";
import { Suspense } from "react";
import dynamic from "next/dynamic";

import IdolBlock from "../features/common/components/IdolBlock";
import UnitBlock from "../features/common/components/UnitBlock";
import { motion,AnimatePresence } from 'framer-motion'

const TopPage = dynamic(() => import("../features/app/top/TopPage"), { ssr: true });



export default function Home() {
  return (
    <Suspense>
    <CommonPage>
    <TopPage />
    </CommonPage>
    </Suspense>
  );
}
