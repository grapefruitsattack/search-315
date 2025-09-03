import { Metadata } from 'next'
import dynamic from "next/dynamic";
import creditMaster from '@/data/creditMaster.json';
import CommonPage from "../../../features/common/components/CommonPage";
import { Suspense } from "react";

export function generateStaticParams() {
  return creditMaster.map((e)=>{
    return {id: e.creditId}
  });
}

const CreditPage = dynamic(() => import("../../../features/app/credit/CreditPage"), { ssr: true });
 
const Idols = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <Suspense>
    <CommonPage>
    <CreditPage creditId={id} />
    </CommonPage>
    </Suspense>
  );
}
export default Idols;